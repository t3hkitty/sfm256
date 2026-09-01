import React, { useEffect, useRef, useState } from 'react';
import { useSfm256LoomState, LoomConfig } from '../hooks/20260827-0715_sfm256_loom_state';

// Palette tailwind class mapping for maximum chibi-style Rounded Plumpitude
const PALETTE_STYLES = {
  bubblegum: {
    bg: 'bg-[#FFF5F7]',
    border: 'border-[#FFB7C5]',
    accent: '#FFB7C5',
    text: 'text-[#611A24]',
    pillActive: 'bg-[#FF69B4] text-white',
    pillInactive: 'bg-[#FFF0F2] text-[#FF69B4] hover:bg-[#FFD1D9]'
  },
  lavender: {
    bg: 'bg-[#F9F5FF]',
    border: 'border-[#D8B4F8]',
    accent: '#D8B4F8',
    text: 'text-[#3B154D]',
    pillActive: 'bg-[#9333EA] text-white',
    pillInactive: 'bg-[#F3E8FF] text-[#9333EA] hover:bg-[#E9D5FF]'
  },
  mint: {
    bg: 'bg-[#F2FCF7]',
    border: 'border-[#A8E6CF]',
    accent: '#A8E6CF',
    text: 'text-[#143D2A]',
    pillActive: 'bg-[#10B981] text-white',
    pillInactive: 'bg-[#ECFDF5] text-[#10B981] hover:bg-[#D1FAE5]'
  },
  cream: {
    bg: 'bg-[#FFFDF5]',
    border: 'border-[#E9C46A]',
    accent: '#E9C46A',
    text: 'text-[#4A3B18]',
    pillActive: 'bg-[#E76F51] text-white',
    pillInactive: 'bg-[#FDF8E2] text-[#E76F51] hover:bg-[#F4E9B9]'
  }
};

export const Sfm256LoomDashboard: React.FC<{
  isOpen: boolean;
  onClose: () => void;
}> = ({ isOpen, onClose }) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const { config, setConfig } = useSfm256LoomState();
  const [activeTab, setActiveTab] = useState<'console' | 'audio-loom' | 'lyrics' | 'movie-maker' | 'faq' | 'changelog'>('console');
  
  // Simulated Interactive States
  const [selectedKat, setSelectedKat] = useState<string>('RPG Maker 20k26 Parody.kat');
  const [consoleLogs, setConsoleLogs] = useState<string[]>([
    '🐾 FabiMeow Bootloader initialized...',
    '🐱 [KAT-256] Purring on boot... Slot 1: RPG Maker 20k26 Parody.kat loaded.',
    '👾 VRAM Allocation: 1,048,576 bytes of pure monospace luxury online!'
  ]);
  const [userInput, setUserInput] = useState<string>('');
  const [toast, setToast] = useState<string | null>(null);

  // Audio Loom Stems States
  const [stemsActive, setStemsActive] = useState({ track1: true, track2: true, track3: false, track4: true });
  
  // Lyric / Mondegreen state
  const [lyricsList, setLyricsList] = useState<Array<{ time: number; canon: string; heard: string }>>([
    { time: 0, canon: "Don't wanna be an American idiot.", heard: "Don't wanna bee a berry can eyed-oat." },
    { time: 4, canon: "One nation controlled by the media.", heard: "One bacon controlled by the meet-ya." },
    { time: 8, canon: "Information age of hysteria.", heard: "Information page of hysterectomy." },
    { time: 12, canon: "It's calling out to idiot America.", heard: "Its collywobbles out to idiot America." }
  ]);
  const [selectedLyricIndex, setSelectedLyricIndex] = useState<number>(-1);
  const [tempHeardText, setTempHeardText] = useState<string>('');

  // 3D Movie Maker / Storyteller states
  const [protagToken, setProtagToken] = useState<string>('@PROTAG [Fabi]');
  const [deuterToken, setDeuterToken] = useState<string>('@DEUTER [Loki]');
  const [currentFrameText, setCurrentFrameText] = useState<string>('Fabi meets Loki in Mapleberry Forest under a neon pink sunset.');
  const [asciiFrame, setAsciiFrame] = useState<string>(
    "     /\\_/\\        /\\_/\\\n" +
    "    ( =^.^= )      ( o.o )\n" +
    "   ===|     |===  ===|   |===\n" +
    "     /|_|_|\\       /|_|_|\\\n" +
    "~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~\n" +
    " [🍁 Mapleberry Forest - 40°F ⛄]"
  );

  // Esc and Click Outside Listeners
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        onClose();
      }
    };
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  const triggerToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  if (!isOpen) return null;

  const currentTheme = PALETTE_STYLES[config.themePalette];

  // Handler: Run CLI console input
  const handleConsoleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userInput.trim()) return;

    const cmd = userInput.trim().toLowerCase();
    const newLogs = [...consoleLogs, `P1_User$ ${userInput}`];

    if (cmd === 'help') {
      newLogs.push('🐾 Available command lists:', '  help           - Show this adorable guide', '  p2             - Inspect active virtual Player 2 telemetry', '  shake          - Emulate phone-shake kinetic action', '  clear          - Wipe screen terminal buffers');
    } else if (cmd === 'p2') {
      const responses = {
        'little-bro': '🎮 Player 2 (Little Bro): *Mashing every button frantically! Zero game impact!*',
        'void-cat': '🐱 Player 2 (Void Cat): *Sleeping on the haptic touch-grid. Cards are blocked!*',
        'goldfish': '🐠 Player 2 (Twitch Goldfish): *Swimming in circles. Random touch coordinate emitted!*',
        'big-sister': '👑 Player 2 (Tryhard Big Sister): *180 APM frame-perfect run engaged. Git gud!*'
      };
      newLogs.push(responses[config.p2Driver]);
    } else if (cmd === 'shake') {
      newLogs.push('📳 Shake detected! Upward kinetic thrust (2.4g) -> Triggered foundation card snap!');
      triggerToast('Phone-shake action triggered! 📳');
    } else if (cmd === 'clear') {
      setConsoleLogs(['🧹 Terminal buffer purged.']);
      setUserInput('');
      return;
    } else {
      newLogs.push(`😿 Command not recognized: "${userInput}". Type "help" for snug tips!`);
    }

    setConsoleLogs(newLogs);
    setUserInput('');
  };

  // Handler: Save misheard lyric (Mondegreen stamp)
  const saveMondegreen = () => {
    if (selectedLyricIndex === -1 || !tempHeardText.trim()) {
      triggerToast('Please select a lyric line and write your interpretation! 🐾');
      return;
    }
    const updated = [...lyricsList];
    updated[selectedLyricIndex].heard = tempHeardText;
    setLyricsList(updated);
    
    // Simulate Local-first sidecar Markdown writing
    triggerToast('👂 Misheard lyric stamped to Lexicon Vault sidecar! (ZK-20260827)');
    setTempHeardText('');
    setSelectedLyricIndex(-1);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-md transition-opacity p-4 font-sans select-none">
      
      {/* Maximum Rounded Plumpitude Container */}
      <div 
        ref={modalRef}
        className={`relative w-full max-w-6xl h-[90vh] overflow-hidden flex flex-col shadow-[0_16px_50px_rgba(0,0,0,0.15)] transition-all duration-300 ${currentTheme.bg}`}
        style={{
          borderRadius: config.pillMode ? '9999px' : '40px', // Chibi Gospel rounding rule
          border: `6px solid ${currentTheme.accent}`
        }}
      >
        {/* Soft, Saturated Pastel Header */}
        <div className={`flex justify-between items-center p-6 border-b-4 ${currentTheme.border} bg-white/70 backdrop-blur-sm`}>
          <div className="flex items-center gap-4">
            <div className="text-4xl">(=^･ω･^=)</div>
            <div>
              <h1 className={`text-2xl font-black tracking-tight ${currentTheme.text}`}>
                Super FabiMeow 256 Narrative Loom
              </h1>
              <p className="text-xs font-semibold text-slate-500 tracking-wide uppercase">
                Zero-Threat Creative Scaffold • AGV Edition
              </p>
            </div>
          </div>

          {/* Core Controls */}
          <div className="flex gap-2 items-center">
            {/* Theme Selector */}
            <select
              value={config.themePalette}
              onChange={(e) => setConfig({ themePalette: e.target.value as any })}
              className={`px-3 py-2 font-bold text-sm rounded-full border-2 bg-white ${currentTheme.text}`}
              style={{ borderColor: currentTheme.accent }}
            >
              <option value="bubblegum">🌸 Bubblegum</option>
              <option value="lavender">💜 Lavender</option>
              <option value="mint">🌿 Mint</option>
              <option value="cream">🍯 Cream</option>
            </select>

            {/* Plumpitude Max Rounding Toggle */}
            <button
              onClick={() => {
                setConfig({ pillMode: !config.pillMode });
                triggerToast(config.pillMode ? 'Soft rounding restored! 🐾' : 'MAXIMUM PLUMPITUDE PILL ENGAGED! 🎀');
              }}
              className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg border-2 bg-white hover:scale-105 transition-transform`}
              style={{ borderColor: currentTheme.accent }}
              title="Toggle Chibi Plumpitude"
            >
              {config.pillMode ? '💊' : '🧸'}
            </button>

            <button 
              onClick={onClose}
              className="px-6 py-2 bg-rose-400 hover:bg-rose-500 text-white font-black text-sm rounded-full shadow-md transition-all hover:scale-105 active:scale-95"
            >
              Exit Sanctuary
            </button>
          </div>
        </div>

        {/* Dynamic Navigation Tabs */}
        <div className={`flex gap-2 p-4 border-b-2 ${currentTheme.border} bg-white/40`}>
          {[
            { id: 'console', label: '🎮 Virtual Console', icon: '👾' },
            { id: 'audio-loom', label: '🎼 Stem Audio-Loom', icon: '🎸' },
            { id: 'lyrics', label: '👂 Lyric Gutter', icon: '🎵' },
            { id: 'movie-maker', label: '🎬 Movie Maker', icon: '🎥' },
            { id: 'faq', label: '💬 Helpful FAQ', icon: '💡' },
            { id: 'changelog', label: '📜 Update History', icon: '✍️' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-5 py-2 font-black text-sm rounded-full transition-all flex items-center gap-2 ${activeTab === tab.id ? currentTheme.pillActive : currentTheme.pillInactive}`}
            >
              <span>{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>

        {/* Article/Sanctuary Body Viewport */}
        <div className="flex-1 overflow-y-auto p-8 flex flex-col gap-6">
          
          {/* TAB 1: VIRTUAL CONSOLE */}
          {activeTab === 'console' && (
            <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Monospace 144Hz CRT Screen Viewport */}
              <div className="lg:col-span-2 bg-[#090816] border-4 border-slate-700/50 rounded-[32px] p-6 shadow-inner flex flex-col h-[450px] relative">
                {/* Simulated Scanline */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,_rgba(0,0,0,0.25)_50%)] bg-[size:100%_4px] pointer-events-none opacity-20" />
                
                {/* Top LED Statuses */}
                <div className="flex justify-between items-center mb-4 border-b border-slate-800 pb-2 text-[10px] text-[#FF69B4] font-mono">
                  <span>SYSTEM TARGET: W56-BIT AMAMOLED ENGINE</span>
                  <span className="animate-pulse">🟢 144Hz LOCK STABLE</span>
                </div>

                {/* Logs Stream */}
                <div className="flex-1 font-mono text-sm overflow-y-auto text-[#A8E6CF] space-y-2 select-text scrollbar-thin">
                  {consoleLogs.map((log, idx) => (
                    <div key={idx} className={log.startsWith('P1_User') ? 'text-[#FF69B4]' : log.includes('Player 2') ? 'text-[#D8B4F8]' : ''}>
                      {log}
                    </div>
                  ))}
                </div>

                {/* Input Prompt */}
                <form onSubmit={handleConsoleSubmit} className="mt-4 flex gap-2 border-t border-slate-800 pt-3">
                  <span className="font-mono text-slate-500">P1_User$</span>
                  <input
                    type="text"
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                    placeholder="Type help, shake, clear, or p2..."
                    className="flex-1 bg-transparent border-none outline-none font-mono text-sm text-white caret-[#FF69B4]"
                  />
                  <button type="submit" className="px-4 py-1 bg-slate-800 hover:bg-slate-700 text-[#FF69B4] font-mono text-xs rounded-full border border-slate-700">
                    EXE
                  </button>
                </form>
              </div>

              {/* Console Settings Panel */}
              <div className="flex flex-col gap-4 bg-white/60 p-6 border-2 border-dashed rounded-[32px]" style={{ borderColor: currentTheme.accent }}>
                <h3 className={`text-lg font-black ${currentTheme.text}`}>Console Cart Settings</h3>
                
                <div className="space-y-3">
                  <label className="block text-sm font-bold text-slate-600">Select .kat Cartridge File</label>
                  <select
                    value={selectedKat}
                    onChange={(e) => {
                      setSelectedKat(e.target.value);
                      triggerToast(`Swapped to ${e.target.value}! 🐾`);
                    }}
                    className="w-full px-4 py-2 bg-white rounded-full border-2 text-sm font-bold"
                    style={{ borderColor: currentTheme.accent }}
                  >
                    <option value="RPG Maker 20k26 Parody.kat">🕹️ RPG Maker 20k26 Parody.kat</option>
                    <option value="psychic-master-solitaire.kat">🎴 Psychic Master Solitaire.kat</option>
                    <option value="doom-256-slop.kat">👿 Doom 256 (AI Slop Edition).kat</option>
                  </select>
                </div>

                <div className="space-y-3">
                  <label className="block text-sm font-bold text-slate-600">Virtual Player 2 Driver</label>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { id: 'little-bro', label: '🎮 Little Bro' },
                      { id: 'void-cat', label: '🐱 Void Cat' },
                      { id: 'goldfish', label: '🐠 Goldfish' },
                      { id: 'big-sister', label: '👑 Big Sis' }
                    ].map(drv => (
                      <button
                        key={drv.id}
                        onClick={() => {
                          setConfig({ p2Driver: drv.id as any });
                          triggerToast(`P2 set to ${drv.label}!`);
                        }}
                        className={`px-3 py-2 text-xs font-black rounded-full transition-all ${config.p2Driver === drv.id ? 'bg-[#FF69B4] text-white' : 'bg-white hover:bg-slate-100'}`}
                      >
                        {drv.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Cat Mascot Tail Dynamics (Simulated) */}
                <div className="flex-1 flex flex-col items-center justify-center p-4 bg-white rounded-[24px] border border-slate-100 text-center">
                  <div className="text-4xl animate-bounce">😸</div>
                  <span className="font-mono text-xs text-slate-500 mt-2">
                    Tail Wag Speed: <span className="font-bold text-[#FF69B4]">{config.bpm} BPM</span>
                  </span>
                  <div className="w-full bg-slate-100 h-2 rounded-full mt-2 overflow-hidden">
                    <div className="bg-[#FF69B4] h-full transition-all" style={{ width: `${(config.bpm / 200) * 100}%` }} />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: AUDIO LOOM */}
          {activeTab === 'audio-loom' && (
            <div className="flex-1 flex flex-col gap-6">
              <div className="bg-white/70 p-6 rounded-[32px] border-2" style={{ borderColor: currentTheme.accent }}>
                <h3 className={`text-xl font-black ${currentTheme.text} mb-2`}>
                  MyBlackBox 4-Track Stems Loom
                </h3>
                <p className="text-sm text-slate-600">
                  Ground your focus by adjusting independent sensory loops. Speed up or slow down the rhythm to match your drafting cadence.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {[
                  { track: 'track1', name: 'Track 1: Sensory Drums', icon: '🥁', desc: 'Continuous rhythmic rain blocks & ticking clocks' },
                  { track: 'track2', name: 'Track 2: Idle Ticks', icon: '🐈', desc: 'Ambient cat purring and tail twitch clicks' },
                  { track: 'track3', name: 'Track 3: Banter Arpeggio', icon: '🔮', desc: 'Generates automated dialogue loops on keypress' },
                  { track: 'track4', name: 'Track 4: Lead Prose', icon: '✍️', desc: 'Your live coordinate drafting keystrokes solo' }
                ].map(stem => (
                  <div 
                    key={stem.track}
                    className={`p-6 rounded-[28px] border-2 bg-white flex flex-col items-center text-center transition-all ${stemsActive[stem.track] ? 'border-[#FF69B4] shadow-md' : 'border-slate-200 opacity-60'}`}
                  >
                    <div className="text-4xl mb-2">{stem.icon}</div>
                    <h4 className="font-black text-sm text-slate-800">{stem.name}</h4>
                    <p className="text-xs text-slate-500 my-3 flex-1">{stem.desc}</p>
                    <button
                      onClick={() => {
                        setStemsActive(prev => {
                          const updated = { ...prev, [stem.track]: !prev[stem.track] };
                          triggerToast(updated[stem.track] ? `${stem.name} Muted! 🔇` : `${stem.name} Resonating! 🔊`);
                          return updated;
                        });
                      }}
                      className={`px-4 py-2 text-xs font-black rounded-full w-full transition-all ${stemsActive[stem.track] ? 'bg-[#FF69B4] text-white' : 'bg-slate-200 text-slate-600'}`}
                    >
                      {stemsActive[stem.track] ? '🔊 ACTIVE' : '🔇 MUTED'}
                    </button>
                  </div>
                ))}
              </div>

              {/* Volume and Tempo controls */}
              <div className="bg-white/80 p-6 rounded-[32px] border border-slate-100 flex flex-col md:flex-row gap-6 justify-between">
                <div className="flex-1 space-y-2">
                  <div className="flex justify-between font-bold text-sm text-slate-600">
                    <span>Main Audio Loom Volume</span>
                    <span>{config.volume}%</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={config.volume}
                    onChange={(e) => setConfig({ volume: parseInt(e.target.value) })}
                    className="w-full accent-[#FF69B4]"
                  />
                </div>

                <div className="flex-1 space-y-2">
                  <div className="flex justify-between font-bold text-sm text-slate-600">
                    <span>Cadence Tempo Meter</span>
                    <span>{config.bpm} BPM</span>
                  </div>
                  <input
                    type="range"
                    min="60"
                    max="200"
                    value={config.bpm}
                    onChange={(e) => setConfig({ bpm: parseInt(e.target.value) })}
                    className="w-full accent-[#FF69B4]"
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: LYRICS */}
          {activeTab === 'lyrics' && (
            <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-6">
              
              {/* Dual-Gutter Split Lyric Screen */}
              <div className="md:col-span-2 bg-white/70 p-6 rounded-[32px] border-2 flex flex-col" style={{ borderColor: currentTheme.accent }}>
                <h3 className={`text-lg font-black ${currentTheme.text} mb-4`}>
                  👂 Dual-Track Split Gutter Lyric Loom
                </h3>

                <div className="flex-1 space-y-4">
                  <div className="grid grid-cols-2 text-xs font-black text-slate-400 border-b pb-2">
                    <span>TRACK A: CANON OFFICIAL LYRICS (LRC)</span>
                    <span>TRACK B: WHAT I HEARD (MONDEGREENS)</span>
                  </div>

                  <div className="space-y-3 h-[250px] overflow-y-auto">
                    {lyricsList.map((line, idx) => (
                      <div 
                        key={idx}
                        onClick={() => {
                          setSelectedLyricIndex(idx);
                          setTempHeardText(line.heard);
                        }}
                        className={`grid grid-cols-2 p-3 text-sm font-semibold rounded-[16px] cursor-pointer transition-colors ${selectedLyricIndex === idx ? 'bg-[#FF69B4]/15 border-2 border-dashed border-[#FF69B4]' : 'hover:bg-slate-100'}`}
                      >
                        <div className="text-slate-700 font-mono">🎵 {line.canon}</div>
                        <div className="text-[#FF69B4] italic font-mono pl-4">{line.heard}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Mondegreen Stamping Box */}
              <div className="flex flex-col gap-4 bg-white/60 p-6 border-2 border-dashed rounded-[32px]" style={{ borderColor: currentTheme.accent }}>
                <h3 className={`text-md font-black ${currentTheme.text} flex items-center gap-2`}>
                  <span>👂</span> One-Tap Mondegreen Stamp
                </h3>
                <p className="text-xs text-slate-500">
                  Highlight and customize misheard lines. Tap the Stamp button to instantly write to your flat-file Lexicon Database.
                </p>

                <div className="space-y-2">
                  <label className="block text-xs font-bold text-slate-600">Editing Gutter Line</label>
                  <input
                    type="text"
                    disabled
                    value={selectedLyricIndex === -1 ? 'Click on a lyric line left...' : `Line ${selectedLyricIndex + 1}: ${lyricsList[selectedLyricIndex].canon}`}
                    className="w-full px-4 py-2 bg-slate-100 border rounded-full text-xs font-bold text-slate-500"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-xs font-bold text-slate-600">My Misheard Transcription</label>
                  <input
                    type="text"
                    value={tempHeardText}
                    onChange={(e) => setTempHeardText(e.target.value)}
                    placeholder="e.g. Don't wanna bee a berry can..."
                    className="w-full px-4 py-2 bg-white border-2 rounded-full text-xs font-bold outline-none"
                    style={{ borderColor: currentTheme.accent }}
                  />
                </div>

                <button
                  onClick={saveMondegreen}
                  className="mt-2 w-full py-3 bg-[#9333EA] hover:bg-[#7e22ce] text-white font-black rounded-full flex items-center justify-center gap-2 text-sm shadow-md"
                >
                  <span>[👂 + ❓]</span> Stamp to Lexicon Vault
                </button>
              </div>
            </div>
          )}

          {/* TAB 4: MOVIE MAKER */}
          {activeTab === 'movie-maker' && (
            <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-6">
              
              {/* ASCII Raymarching Viewport */}
              <div className="lg:col-span-2 bg-[#120e2e] p-6 rounded-[32px] border-4 border-[#FFB7C5] flex flex-col h-[400px]">
                <div className="flex justify-between items-center mb-3 text-xs font-mono text-[#FFB7C5]">
                  <span>AMM-256 MONOSPACE CAMERA RAYMARCHER</span>
                  <span>REEL 1 of 1</span>
                </div>

                {/* Viewport Frame Box */}
                <div className="flex-1 flex items-center justify-center bg-[#090816] rounded-[24px] p-4 font-mono text-sm leading-tight text-[#FFB7C5] shadow-inner select-text whitespace-pre">
                  {asciiFrame}
                </div>

                <div className="mt-3 flex justify-between items-center">
                  <button 
                    onClick={() => {
                      triggerToast('Loading preceding cutscene frame... 🐾');
                    }}
                    className="px-4 py-1.5 bg-slate-800 text-xs font-bold rounded-full hover:bg-slate-700 text-white"
                  >
                    ◀ Prev Frame
                  </button>
                  <span className="font-mono text-xs text-[#FFB7C5]">Dynamic 3D depth buffer: 80x25</span>
                  <button 
                    onClick={() => {
                      triggerToast('Loading proceeding cutscene frame... 🐾');
                    }}
                    className="px-4 py-1.5 bg-slate-800 text-xs font-bold rounded-full hover:bg-slate-700 text-white"
                  >
                    Next Frame ▶
                  </button>
                </div>
              </div>

              {/* Storyteller Config */}
              <div className="flex flex-col gap-4 bg-white/60 p-6 border-2 border-dashed rounded-[32px]" style={{ borderColor: currentTheme.accent }}>
                <h3 className={`text-md font-black ${currentTheme.text}`}>Storyteller Derivation</h3>
                
                <div className="space-y-2">
                  <label className="block text-xs font-bold text-slate-600">@PROTAG Trait Pinning</label>
                  <input
                    type="text"
                    value={protagToken}
                    onChange={(e) => setProtagToken(e.target.value)}
                    className="w-full px-4 py-2 border-2 bg-white rounded-full text-xs font-bold"
                    style={{ borderColor: currentTheme.accent }}
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-xs font-bold text-slate-600">@DEUTER Trait Pinning</label>
                  <input
                    type="text"
                    value={deuterToken}
                    onChange={(e) => setDeuterToken(e.target.value)}
                    className="w-full px-4 py-2 border-2 bg-white rounded-full text-xs font-bold"
                    style={{ borderColor: currentTheme.accent }}
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-xs font-bold text-slate-600">Scene Narrative Prose</label>
                  <textarea
                    value={currentFrameText}
                    onChange={(e) => {
                      setCurrentFrameText(e.target.value);
                    }}
                    className="w-full h-20 px-4 py-2 border-2 bg-white rounded-[16px] text-xs font-semibold outline-none"
                    style={{ borderColor: currentTheme.accent }}
                  />
                </div>

                <button
                  onClick={() => {
                    // Simulate compile
                    triggerToast('Compiling written prose to ASCII Raymarched cart... (=^･ω･^=)');
                    setConsoleLogs(prev => [
                      ...prev,
                      `🚀 Storyteller: prose compiled to cartridge reel.`,
                      `🎬 Protagonist traits resolved for: ${protagToken}`
                    ]);
                  }}
                  className="w-full py-2 bg-[#FF69B4] hover:bg-[#FF1493] text-white font-black rounded-full text-xs tracking-wider"
                >
                  RE-COMPILER NARRATIVE LOOM
                </button>
              </div>
            </div>
          )}

          {/* TAB 5: FAQ */}
          {activeTab === 'faq' && (
            <div className="space-y-4 bg-white/70 p-6 rounded-[32px] border">
              <h3 className={`text-xl font-black ${currentTheme.text} mb-4`}>Frequently Asked Questions 💬</h3>
              
              <div className="space-y-3">
                <p className="font-bold text-slate-800">Q: Why are there no sharp 0px brutalist margins here?</p>
                <p className="text-sm text-slate-600 leading-relaxed">
                  A: Our research into neurodivergent cognitive ergonomics shows that rigid sharp edges communicate stress. The Kawaiian Chibi guidelines mandate "Rounded Plumpitude" (pill-shaped corners) to protect your sensory peace.
                </p>
              </div>

              <div className="space-y-3 border-t pt-3">
                <p className="font-bold text-slate-800">Q: Does the AI make up my game lore or write my story?</p>
                <p className="text-sm text-slate-600 leading-relaxed">
                  A: Absolutely not! The AI acts solely as a mechanical stylus and compilation assistant. Your prose manuscript is the single source of truth; the AI merely structures dialogue trees and translates pacing coordinates.
                </p>
              </div>

              <div className="space-y-3 border-t pt-3">
                <p className="font-bold text-slate-800">Q: Is my data safe on a remote server?</p>
                <p className="text-sm text-slate-600 leading-relaxed">
                  A: Yes, we practice extreme local custody. All preferences, saved carts, and misheard lyric stamps exist entirely within your local browser storage or flat markdown databases. No corporate telemetry allowed!
                </p>
              </div>
            </div>
          )}

          {/* TAB 6: CHANGELOG */}
          {activeTab === 'changelog' && (
            <div className="space-y-4 bg-white/70 p-6 rounded-[32px] border font-mono text-sm leading-relaxed text-slate-700">
              <h3 className={`text-xl font-black ${currentTheme.text} mb-4 font-sans`}>Changelog & Milestones 📜</h3>
              
              <div className="space-y-2">
                <p className="font-black font-sans text-slate-800">v3.0.0 — Rounded Plumpitude Release</p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Eradicated brutalist 0px border constraints across the workspace.</li>
                  <li>Injected maximum rounded-full pill shapes, soft gradient overlays, and pastels.</li>
                  <li>Integrated the MyBlackBox 4-track ambient audio metronome lock.</li>
                  <li>Built the [👂 + ❓] One-Tap Mondegreen lyric stamping pipeline.</li>
                  <li>Restructured settings with sticky LocalStorage sync keys.</li>
                </ul>
              </div>
            </div>
          )}

        </div>

        {/* Tactile Status Toaster */}
        {toast && (
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 px-6 py-3 bg-emerald-500 text-white font-black text-sm rounded-full shadow-lg animate-bounce z-50">
            🐾 {toast}
          </div>
        )}
      </div>
    </div>
  );
};
