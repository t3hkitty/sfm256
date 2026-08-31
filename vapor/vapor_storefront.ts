/**
 * 🛒 Vapor Satirical Storefront & Proc-Gen Troll Flameboard 🛒
 * 
 * Simulates a high-density, retro Steam-lookalike web client dashboard.
 * Renders fake $0 MSRP discount structures and toxic arcade player discussions.
 */

export interface VaporGameEntry {
  id: string;
  title: string;
  parodyDescription: string;
  originalMSRP: number;
  discountRate: number; // e.g. 100 for 100% off
  tags: string[];
}

export interface FlameComment {
  username: string;
  hoursPlayed: number;
  isPositive: boolean;
  timestamp: string;
  payloadText: string;
}

const PARODY_GAMES: VaporGameEntry[] = [
  {
    id: "unlicensed-pit-guy",
    title: "Unlicensed Pit-Guy (1977)",
    parodyDescription: "Navigate unstable pits, avoid legally distinct copyright-infringing crocodiles, and retrieve a single golden pixel without getting a DMCA takedown.",
    originalMSRP: 69.99,
    discountRate: 100,
    tags: ["Retro 8-Bit", "Avoid Lawsuits", "Hard Core"]
  },
  {
    id: "meteoroid-pulverizer",
    title: "Meteoroid Pulverizer",
    parodyDescription: "Rotate a single white ASCII triangle in virtual vector space and shoot floating asterisks before they touch your fragile collision boundaries.",
    originalMSRP: 420.69,
    discountRate: 100,
    tags: ["High-APM", "Triangles", "Vapor-Build"]
  },
  {
    id: "amphibious-commute",
    title: "Amphibious Commute",
    parodyDescription: "Guide a green ASCII frog across a high-speed multilane text stream of moving cars to catch a train that has already left. Relatable and anxiety-inducing.",
    originalMSRP: 1250.00,
    discountRate: 100,
    tags: ["Cozy Babies", "Road Rage", "Retro-Parody"]
  }
];

const FLAMEBOARD_DIALECTS = [
  "This game literally bricked my microwave. 10/10 would buy again.",
  "0.1 hours played: Trash slop, developers should be locked in a server room.",
  "500 hours played: It's okay I guess, nothing special.",
  "Sovereign data means I own this locally, you can't revoke my license on corporate cloud servers!",
  "My cat sat on the keyboard and completed three speedruns. Beat that, tryhards."
];

const USER_PRESETS = [
  "xX_SephirothMeow_Xx",
  "PrincessDonutOfficial",
  "Troll_Master_95",
  "CarlSaganGhost",
  "SovereignCatLord"
];

export class VaporStorefront {
  
  public getFeaturedParodyCatalog(): VaporGameEntry[] {
    return PARODY_GAMES;
  }

  /**
   * Generates a fully compliant satirical receipt demonstrating a 100% discount.
   */
  public generateSatiricalReceipt(game: VaporGameEntry): string {
    const discountAmount = game.originalMSRP;
    const finalPrice = 0.00;
    const taxRate = 0.15;
    const satiricalTax = finalPrice * taxRate;

    return `
***************************************************
         🛸 VAPOR STATIC ARCHIVE RECEIPT 🛸
***************************************************
Game:      ${game.title}
MSRP:      $${game.originalMSRP.toFixed(2)}
Discount:  -$${discountAmount.toFixed(2)} [-100%]
---------------------------------------------------
Subtotal:  $0.00
Govt Tax:  $${satiricalTax.toFixed(2)} (Hyperbolic Satire Tax)
===================================================
TOTAL:     $0.00
===================================================
STATUS:    Sovereign Asset Licensed Permanently to Local Storage.
WARNING:   No cloud server can delete this from your disk!
***************************************************
`;
  }

  /**
   * Generates random comment boards showing highly conflicting player metrics.
   */
  public generateFlameboardComments(count: number = 3): FlameComment[] {
    const comments: FlameComment[] = [];
    for (let i = 0; i < count; i++) {
      const user = USER_PRESETS[Math.floor(Math.random() * USER_PRESETS.length)] + "_" + Math.floor(Math.random() * 999);
      const hours = Math.random() > 0.5 ? Math.round(Math.random() * 500) : parseFloat((Math.random() * 2).toFixed(1));
      const text = FLAMEBOARD_DIALECTS[Math.floor(Math.random() * FLAMEBOARD_DIALECTS.length)];
      
      comments.push({
        username: user,
        hoursPlayed: hours,
        isPositive: hours > 10,
        timestamp: new Date(Date.now() - i * 3600000).toISOString(),
        payloadText: text
      });
    }
    return comments;
  }
}
