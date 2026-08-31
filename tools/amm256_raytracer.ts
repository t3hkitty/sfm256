/**
 * 🎥 3D ASCII Movie Maker (AMM-256) 🎥
 * 
 * A compact, mathematical local ASCII wireframe raytracer.
 * Generates low-poly projections directly as plaintext buffers.
 * Zero external libraries, fully compatible with local static web apps.
 */

export interface Vec3 {
  x: number;
  y: number;
  z: number;
}

export class AMMRaytracer {
  private width: number = 80;
  private height: number = 25;
  private aspect: number = 80 / (25 * 2.0); // Correct for terminal monospace height-scaling
  private characters = " .:-=+*#%@";

  /**
   * Project a 3D sphere spinning in virtual coordinate space.
   */
  public renderFrame(angleRad: number): string {
    let output = "";
    
    // Position of light sources and rotating camera
    const lightDir: Vec3 = {
      x: Math.sin(angleRad),
      y: 0.5,
      z: Math.cos(angleRad)
    };
    // Normalize light vector
    const length = Math.sqrt(lightDir.x * lightDir.x + lightDir.y * lightDir.y + lightDir.z * lightDir.z);
    lightDir.x /= length;
    lightDir.y /= length;
    lightDir.z /= length;

    // Torus / Sphere Center
    const sphereCenter: Vec3 = { x: 0, y: 0, z: 2.5 };
    const radius = 1.0;

    for (let y = 0; y < this.height; y++) {
      let row = "";
      // Convert screen pixel coordinates to normalized camera ray directions (-1 to +1)
      const v = 1.0 - (y / this.height) * 2.0;

      for (let x = 0; x < this.width; x++) {
        const u = (x / this.width) * 2.0 - 1.0;
        
        // Setup simple ray vector
        const rayDir: Vec3 = { x: u * this.aspect, y: v, z: 1.0 };
        const rayLength = Math.sqrt(rayDir.x * rayDir.x + rayDir.y * rayDir.y + rayDir.z * rayDir.z);
        rayDir.x /= rayLength;
        rayDir.y /= rayLength;
        rayDir.z /= rayLength;

        // Perform Ray-Sphere Intersection
        const oc = {
          x: -sphereCenter.x,
          y: -sphereCenter.y,
          z: -sphereCenter.z
        };

        const b = oc.x * rayDir.x + oc.y * rayDir.y + oc.z * rayDir.z;
        const c = (oc.x * oc.x + oc.y * oc.y + oc.z * oc.z) - radius * radius;
        const discriminant = b * b - c;

        let pixelChar = " ";

        if (discriminant >= 0) {
          const t = -b - Math.sqrt(discriminant);
          if (t > 0) {
            // Find Hit Point normal
            const hitPoint: Vec3 = {
              x: rayDir.x * t,
              y: rayDir.y * t,
              z: rayDir.z * t
            };
            const normal: Vec3 = {
              x: (hitPoint.x - sphereCenter.x) / radius,
              y: (hitPoint.y - sphereCenter.y) / radius,
              z: (hitPoint.z - sphereCenter.z) / radius
            };

            // Dot product normal & light direction
            const diffuse = normal.x * lightDir.x + normal.y * lightDir.y + normal.z * lightDir.z;
            const index = Math.max(0, Math.floor(diffuse * (this.characters.length - 1)));
            pixelChar = this.characters[index] || " ";
          }
        }
        row += pixelChar;
      }
      output += row + "\n";
    }
    return output;
  }
}
