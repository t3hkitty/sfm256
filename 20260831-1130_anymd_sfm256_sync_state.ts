import { useState, useEffect } from 'react';

const SFM256_PREFS_KEY = '@lorik/sfm256-console-prefs';

export interface Sfm256Config {
  volume: number;
  bpmSync: boolean;
  activePalette: 'pastel' | 'monochrome' | 'cyberpunk' | 'retro-wood';
  activeP2Profile: 'none' | 'little-bro' | 'void-cat' | 'tryhard';
  activeKatRepo: string;
}

const DEFAULT_CONFIG: Sfm256Config = {
  volume: 75,
  bpmSync: true,
  activePalette: 'pastel',
  activeP2Profile: 'none',
  activeKatRepo: 'https://raw.githubusercontent.com/anymd-engine/vapor-kats/main/index.json',
};

export const useSfm256State = () => {
  const [config, setConfigState] = useState<Sfm256Config>(() => {
    try {
      const stored = localStorage.getItem(SFM256_PREFS_KEY);
      return stored ? { ...DEFAULT_CONFIG, ...JSON.parse(stored) } : DEFAULT_CONFIG;
    } catch (e) {
      console.warn("SFM256 State: Storage read failure, defaulting to Kawaii parameters.", e);
      return DEFAULT_CONFIG;
    }
  });

  const setConfig = (updates: Partial<Sfm256Config>) => {
    setConfigState(prev => {
      const updated = { ...prev, ...updates };
      localStorage.setItem(SFM256_PREFS_KEY, JSON.stringify(updated));
      return updated;
    });
  };

  // Live Storage Listener for instant multi-window and sidebar sync
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === SFM256_PREFS_KEY && e.newValue) {
        setConfigState(JSON.parse(e.newValue));
      }
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  return { config, setConfig };
};
