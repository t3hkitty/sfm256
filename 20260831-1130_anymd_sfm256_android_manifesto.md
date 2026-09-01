# SUPER FABIMEOW 256: Android APK & GitHub Kat Sync Spec (v6.5.0)
# PROJECT: @lorik/sfm256-virtual-console

The Super FabiMeow 256 (SFM-256) is a high-performance, 256-bit virtual text console designed for tactile, zero-friction, and low-stimulation gameplay. 

## 1. The On-Device Android APK Architecture
Instead of utilizing clinical WebView wrappers or bulky emulation daemons, SFM-256 runs natively as a hybrid web-to-apk container compiled via Capacitor and Gradle.
- **256-Bit Score Safety:** Eliminates integer overflow on compounding combos, tracking scores up to nonillion-scale bounds via 128-bit registry mappings.
- **Tactile Soft-Deck Gamepad:** Maps device coordinate touches to direct CRT viewport grid coordinates, paired with haptic micro-pings and 5 customizable lower-deck buttons.
- **Chaotic Player 2 Drivers:** Supports multi-device HID Bluetooth arbitration or assignments to simulated Player 2 daemons (Disconnected Little Bro, Void Cat, Twitch Goldfish, or Tryhard Big Sister).
- **Vapor Store & Trophy Hub:** Browses game collections listed at a satirical $0.00 MSRP, with live-scrolling Danmaku Twitch-chat commentators responding in real-time to high-APM heuristic gameplay.

## 2. The GitHub Kat Cartridge Sync Protocol
Games are distributed as `.kat` (or `.katpack`) plain-text Markdown files hosted on a decentralized GitHub repository.
- **The KDK (Kat Developer Kit):** Provides developers with schema validations, semantic 4-channel palette remappers ($OUT, $FILL, $ACC, $TXT), and on-device kinetic sensor bindings.
- **Automated Validation CI Pipeline:** Automatically triggers on every push to main to parse frontmatter blocks, build a consolidated `registry.json` database, and verify incoming high scores against cryptographic telemetry hashes.
