# 🖥️ sfm256 / core

```
  /\_/\   
 (=;..;=)  - "I control the pixels, meow!"
  ( - )
```

## Description
Core viewport rendering engine, virtual frame buffer, and WebGL context wrappers.

## Components
*   **Viewport Controller:** Handles canvas layout, resizing, scaling, and high-DPI scaling.
*   **Frame Buffer:** 256-bit cell matrix representing text, color channels, and special cell metadata.
*   **WebGL Wrapper:** Translates the text frame buffer into WebGL texture coordinates for high-speed rendering.
