import { useState, useEffect } from 'react';

// Explicit LocalStorage Persistence Key
const SFM256_LOOM_STATE_KEY = '@lorik/sfm256-loom-config-v1';

export interface LoomConfig {
  fontSize: number;
  volume: number;
  bpm: number;
  mascotWagSpeed: 'slow' | 'medium' | 'fast' | 'sync';
  themePalette: 'bubblegum' | 'lavender' | 'mint' | 'cream';
  p2Driver: 'little-bro' | 'void-cat' | 'goldfish' | 'big-sister';
  ttsEnabled: boolean;
  pillMode: boolean;
}

const DEFAULT_CONFIG: LoomConfig = {
  fontSize: 16,
  volume: 50,
  bpm: 120,
  mascotWagSpeed: 'sync',
  themePalette: 'bubblegum',
  p2Driver: 'void-cat',
  ttsEnabled: false,
  pillMode: false,
};

export const useSfm256LoomState = () => {
  const [config, setConfigState] = useState<LoomConfig>(() => {
    try {
      const stored = localStorage.getItem(SFM256_LOOM_STATE_KEY);
      return stored ? { ...DEFAULT_CONFIG, ...JSON.parse(stored) } : DEFAULT_CONFIG;
    } catch (e) {
      console.warn("SFM-256 Loom State: Failed to retrieve cached preferences, using soft defaults.", e);
      return DEFAULT_CONFIG;
    }
  });

  const setConfig = (updates: Partial<LoomConfig>) => {
    setConfigState(prev => {
      const updated = { ...prev, ...updates };
      localStorage.setItem(SFM256_LOOM_STATE_KEY, JSON.stringify(updated));
      return updated;
    });
  };

  // Instant cross-tab sync listener to protect focus states
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === SFM256_LOOM_STATE_KEY && e.newValue) {
        try {
          setConfigState(JSON.parse(e.newValue));
        } catch (err) {
          console.error("Failed to parse synchronized storage config", err);
        }
      }
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  return { config, setConfig };
};
