#!/usr/bin/env python3
import datetime as dt
import json
import sys
import time

if "--version" in sys.argv:
    print("codex-cli 0.999.0")
    raise SystemExit(0)

now = int(time.time())
weekly_reset = now + 4 * 24 * 3600 + 6 * 3600
short_reset = now + 2 * 3600 + 20 * 60
dates = [dt.date.today() - dt.timedelta(days=i) for i in range(13, -1, -1)]
tokens = [
    4_200_000, 6_100_000, 3_800_000, 8_200_000, 7_400_000, 9_900_000,
    5_300_000, 12_600_000, 8_700_000, 11_200_000, 6_800_000, 14_300_000,
    9_200_000, 11_800_000,
]


def send(request_id, result):
    print(json.dumps({"id": request_id, "result": result}, separators=(",", ":")), flush=True)


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
        send(request_id, {"userAgent": "Codex CLI/0.999.0 (Mac OS 26)"})
    elif method == "account/rateLimits/read":
        codex = {
            "limitId": "codex",
            "limitName": "Codex",
            "primary": {
                "usedPercent": 41,
                "windowDurationMins": 300,
                "resetsAt": short_reset,
            },
            "secondary": {
                "usedPercent": 27,
                "windowDurationMins": 10080,
                "resetsAt": weekly_reset,
            },
            "credits": {"hasCredits": True, "unlimited": False, "balance": "18.50"},
            "individualLimit": {
                "limit": "50.00",
                "used": "13.50",
                "remainingPercent": 73,
                "resetsAt": weekly_reset,
            },
            "spendControlReached": False,
        }
        luna = {
            "limitId": "gpt-5.6-luna",
            "limitName": "GPT-5.6 Luna",
            "primary": {
                "usedPercent": 36,
                "windowDurationMins": 10080,
                "resetsAt": weekly_reset,
            },
        }
        send(
            request_id,
            {
                "rateLimits": codex,
                "rateLimitsByLimitId": {"codex": codex, "gpt-5.6-luna": luna},
                "rateLimitResetCredits": {
                    "availableCount": 2,
                    "credits": [
                        {
                            "id": "banked-reset-1",
                            "resetType": "codexRateLimits",
                            "status": "available",
                            "grantedAt": now - 172800,
                            "expiresAt": now + 129600,
                            "title": "Full reset",
                            "description": "Ready",
                        },
                        {
                            "id": "banked-reset-2",
                            "resetType": "codexRateLimits",
                            "status": "available",
                            "grantedAt": now - 86400,
                            "expiresAt": now + 432000,
                            "title": "Full reset",
                            "description": "Ready",
                        },
                    ],
                },
            },
        )
    elif method == "account/usage/read":
        send(
            request_id,
            {
                "summary": {
                    "lifetimeTokens": 43_820_000_000,
                    "peakDailyTokens": 2_300_000_000,
                    "longestRunningTurnSec": 83_820,
                    "currentStreakDays": 43,
                    "longestStreakDays": 51,
                },
                "dailyUsageBuckets": [
                    {"startDate": day.isoformat(), "tokens": value}
                    for day, value in zip(dates, tokens)
                ],
            },
        )
    elif method == "account/read":
        send(
            request_id,
            {
                "account": {
                    "type": "chatgpt",
                    "email": "macos-capture@example.invalid",
                    "planType": "pro",
                },
                "requiresOpenaiAuth": True,
            },
        )
    elif method == "thread/list":
        send(
            request_id,
            {
                "data": [
                    {
                        "id": "task-1",
                        "parentThreadId": None,
                        "cliVersion": "0.999.0",
                        "cwd": "/Users/runner/work/codex-limits",
                        "createdAt": now - 7200,
                        "updatedAt": now - 1800,
                    },
                    {
                        "id": "task-2",
                        "parentThreadId": "task-1",
                        "cliVersion": "0.999.0",
                        "cwd": "/Users/runner/work/ui-redesign",
                        "createdAt": now - 5400,
                        "updatedAt": now - 1200,
                    },
                ],
                "nextCursor": None,
            },
        )
    elif method == "thread/read":
        thread_id = request.get("params", {}).get("threadId", "task-1")
        send(
            request_id,
            {
                "thread": {
                    "id": thread_id,
                    "parentThreadId": None,
                    "cliVersion": "0.999.0",
                    "cwd": "/Users/runner/work/codex-limits",
                    "createdAt": now - 7200,
                    "updatedAt": now - 1800,
                    "turns": [],
                }
            },
        )
    else:
        send(request_id, {})
