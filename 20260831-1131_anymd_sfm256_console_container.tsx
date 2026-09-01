import React, { useState, useEffect, useRef } from 'react';
import { useSfm256State } from '../hooks/20260831-1130_sfm256_sync_state';

interface Comment {
  id: number;
  text: string;
  top: number;
  color: string;
}

export const SFM256ConsoleContainer: React.FC = () => {
  const { config, setConfig } = useSfm256State();
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [combo, setCombo] = useState<number>(1);
  const [activeKat, setActiveKat] = useState<string>('psychic_solitaire.kat');
  const [comments, setComments] = useState<Comment[]>([]);
  const [toast, setToast] = useState<string | null>(null);
  
  const textBufferRef = useRef<HTMLDivElement>(null);
  const triggerHaptic = () => {
    if (navigator.vibrate) navigator.vibrate(20);
  };

  const showToast = (msg: string) => {
    setToast(msg);
    triggerHaptic();
    setTimeout(() => setToast(null), 3000);
  };

  // Danmaku comments generator loop
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      const liveShouts = [
        "POGGERS! (=^･ω･^=)",
        "That card speed is unreal!",
        "Is this 256-bit Blast Processing??",
        "Wait, the Spheal married the washer??",
        "No way! 10/10 combo!",
        "Double-Entropy loop looks insane",
        "TILT warnings are active!",
        "Mascot is vibing hard (｡•̀︿•̀｡)"
      ];
      const randomText = liveShouts[Math.floor(Math.random() * liveShouts.length)];
      const randomTop = Math.floor(Math.random() * 60) + 15;
      const colors = ['#f472b6', '#c084fc', '#34d399', '#60a5fa', '#fbbf24'];
      const randomColor = colors[Math.floor(Math.random() * colors.length)];
      
      setComments(prev => [...prev, {
        id: Date.now() + Math.random(),
        text: randomText,
        top: randomTop,
        color: randomColor
      }]);
    }, 1200);

    return () => clearInterval(interval);
  }, [isPlaying]);

  return (
    <div className="flex flex-col h-full bg-[#120d18] text-[#e9d5ff] p-4 font-sans select-none">
      {/* Maximum Rounded Plumpitude Board */}
      <div 
        className="flex-1 flex flex-col bg-[#1e1b4b] relative overflow-hidden border-[#e9d5ff]"
        style={{
          borderRadius: '32px',
          borderWidth: '6px',
          boxShadow: '0 20px 50px rgba(0, 0, 0, 0.5)'
        }}
      >
        {/* Render Live Danmaku comments over Viewport */}
        {isPlaying && comments.map((comment) => (
          <div
            key={comment.id}
            className="absolute font-mono font-black text-sm whitespace-nowrap animate-danmaku pointer-events-none z-10"
            style={{ 
              top: `${comment.top}%`, 
              color: comment.color,
              animationDuration: '6s'
            }}
          >
            {comment.text}
          </div>
        ))}

        {/* CRT Monospace Game Viewport Header */}
        <div className="flex justify-between items-center bg-[#2e1065] px-6 py-4 border-b-4 border-[#e9d5ff]">
          <div className="flex items-center gap-3">
            <span className="text-2xl">🕹️</span>
            <h1 className="text-lg font-black tracking-wider uppercase text-white">
              Super FabiMeow 256 Console
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 text-xs font-black rounded-full bg-[#34d399] text-[#120d18] animate-pulse">
              144Hz Active
            </span>
            <span className="px-3 py-1 text-xs font-black rounded-full bg-[#c084fc] text-white">
              {config.activePalette.toUpperCase()} MODE
            </span>
          </div>
        </div>

        {/* Core Monospace Grid Playfield (80x25 Character Layout) */}
        <div className="flex-1 flex p-6 relative">
          <div className="flex-1 bg-[#090514] rounded-[24px] p-6 font-mono text-[#a78bfa] overflow-y-auto relative shadow-inner">
            <div className="absolute top-4 right-4 flex items-center gap-2 bg-[#2e1065] p-3 rounded-full border-2 border-[#e9d5ff] text-xs">
              <span>(=^.ω.^=)</span>
              <span className="font-bold text-[#f472b6]">Cat-Orb</span>
            </div>

            <p className="text-xs text-slate-500 mb-2">// BOOT DRIVE: Load game kat from GitHub</p>
            <p className="text-[#34d399] font-black">{`> SUCCESS: Mounted ${activeKat} ROM!`}</p>
            <p className="mt-2 text-yellow-400 font-bold">{`> TELEMETRY: Score: ${score} | Combo: x${combo}`}</p>
            
            {/* Visual game card rendering */}
            <pre className="mt-6 text-[#c084fc] text-sm leading-tight">
{`
     ┌───────┐  ┌───────┐  ┌───────┐  [ BUNK BEDS ]
     │ A     │  │ K     │  │ Q     │  P1: Disconnected Bro
     │   🐾  │  │   👑  │  │   👑  │  P2: Void Cat (Loafing)
     │     A │  │     K │  │     Q │  Combo meter decay: [|||||   ]
     └───────┘  └───────┘  └───────┘
`}
            </pre>
          </div>
        </div>

        {/* Interactive Custom Haptic Control Strip / Soft-Deck */}
        <div className="bg-[#2e1065] p-6 border-t-4 border-[#e9d5ff] flex flex-col gap-4">
          <div className="flex justify-between items-center">
            <span className="text-xs font-black text-[#c084fc]">PROGRAMMABLE D-PAD</span>
            <div className="flex gap-2">
              <button 
                onClick={() => {
                  setConfig({ activePalette: 'cyberpunk' });
                  showToast("Palette updated to Neon Cyberpunk! ⚡");
                }}
                className="px-3 py-1 rounded-full bg-[#120d18] text-[#c084fc] text-xs font-bold border border-[#e9d5ff]"
              >Palette</button>
              <button 
                onClick={() => {
                  setConfig({ activeP2Profile: 'void-cat' });
                  showToast("Void Cat Player 2 Activated! 🐈‍⬛");
                }}
                className="px-3 py-1 rounded-full bg-[#120d18] text-[#c084fc] text-xs font-bold border border-[#e9d5ff]"
              >P2 Profile</button>
            </div>
          </div>
          
          <div className="grid grid-cols-5 gap-3">
            <button 
              onClick={() => {
                triggerHaptic();
                setScore(p => p + 100);
                setCombo(c => c + 1);
              }}
              className="py-4 bg-[#f472b6] text-white font-black rounded-2xl hover:scale-105 active:scale-95 transition-all text-sm border-b-4 border-[#db2777]"
            >
              🎮 LEFT
            </button>
            <button 
              onClick={() => {
                triggerHaptic();
                setScore(p => p + 250);
                setIsPlaying(p => !p);
                showToast(isPlaying ? "Game Paused!" : "Game Running!");
              }}
              className="py-4 bg-[#c084fc] text-white font-black rounded-2xl hover:scale-105 active:scale-95 transition-all text-sm border-b-4 border-[#9333ea]"
            >
              {isPlaying ? "⏸️ PAUSE" : "▶️ PLAY"}
            </button>
            <button 
              onClick={() => {
                triggerHaptic();
                setCombo(1);
                showToast("D-Pad input registers pinball rock/nudge!");
              }}
              className="py-4 bg-[#34d399] text-[#120d18] font-black rounded-2xl hover:scale-105 active:scale-95 transition-all text-sm border-b-4 border-[#059669]"
            >
              🕹️ RIGHT
            </button>
            <button 
              onClick={() => {
                triggerHaptic();
                setScore(0);
                setCombo(1);
                showToast("System hot-swapped!");
              }}
              className="py-4 bg-[#60a5fa] text-white font-black rounded-2xl hover:scale-105 active:scale-95 transition-all text-sm border-b-4 border-[#2563eb]"
            >
              🔄 RESET
            </button>
            <button 
              onClick={() => {
                triggerHaptic();
                showToast("EOD Zettel outline copied to clipboard!");
              }}
              className="py-4 bg-[#fbbf24] text-[#120d18] font-black rounded-2xl hover:scale-105 active:scale-95 transition-all text-sm border-b-4 border-[#d97706]"
            >
              📋 EXPORT
            </button>
          </div>
        </div>
      </div>

      {/* Floating Status Toast Notification */}
      {toast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 px-8 py-3 bg-[#10b981] text-white font-black text-lg rounded-full shadow-[0_10px_20px_rgba(16,185,129,0.4)] animate-bounce z-50">
          {toast}
        </div>
      )}
    </div>
  );
};
export default SFM256ConsoleContainer;
