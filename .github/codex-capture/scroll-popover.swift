import CoreGraphics
import Darwin
import Foundation

let arguments = Array(CommandLine.arguments.dropFirst())
guard arguments.count >= 2,
      let amount = Int32(arguments[0]),
      let requestedID = UInt32(arguments[1]) else {
    fputs("usage: scroll-popover AMOUNT WINDOW_ID\n", stderr)
    exit(64)
}

let windowID = CGWindowID(requestedID)
let options: CGWindowListOption = [.optionIncludingWindow, .excludeDesktopElements]
guard let raw = CGWindowListCopyWindowInfo(options, windowID)
    as? [[String: Any]],
      let item = raw.first,
      let bounds = item[kCGWindowBounds as String] as? NSDictionary,
      let rect = CGRect(dictionaryRepresentation: bounds as CFDictionary),
      rect.width >= 340,
      rect.height >= 400 else {
    fputs("Window \(windowID) is unavailable\n", stderr)
    exit(2)
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
print("Scrolled window \(windowID) by \(amount) lines at \(point)")
