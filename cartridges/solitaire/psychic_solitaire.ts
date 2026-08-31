/**
 * 🃏 Psychic Master Solitaire (PMS-v2.1) - Cartridge Logic 🃏
 * 
 * An elegant, unhinged, local-first card engine where inactive cards throw tantrums,
 * foundations are cozy bunk beds, and a temporal metronome tracks combo decays.
 */

export interface Card {
  suit: "🌸" | "🍀" | "⭐" | "🔮"; // Cozy desaturated visual suite
  rank: string;
  value: number;
  faceUp: boolean;
  whineLevel: number; // Tantrum indicator: 0 (stable) to 3 (loud crying)
}

export class PsychicSolitaire {
  private deck: Card[] = [];
  private foundations: Card[][] = [[], [], [], []]; // 4 Cozy Bunk Beds [~~~~~~~~~]
  private tableaus: Card[][] = Array(7).fill(null).map(() => []);
  private stock: Card[] = [];
  private waste: Card[] = [];
  
  // Urgency metronome variables
  private comboMeter: number = 100; // 0 to 100
  private decayRate: number = 1.0; // Dynamic scale: 1.0s down to 62ms
  private onStateChange: () => void = () => {};

  constructor() {
    this.initDeck();
    this.shuffle();
    this.deal();
  }

  private initDeck() {
    const suits: ("🌸" | "🍀" | "⭐" | "🔮")[] = ["🌸", "🍀", "⭐", "🔮"];
    const ranks = [
      { r: "A", v: 1 }, { r: "2", v: 2 }, { r: "3", v: 3 }, { r: "4", v: 4 },
      { r: "5", v: 5 }, { r: "6", v: 6 }, { r: "7", v: 7 }, { r: "8", v: 8 },
      { r: "9", v: 9 }, { r: "10", v: 10 }, { r: "J", v: 11 }, { r: "Q", v: 12 },
      { r: "K", v: 13 }
    ];

    this.deck = [];
    for (const suit of suits) {
      for (const rank of ranks) {
        this.deck.push({
          suit,
          rank: rank.r,
          value: rank.v,
          faceUp: false,
          whineLevel: 0
        });
      }
    }
  }

  private shuffle() {
    for (let i = this.deck.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.deck[i], this.deck[j]] = [this.deck[j], this.deck[i]];
    }
  }

  private deal() {
    let deckIndex = 0;
    for (let i = 0; i < 7; i++) {
      for (let j = i; j < 7; j++) {
        const card = this.deck[deckIndex++];
        if (j === i) card.faceUp = true;
        this.tableaus[j].push(card);
      }
    }
    this.stock = this.deck.slice(deckIndex);
  }

  public registerStateListener(cb: () => void) {
    this.onStateChange = cb;
  }

  /**
   * Called on every temporal urgency beat (from 1.0s to 62ms metronome).
   * Accelerates decay as combo decays, triggering card whining.
   */
  public pulseTick() {
    // 1. Decay the combo pool
    if (this.comboMeter > 0) {
      this.comboMeter -= this.decayRate;
      if (this.comboMeter < 30) {
        // Strobe rate accelerates (125ms -> 62ms panic)
        this.decayRate = 2.5;
      }
    } else {
      this.comboMeter = 0;
    }

    // 2. Sentient Whining Cards: Increment dissatisfaction on columns untouched
    for (let i = 0; i < 7; i++) {
      if (this.tableaus[i].length > 0) {
        const topCard = this.tableaus[i][this.tableaus[i].length - 1];
        if (topCard.faceUp && Math.random() > 0.85) {
          topCard.whineLevel = Math.min(3, topCard.whineLevel + 1);
        }
      }
    }

    this.onStateChange();
  }

  /**
   * Sentient dialogue interpreter returning the card's current complaint
   */
  public getCardComplaint(card: Card): string {
    switch (card.whineLevel) {
      case 1:
        return `(｡•́︿•̀｡) "Psst, are we going to move soon?"`;
      case 2:
        return `(╥﹏╥) "Seriously, I've been sitting on column 3 forever!"`;
      case 3:
        return `(ノಠ益ಠ)╯彡 "LET ME INTO THE COZY BUNK BED ALREADY!"`;
      default:
        return "";
    }
  }

  /**
   * Tucks a card safely into a foundation bunk bed [~~~~~~~~~]
   */
  public pushToBunkBed(tableauIndex: number): boolean {
    const tableau = this.tableaus[tableauIndex];
    if (tableau.length === 0) return false;

    const card = tableau[tableau.length - 1];
    
    // Find valid bunk bed slot
    for (let bedIndex = 0; bedIndex < 4; bedIndex++) {
      const bed = this.foundations[bedIndex];
      const targetVal = bed.length === 0 ? 1 : bed[bed.length - 1].value + 1;
      const targetSuit = bed.length === 0 ? card.suit : bed[0].suit;

      if (card.value === targetVal && card.suit === targetSuit) {
        // Transition Card
        bed.push(tableau.pop()!);
        card.whineLevel = 0; // Completely pacified inside the bed!
        
        // Boost Combo
        this.comboMeter = Math.min(100, this.comboMeter + 20);
        this.decayRate = Math.max(0.5, this.decayRate - 0.2); // Calm down strobe

        // Flip next tableau card
        if (tableau.length > 0) {
          tableau[tableau.length - 1].faceUp = true;
        }

        this.onStateChange();
        return true;
      }
    }
    return false;
  }

  public getTableauState() {
    return this.tableaus;
  }

  public getFoundations() {
    return this.foundations;
  }

  public getComboMeter() {
    return this.comboMeter;
  }
}
