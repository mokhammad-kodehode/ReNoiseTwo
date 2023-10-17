import React, { createContext, useContext, useState } from 'react';

interface AudioContextProps {
  children: React.ReactNode;
}

interface AudioContextValue {
  isPlaying: boolean;
  pauseAllSounds: () => void;
  resumeAllSounds: () => void;
}

const AudioContext = createContext<AudioContextValue | undefined>(undefined);

const AudioContextProvider: React.FC<AudioContextProps> = ({ children }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const pauseAllSounds = () => {
    // Реализуйте логику для остановки всех звуков
    setIsPlaying(false);
  };

  const resumeAllSounds = () => {
    // Логика для возобновления всех звуков
    setIsPlaying(true);
  };

  const value: AudioContextValue = {
    isPlaying,
    pauseAllSounds,
    resumeAllSounds,
  };

  return (
    <AudioContext.Provider value={value}>
      {children}
    </AudioContext.Provider>
  );
};

const useAudioContext = () => {
  const context = useContext(AudioContext);
  if (!context) {
    throw new Error('useAudioContext must be used within an AudioContextProvider');
  }
  return context;
};

export { AudioContextProvider, useAudioContext };