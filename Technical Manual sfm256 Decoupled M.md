Technical Manual: sfm256 Decoupled Modules & Satirical Storefront Blueprint

1. Unified GUI Standards: Kawaii Brutalism Implementation

The "Kawaii Brutalism" design language is a strategic systems-architecture response to the "Wall of Awful"—the cognitive barrier to task initiation caused by executive dysfunction. By juxtaposing rigid structural "brutalist" constraints with a protective sensory "kawaii" layer, we establish Somatic Permanence. This stable digital home remains predictable across complex context switches, mitigating sensory overstimulation and combating Time Blindness.

Strict Design Constraints

To eliminate visual ambiguity and satisfy the neurodivergent need for absolute order, all interfaces must adhere to these four rigid constraints:

* 0px Border-Radii: All containers, buttons, and input fields must utilize sharp, 90-degree corners to emphasize structural rigidity.
* 2px Solid Borders: Every UI element must be defined by a 2-pixel solid border to maintain a high-density visual hierarchy.
* Asset Purity: Default system assets (e.g., the Android "bugdroid") are 100% forbidden. All icons must be custom Adaptive Vector Launcher Icons (mipmap-anydpi-v26).
* Desaturated Color Palette: Use only desaturated cream and pastel presets. This acts as a sensory shield, protecting the user from the high-cortisol fatigue triggered by industrial, red-alert interfaces.

Thematic Branding: The Theme Picker

Users may modulate their sensory environment via the persistent Theme Picker, which persists via Jetpack DataStore or localStorage:

* Classic: High-functionality professional view focused on data density.
* Cute 🌸: Increased pastel saturation and softer UI transitions for sensory comfort.
* Silly 🤪: Extensive integration of kaomojis and playful micro-animations to maintain engagement.

Chromatic Inheritance Mapping

The system utilizes "Manila Hanging Folder Tabs" with a staggered, physical lip design attached to the active workspace. Vault Pills dynamically adopt the accent color of their parent Mode Tab to ensure zero-lookup context awareness.

Mode Folder Tab	Tab Accent Tone	Inherited Vault Pill Styling	Example Vaults
Books	Slate Indigo / Heather Blue	Soft indigo fill, indigo halo on focus	📖 StoryCraft Lore
Journal Vaults	Warm Sage / Mint Slate	Sage pill border, subtle sage glow	📓 Daily Log
Blueprints	Manila Amber / Ochre Gold	Ochre manila background, amber chip	📐 App Specs
Sandboxes	Vivid Iris / Amethyst Purple	Deep purple outline, glowing violet dot	🧪 AGV Experiments

Interactive Element Specs

* Tactile Chore Coach: Replaces low-contrast pale boxes with deep dark cards and vibrant accents. Standard flat text inputs are strictly forbidden; users must assemble routines using modular variable chips (e.g., [Timestamp], [Text], [Header], [Callout]).
* C4 Dynamic Scene-Switching: The Command, Control, Communications, and Computers (C4) engine allows users to jump between pre-configured UI "scenes" (e.g., "Deep Work" to "Creative Triage") with zero latency to preserve the delay-of-reinforcement gradient.

2. Module 1: The Meow MUD Browser Extension (bext)

MV3 Core Architecture

The browser extension utilizes Manifest V3 (MV3) to ensure high-performance telemetry capture and modern security.

* background.js (Zero-latency Proxy): Acts as the service worker gateway. It specifically bypasses CORS security rules to pipe data from static GitHub Pages to local port 3050.
* content.js (DOM Controller): Injected to transmit host origins securely to the background broker.
* popup.js (Sidepanel/Webhook Orchestrator): Manages the glassmorphic sidepanel UI and coordinates quick-fire triggers.

Context Menu & Listener Logic

The "Echo Loopback Service" bounces raw payloads to an in-memory stream for validation.

* Telemetry Audits: The interface must provide split raw/parsed views and a one-tap replay trigger. This allows for a "passive visual audit" to verify data integrity before vault commitment.

Sticky Configuration Persistence

To ensure settings survive app cold-starts, state must be serialized to durable storage.

* Implementation: Use localStorage (Web) or Jetpack DataStore (Android).
* File Refs: Deployment settings must persist in .anymd_deploy_config.json, while AGV orchestration settings land in .anymd_agv_config.json.

3. Module 2: The Vapor Satirical Storefront

Satirical Transaction Engine

The storefront features a "Simulated High-Stakes MSRP Receipt" system to gamify productivity telemetry.

* Interactive Purchase States: Transactions trigger visual "item unlock" states and update the Earn/Burn telemetry in the user's wallet.
* LCMD Currency Ticker: A decoupled state engine using a BroadcastChannel to ensure unified "Vapor Token" balances across the storefront and the lcmd console without page reloads.

Troll Interceptor & Forum Mechanics

The "Troll Interceptor" mechanic monitors the data stream for "low-effort" inputs.

* AI Buddy Logic: Triggers dynamic prompt injections based on the active Coach Voice.
* UI Implementation: This uses Tier 2 Pill Flyouts—compact floating chips next to complex mechanics—to explain how the interceptor is influencing the current output.

Currency Ticker Integration

The ticker module must be embedded as follows:

Target Tool	Embed Location	Primary Functionality
lcmd Console	Command-bar header	Reflects operational earnings and log rewards.
Vapor Store	Top-right checkout anchor	Live wallet balance check and purchase verification.
AnyMD Side Panel	MBB dock companion bar	Real-time habit streak multipliers and telemetry.

4. The Pillar 7 Folder Selection Invariant

Non-Negotiable Local-First Protocol

WARNING: The use of freeform text entry boxes for directory paths, vault locations, or folder inputs is strictly forbidden. All path resolution must occur through native OS-level pickers to ensure "local-first" data meowty and prevent path-resolution errors.

API Implementation Requirements

* Web Platform: Must utilize showDirectoryPicker() (Web File System Access API).
* Android Platform: Must utilize the Storage Access Framework (SAF) Directory Picker.

Persistence Handshake

Upon selection, the system must immediately call contentResolver.takePersistableUriPermission() (Android) or store the handle (Web). This ensures vault access survives system reboots and app updates.

5. Detailed File Layout & Manifest

Core System Manifest (v25 Suite)

The following 12 files constitute the complete comprehensive integration and sync suite:

File Name	Path	Primary KawaiiNeko Role	Status
README-v2.md	root/	Exhaustive setup and shortcut guide.	🟢 Ready
CHANGELOG-v2.md	root/	Milestone tracking (v2.0.0).	🟢 Ready
.gitignore-v2	root/	Shields sticky configs and private keys.	🟢 Ready
manifest.json	root/	MV3 configs with context menu bindings.	🟢 Ready
background.js	src/ext/	CORS-bypass proxy gateway.	🟢 Ready
content.js	src/ext/	Injected DOM controller for transmission.	🟢 Ready
popup.js	src/ext/	Sidepanel/webhook orchestrator.	🟢 Ready
popup.html	src/ext/	Glassmorphic popup panel structure.	🟢 Ready
options.js	src/ext/	Manual webhook gateway mappings.	🟢 Ready
options.html	src/ext/	Option menu for target ports.	🟢 Ready
AnymdDashboard-v2.tsx	src/ui/	AI-Hub and handshake listener core.	🟢 Ready
deploy_vps_sync_v25.py	root/	Secure Python sync script.	🟢 Ready

Component Mapping

* AnymdDashboard-v2.tsx: Primary React component containing dashboard headers.
* AnymdGoblinSomaticTasks-v22.tsx: High-density task decomposer. Features Virtual Body Doubling and Local Speech Synthesis (window.speechSynthesis API) to audibly decompose complex tasks into focus shields.

6. agvbro Compilation & Deployment Directives

agvbro Execution Logic

* Passive Ingestion: The GEMINI.md file establishes strict boundaries for AGV agents, forcing them to respect Kawaii Brutalist design metrics.
* Orchestration: Managed via anymd_agv_agent.py, which utilizes .anymd_agv_config.json for persistent binary discovery and authorization.

Deployment Pipeline

Utilizes a Dual-Engine Auto-Adaptive Protocol via the deploy_vps_sync_v25.py script.

1. Rsync Mode: Executes delta syncs if rsync is detected.
2. Zip-and-Ship: Fallback method that compiles assets into a .zip, transfers via scp, and unpacks over SSH.
3. Recursive Ignore Engine: Automatically strips .git, node_modules, and private keypairs during sync.

Terminal Commands:

* Handshake Test: python deploy_vps_sync_v25.py --host (Verifies key authorization and port 22).
* Execution: python deploy_vps_sync_v25.py (Final delta-sync).

Lessons from the OCI Lockout

To prevent terminal failures, all sync operations must avoid Bracketed Paste Mode Collisions.

* Constraint: Use short, single-line actions and neutral variables.
* Note: This prevents terminal escape codes (e.g., ^[[200~) from merging lines and causing command parsing failures during recovery.

7. Progressive Disclosure & Contextual Guidance

Multi-Tiered Help System

Guidance is delivered through non-blocking drawers to preserve focus.

Guidance Tier	Trigger	UI Component Style
Tier 1: Micro-Hints	Hover / Long-Press	Dark high-contrast tooltip with 1-sentence purpose + shortcut.
Tier 2: Feature Pills	Click inline (?) chip	Compact floating flyout card with quick definition/example.
Tier 3: Mode Cheat Sheet	F1 or Global (?) Tab	Slide-out right drawer with searchable field glossaries.

Glossary of Complex Mechanics

* AGV Deployment: The programmatic build pipeline where exported payloads land in the Antigravity environment.
* Microlog Samples: Individual telemetry parameters (e.g., prompt failures, crash loops) tracked during runtime.
* Vault Inheritance Rules: The logic where Vault Pills adopt the background/accent tones of their parent Mode Tab (parent-child color inheritance).
