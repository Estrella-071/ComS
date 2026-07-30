#!/usr/bin/env python3
import datetime as dt
import json
import pathlib
import shutil
import sys
import time

CLI_VERSION = "0.145.0"
HOME = pathlib.Path.home()
SESSIONS = HOME / ".codex" / "sessions"
MANIFEST = HOME / ".codex" / "synthetic-threads.json"


def utc_now():
    return dt.datetime.now(dt.timezone.utc)


def iso(value):
    return value.astimezone(dt.timezone.utc).isoformat(timespec="milliseconds").replace("+00:00", "Z")


def epoch(value):
    return int(value.timestamp())


def usage(total):
    input_tokens = int(total * 0.69)
    return {
        "input_tokens": input_tokens,
        "cached_input_tokens": int(input_tokens * 0.31),
        "cache_write_input_tokens": int(total * 0.025),
        "output_tokens": int(total * 0.21),
        "reasoning_output_tokens": int(total * 0.08),
        "total_tokens": total,
    }


def add(records, timestamp, ordinal, record_type, payload):
    records.append({
        "timestamp": iso(timestamp),
        "ordinal": ordinal,
        "type": record_type,
        "payload": payload,
    })


def seed_fixtures():
    shutil.rmtree(SESSIONS, ignore_errors=True)
    shutil.rmtree(HOME / "Library" / "Application Support" / "Codex Limits", ignore_errors=True)
    SESSIONS.mkdir(parents=True, exist_ok=True)

    now_dt = utc_now().replace(second=0, microsecond=0)
    specs = [
        ("task-atlas-root", None, "atlas", "gpt-5.6-sol", "xhigh", 5.55, 3.8, 8_600_000, ["CommandExecution", "FileChange", "WebSearch"], 2),
        ("task-atlas-ui", "task-atlas-root", "atlas", "gpt-5.6-terra", "high", 4.90, 2.4, 5_200_000, ["FileChange", "ImageView"], 1),
        ("task-codex-core", None, "codex-limits", "gpt-5.6-sol", "high", 4.15, 4.7, 10_900_000, ["CommandExecution", "FileChange", "McpToolCall"], 3),
        ("task-codex-tests", "task-codex-core", "codex-limits", "gpt-5.6-luna", "medium", 3.65, 1.9, 3_300_000, ["CommandExecution", "FileChange"], 0),
        ("task-mobile-shell", None, "mobile-client", "gpt-5.6-terra", "high", 3.05, 3.1, 6_700_000, ["FileChange", "ImageView", "CommandExecution"], 1),
        ("task-arc-analysis", None, "arc-lab", "gpt-5.6-sol", "xhigh", 2.55, 5.2, 12_400_000, ["WebSearch", "CommandExecution", "McpToolCall"], 4),
        ("task-atlas-agent", "task-atlas-root", "atlas", "gpt-5.6-luna", "high", 1.95, 2.6, 4_800_000, ["CommandExecution", "DynamicToolCall"], 1),
        ("task-mobile-polish", "task-mobile-shell", "mobile-client", "gpt-5.6-terra", "medium", 1.35, 2.0, 3_900_000, ["ImageView", "FileChange"], 0),
        ("task-codex-research", "task-codex-core", "codex-limits", "gpt-5.6-sol", "high", 0.80, 3.5, 7_500_000, ["WebSearch", "McpToolCall", "FileChange"], 2),
        ("task-arc-eval", "task-arc-analysis", "arc-lab", "gpt-5.6-luna", "medium", 0.35, 1.7, 2_800_000, ["CommandExecution", "DynamicToolCall"], 0),
    ]

    manifest = []
    for index, spec in enumerate(specs):
        task_id, parent, project, model, effort, age_days, duration_hours, token_total, tools, compact_count = spec
        start = now_dt - dt.timedelta(days=age_days)
        end = min(start + dt.timedelta(hours=duration_hours), now_dt - dt.timedelta(minutes=8))
        records = []
        ordinal = 0

        add(records, start, ordinal, "session_meta", {
            "id": task_id,
            "parent_thread_id": parent,
            "cli_version": CLI_VERSION,
            "history_mode": "paginated",
            "agent_role": "worker" if parent else "primary",
            "agent_nickname": ["Nova", "Mira", "Orion", "Vega"][index % 4],
        })
        ordinal += 1
        add(records, start + dt.timedelta(seconds=2), ordinal, "event_msg", {"type": "task_started"})
        ordinal += 1

        cumulative = 60_000 + index * 7_000
        span = max((end - start).total_seconds(), 900)
        for turn_index in range(4):
            turn_start = start + dt.timedelta(seconds=span * turn_index / 4)
            turn_end = start + dt.timedelta(seconds=span * (turn_index + 0.72) / 4)
            turn_id = f"{task_id}-turn-{turn_index + 1}"
            local_model = "gpt-5.6-terra" if turn_index == 3 and model == "gpt-5.6-sol" else model
            local_effort = "high" if local_model == "gpt-5.6-terra" and effort == "xhigh" else effort

            add(records, turn_start, ordinal, "turn_context", {
                "turn_id": turn_id,
                "model": local_model,
                "effort": local_effort,
                "model_context_window": 272000,
                "agent_role": "worker" if parent else "primary",
                "agent_nickname": ["Nova", "Mira", "Orion", "Vega"][index % 4],
            })
            ordinal += 1
            add(records, turn_start + dt.timedelta(seconds=1), ordinal, "event_msg", {
                "type": "turn_started",
                "turn_id": turn_id,
                "model": local_model,
                "effort": local_effort,
                "started_at": epoch(turn_start),
                "model_context_window": 272000,
            })
            ordinal += 1

            add(records, turn_start + dt.timedelta(seconds=12), ordinal, "event_msg", {
                "type": "token_count",
                "turn_id": turn_id,
                "model": local_model,
                "effort": local_effort,
                "model_context_window": 272000,
                "info": {
                    "model_context_window": 272000,
                    "total_token_usage": usage(cumulative),
                    "last_token_usage": usage(min(34_000 + index * 1300 + turn_index * 8500, 225_000)),
                },
            })
            ordinal += 1

            increment = int(token_total / 4 * (0.82 + 0.12 * ((index + turn_index) % 4)))
            midway = turn_start + (turn_end - turn_start) * 0.54
            cumulative += max(increment, 80_000)
            add(records, midway, ordinal, "event_msg", {
                "type": "token_count",
                "turn_id": turn_id,
                "model": local_model,
                "effort": local_effort,
                "model_context_window": 272000,
                "info": {
                    "model_context_window": 272000,
                    "total_token_usage": usage(cumulative),
                    "last_token_usage": usage(min(58_000 + index * 8000 + turn_index * 31_000, 258_000)),
                },
            })
            ordinal += 1

            tool_count = 1 + ((turn_index + index) % len(tools))
            for tool_offset, tool in enumerate(tools[:tool_count]):
                add(records, midway + dt.timedelta(seconds=tool_offset + 3), ordinal, "event_msg", {
                    "type": "item_completed",
                    "turn_id": turn_id,
                    "item": {"type": tool},
                })
                ordinal += 1

            if compact_count > turn_index:
                add(records, turn_end - dt.timedelta(seconds=7), ordinal, "compacted", {
                    "turn_id": turn_id,
                    "model": local_model,
                    "effort": local_effort,
                    "model_context_window": 272000,
                })
                ordinal += 1

            add(records, turn_end, ordinal, "event_msg", {
                "type": "turn_complete",
                "turn_id": turn_id,
                "model": local_model,
                "effort": local_effort,
                "started_at": epoch(turn_start),
                "completed_at": epoch(turn_end),
                "duration_ms": max(60_000, int((turn_end - turn_start).total_seconds() * 1000)),
                "time_to_first_token_ms": 1100 + index * 170 + turn_index * 240,
            })
            ordinal += 1

        add(records, end, ordinal, "event_msg", {"type": "task_complete"})
        day_dir = SESSIONS / start.strftime("%Y") / start.strftime("%m") / start.strftime("%d")
        day_dir.mkdir(parents=True, exist_ok=True)
        path = day_dir / f"rollout-{start.strftime('%Y-%m-%dT%H-%M-%S')}-{task_id}.jsonl"
        with path.open("w", encoding="utf-8") as handle:
            for record in records:
                handle.write(json.dumps(record, separators=(",", ":")) + "\n")

        manifest.append({
            "id": task_id,
            "parentThreadId": parent,
            "cliVersion": CLI_VERSION,
            "cwd": f"/Users/runner/work/{project}",
            "path": str(path),
            "createdAt": epoch(start),
            "updatedAt": epoch(end),
        })

    MANIFEST.parent.mkdir(parents=True, exist_ok=True)
    MANIFEST.write_text(json.dumps(manifest, indent=2), encoding="utf-8")
    print(f"Seeded {len(manifest)} synthetic tasks in {SESSIONS}")


def load_manifest():
    try:
        return json.loads(MANIFEST.read_text(encoding="utf-8"))
    except Exception:
        return []


def send(request_id, result):
    print(json.dumps({"id": request_id, "result": result}, separators=(",", ":")), flush=True)


if "--seed-fixtures" in sys.argv:
    seed_fixtures()
    raise SystemExit(0)

if "--version" in sys.argv:
    print(f"codex-cli {CLI_VERSION}")
    raise SystemExit(0)

now = int(time.time())
weekly_reset = now + 24 * 3600
short_reset = now + 2 * 3600 + 20 * 60
dates = [dt.date.today() - dt.timedelta(days=i) for i in range(13, -1, -1)]
tokens = [4_200_000, 6_100_000, 3_800_000, 8_200_000, 7_400_000, 9_900_000, 5_300_000, 12_600_000, 8_700_000, 11_200_000, 16_800_000, 14_300_000, 19_200_000, 21_800_000]

for raw in sys.stdin:
    try:
        request = json.loads(raw)
    except Exception:
        continue
    request_id = request.get("id")
    method = request.get("method")
    if request_id is None:
        continue

    if method == "initialize":
        send(request_id, {"userAgent": f"Codex CLI/{CLI_VERSION} (Mac OS 26)"})
    elif method == "account/rateLimits/read":
        codex = {
            "limitId": "codex",
            "limitName": "Codex",
            "primary": {"usedPercent": 24, "windowDurationMins": 300, "resetsAt": short_reset},
            "secondary": {"usedPercent": 38, "windowDurationMins": 10080, "resetsAt": weekly_reset},
            "credits": {"hasCredits": True, "unlimited": False, "balance": "42.75"},
            "individualLimit": {"limit": "100.00", "used": "38.20", "remainingPercent": 61.8, "resetsAt": weekly_reset},
            "spendControlReached": False,
        }
        luna = {
            "limitId": "gpt-5.6-luna",
            "limitName": "GPT-5.6 Luna",
            "primary": {"usedPercent": 46, "windowDurationMins": 10080, "resetsAt": weekly_reset},
        }
        send(request_id, {
            "rateLimits": codex,
            "rateLimitsByLimitId": {"codex": codex, "gpt-5.6-luna": luna},
            "rateLimitResetCredits": {
                "availableCount": 2,
                "credits": [
                    {"id": "banked-reset-1", "resetType": "codexRateLimits", "status": "available", "grantedAt": now - 172800, "expiresAt": now + 129600, "title": "Full reset", "description": "Ready"},
                    {"id": "banked-reset-2", "resetType": "codexRateLimits", "status": "available", "grantedAt": now - 86400, "expiresAt": now + 432000, "title": "Full reset", "description": "Ready"},
                ],
            },
        })
    elif method == "account/usage/read":
        send(request_id, {
            "summary": {
                "lifetimeTokens": 43_820_000_000,
                "peakDailyTokens": 2_300_000_000,
                "longestRunningTurnSec": 83_820,
                "currentStreakDays": 43,
                "longestStreakDays": 51,
            },
            "dailyUsageBuckets": [{"startDate": day.isoformat(), "tokens": value} for day, value in zip(dates, tokens)],
        })
    elif method == "account/read":
        send(request_id, {"account": {"type": "chatgpt", "email": "synthetic-demo@example.invalid", "planType": "pro"}, "requiresOpenaiAuth": True})
    elif method == "thread/list":
        send(request_id, {"data": load_manifest(), "nextCursor": None})
    elif method == "thread/read":
        thread_id = request.get("params", {}).get("threadId")
        threads = load_manifest()
        thread = next((item for item in threads if item["id"] == thread_id), threads[0] if threads else None)
        send(request_id, {"thread": thread})
    else:
        send(request_id, {})
