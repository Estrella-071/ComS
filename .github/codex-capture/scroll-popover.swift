import CoreGraphics
import Darwin
import Foundation

let amount = Int32(CommandLine.arguments.dropFirst().first ?? "0") ?? 0
let options: CGWindowListOption = [.optionOnScreenOnly, .excludeDesktopElements]
guard let raw = CGWindowListCopyWindowInfo(options, kCGNullWindowID)
    as? [[String: Any]] else {
    exit(1)
}

for item in raw {
    let owner = item[kCGWindowOwnerName as String] as? String ?? ""
    let title = item[kCGWindowName as String] as? String ?? ""
    let isCodex = owner.localizedCaseInsensitiveContains("Codex Limits")
        || owner.localizedCaseInsensitiveContains("CodexLimits")
        || title.localizedCaseInsensitiveContains("Codex Limits")
    guard isCodex,
          let bounds = item[kCGWindowBounds as String] as? NSDictionary,
          let rect = CGRect(dictionaryRepresentation: bounds as CFDictionary),
          rect.width >= 340,
          rect.height >= 400 else {
        continue
    }

    let point = CGPoint(x: rect.midX, y: rect.midY)
    let source = CGEventSource(stateID: .combinedSessionState)
    CGEvent(
        mouseEventSource: source,
        mouseType: .mouseMoved,
        mouseCursorPosition: point,
        mouseButton: .left
    )?.post(tap: .cghidEventTap)
    usleep(150_000)
    CGEvent(
        scrollWheelEvent2Source: source,
        units: .line,
        wheelCount: 1,
        wheel1: amount,
        wheel2: 0,
        wheel3: 0
    )?.post(tap: .cghidEventTap)
    print("Scrolled Codex popover by \(amount) lines at \(point)")
    exit(0)
}

fputs("Codex popover not found\n", stderr)
exit(2)
