# 🐾 Super FabiMeow 256 Virtual Console & Vapor Storefront Spec 🐾 (v2.6.0)

```text
    /\_/\           🐾 256-bit retro architecture!
   ( >.< )  _______
    > ^ <  /       \
   /     \|  meow!  |
  /  | |  | \_______/
  \_/ \_/ /
```

Welcome to the official developer playbook and system architecture specification for **Super FabiMeow 256 (sfm256/)**! 

This virtual console unifies your games, custom procedural visualizers, and satirical digital storefronts under a **100% local-first, plain-text Markdown database ecosystem**. Games are not sterile ROM blocks—they are physical virtual **KATS** (`.kat` files) that run entirely inside your browser, sandbox, or PRoot wrappers.

---

## 🚀 Key Architectural Subsystems

### 🖥️ 1. WebGL Viewport & 4-Channel Palette Remapper (`core/viewport.ts`)
Decouples retro assets from hardcoded RGB values, allowing dynamic, high-contrast theme switches on the fly utilizing 4-channel color registers:
* **`$OUT`**: Border outlines, grid dividers, and high-Brutalist bounding elements.
* **`$FILL`**: Pastel backing panels and cards.
* **`$ACC`**: High-frequency notification tickers, strobe loops, and accents.
* **`$TXT`**: High-readability typography labels and ranks.

### 🃏 2. Psychic Master Solitaire (`cartridges/solitaire/psychic_solitaire.ts`)
The flagship KATS cartridge:
* **Sentient Whining Cards**: Idle stacks monitor elapsed time and throw kaomoji-driven tantrums `(｡•́︿•̀｡)` if neglected.
* **Cozy Foundation Beds**: Foundations styled as bunk beds `[~~~~~~~~~]` where cards can be neatly tucked to rest.
* **Temporal Urgency Metronome**: Accelerates visual strobes as combo decays, escalating tension to keep your focus locked.

### 🛒 3. Satirical Vapor Storefront (`vapor/vapor_storefront.ts`)
A humorous take on proprietary cloud platforms:
* **Hyperbolic Discounts**: Parody game editions priced at \$0.00 but shown with dramatic markdown tags (e.g. `-$999,999.00`).
* **Procedural Troll Flameboards**: Live discussion streams displaying toxic player arguments with conflicting horas played.

---

## ⚙️ Project File Directory Layout

Your monorepo conforms to the standard static deployment model:

```text
sfm256/
├── core/               # Terminal viewport, frame buffer, WebGL wrapper
├── shaders/            # GLSL fragment remappers ($OUT, $FILL, $ACC, $TXT)
├── cartridges/         
│   ├── solitaire/      # Psychic Master Solitaire cartridge
│   └── classics/       # "Don't Sue Me" Atari parodies
├── tools/              # 3D ASCII Movie Maker (AMM-256) wireframe rendering
└── vapor/              # Satirical Steam-lookalike storefront and receipt generators
```

---

## 📜 MIT License & Open Source Notice
This project is licensed under the standard developer-friendly **MIT License**. Feel free to fork, customize, and pack your own virtual KATS!
