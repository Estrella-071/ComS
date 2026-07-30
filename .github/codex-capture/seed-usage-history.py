#!/usr/bin/env python3
import datetime as dt
import json
import math
import subprocess

DOMAIN = "com.github.thrr87.CodexLimits"
REFERENCE_DATE = dt.datetime(2001, 1, 1, tzinfo=dt.timezone.utc)


def reference_seconds(value: dt.datetime) -> float:
    return (value - REFERENCE_DATE).total_seconds()


now = dt.datetime.now(dt.timezone.utc).replace(microsecond=0)
# Both this history generator and the installed mock server use the next
# 08:00 UTC boundary, producing byte-for-byte identical weekly reset dates.
reset_at = (now + dt.timedelta(days=1)).replace(
    hour=8,
    minute=0,
    second=0,
    microsecond=0,
)
starts_at = reset_at - dt.timedelta(days=7)
step = dt.timedelta(minutes=20)
span = (now - starts_at).total_seconds()

samples = []
observed = starts_at
index = 0
while observed <= now:
    progress = min(max((observed - starts_at).total_seconds() / max(span, 1), 0), 1)
    burned = 38.0 * (0.18 * progress + 0.82 * progress ** 1.12)
    ripple = 0.20 * math.sin(progress * 11.0) * progress * (1 - progress)
    remaining = max(62.0, min(100.0, 100.0 - burned + ripple))
    lifetime = 43_700_000_000 + int(120_000_000 * progress)
    sample = {
        "observedAt": reference_seconds(observed),
        "remainingPercent": round(remaining, 4),
        "resetsAt": reference_seconds(reset_at),
        "lifetimeTokens": lifetime,
    }
    if index == 0:
        sample["comparisonBreak"] = True
    samples.append(sample)
    observed += step
    index += 1

samples[0]["observedAt"] = reference_seconds(starts_at)
samples[0]["remainingPercent"] = 100.0
samples[0]["lifetimeTokens"] = 43_700_000_000
samples[-1]["remainingPercent"] = 62.0
samples[-1]["lifetimeTokens"] = 43_820_000_000

# StoredState has optional snapshot/status members, so the minimal legal form
# deliberately contains only samples and avoids unrelated decode failures.
stored_state = {"samples": samples}
encoded = json.dumps(stored_state, separators=(",", ":")).encode("utf-8")
subprocess.run(
    ["defaults", "write", DOMAIN, "usageState", "-data", encoded.hex()],
    check=True,
)
for key in (
    "historyAccountEpochStartedAt",
    "historyAccountState",
    "historyAccountPartition",
    "historyAccountEpochMigrationVersion",
):
    subprocess.run(
        ["defaults", "delete", DOMAIN, key],
        check=False,
        stdout=subprocess.DEVNULL,
        stderr=subprocess.DEVNULL,
    )
print(
    f"Seeded {len(samples)} quota samples from {starts_at.isoformat()} "
    f"through {now.isoformat()}, reset {reset_at.isoformat()}"
)
