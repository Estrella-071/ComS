import CoreGraphics
import Darwin
import Foundation

struct Window {
    let id: CGWindowID
    let owner: String
    let title: String
    let layer: Int
    let alpha: Double
    let rect: CGRect
}

func allWindows() -> [Window] {
    guard let raw = CGWindowListCopyWindowInfo(
        [.optionAll, .excludeDesktopElements],
        kCGNullWindowID
    ) as? [[String: Any]] else {
        return []
    }

    return raw.compactMap { item in
        guard let number = item[kCGWindowNumber as String] as? NSNumber,
              let bounds = item[kCGWindowBounds as String] as? NSDictionary,
              let rect = CGRect(dictionaryRepresentation: bounds as CFDictionary) else {
            return nil
        }
        return Window(
            id: CGWindowID(number.uint32Value),
            owner: item[kCGWindowOwnerName as String] as? String ?? "",
            title: item[kCGWindowName as String] as? String ?? "",
            layer: (item[kCGWindowLayer as String] as? NSNumber)?.intValue ?? -1,
            alpha: (item[kCGWindowAlpha as String] as? NSNumber)?.doubleValue ?? 0,
            rect: rect
        )
    }
}

func isCodex(_ window: Window) -> Bool {
    window.owner.localizedCaseInsensitiveContains("Codex Limits")
        || window.owner.localizedCaseInsensitiveContains("CodexLimits")
        || window.title.localizedCaseInsensitiveContains("Codex Limits")
}

func statusCandidate() -> Window? {
    allWindows()
        .filter {
            isCodex($0)
                && $0.rect.height <= 44
                && $0.rect.width >= 12
                && $0.rect.width <= 240
                && $0.rect.minY <= 44
                && $0.alpha > 0
        }
        .sorted { $0.rect.maxX > $1.rect.maxX }
        .first
}

func popoverCandidate() -> Window? {
    allWindows()
        .filter {
            isCodex($0)
                && $0.rect.width >= 340
                && $0.rect.height >= 400
                && $0.alpha > 0
        }
        .max {
            ($0.rect.width * $0.rect.height) < ($1.rect.width * $1.rect.height)
        }
}

func click(_ point: CGPoint) {
    let source = CGEventSource(stateID: .combinedSessionState)
    CGEvent(
        mouseEventSource: source,
        mouseType: .mouseMoved,
        mouseCursorPosition: point,
        mouseButton: .left
    )?.post(tap: .cghidEventTap)
    usleep(90_000)
    CGEvent(
        mouseEventSource: source,
        mouseType: .leftMouseDown,
        mouseCursorPosition: point,
        mouseButton: .left
    )?.post(tap: .cghidEventTap)
    usleep(70_000)
    CGEvent(
        mouseEventSource: source,
        mouseType: .leftMouseUp,
        mouseCursorPosition: point,
        mouseButton: .left
    )?.post(tap: .cghidEventTap)
}

func waitForPopover(milliseconds: Int = 700) -> Window? {
    let attempts = max(1, milliseconds / 50)
    for _ in 0..<attempts {
        if let window = popoverCandidate() { return window }
        usleep(50_000)
    }
    return nil
}

func openPopover() -> Window? {
    if let status = statusCandidate() {
        print("direct status candidate id=\(status.id) rect=\(status.rect)")
        click(CGPoint(x: status.rect.midX, y: status.rect.midY))
        if let popover = waitForPopover() { return popover }
    }

    let display = CGDisplayBounds(CGMainDisplayID())
    let y = display.minY + 13
    var x = display.maxX - 12
    print("scanning menu bar width=\(display.width) y=\(y)")

    while x >= display.minX + 12 {
        click(CGPoint(x: x, y: y))
        if let popover = waitForPopover(milliseconds: 350) {
            print("opened popover at x=\(x), id=\(popover.id)")
            return popover
        }
        x -= 10
    }
    return nil
}

switch CommandLine.arguments.dropFirst().first ?? "dump" {
case "dump":
    for window in allWindows().filter(isCodex) {
        print(
            "id=\(window.id) owner=\(window.owner) title=\(window.title) "
                + "layer=\(window.layer) alpha=\(window.alpha) rect=\(window.rect)"
        )
    }
case "dumpbar":
    for window in allWindows().filter({
        $0.rect.minY <= 44 && $0.rect.height <= 60 && $0.alpha > 0
    }) {
        print(
            "id=\(window.id) owner=\(window.owner) title=\(window.title) "
                + "layer=\(window.layer) alpha=\(window.alpha) rect=\(window.rect)"
        )
    }
case "click":
    guard let popover = openPopover() else {
        fputs("could not open Codex Limits popover\n", stderr)
        exit(2)
    }
    print(popover.id)
case "popover":
    guard let window = popoverCandidate() else { exit(3) }
    print(window.id)
default:
    exit(64)
}
