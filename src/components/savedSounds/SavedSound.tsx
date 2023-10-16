import React, { useState } from 'react';
//import styles from './saved.module.css';

interface SavedMix {
  name: string;
  sounds: SoundData[];
}

interface SoundData {
  title: string;
  soundSource: string;
  videoSource: string;
  imageSource: string;
  // Дополнительные свойства SoundData, если они у вас есть
}

interface SavedMixesProps {
  onSaveMix: (mixName: string) => void;
  savedMixes: SavedMix[];
  onPlayMixClick: (mix: SavedMix) => void;
}

const SavedMixes: React.FC<SavedMixesProps> = ({ onSaveMix, savedMixes, onPlayMixClick }) => {
  const [mixName, setMixName] = useState('');

  const handleSaveMixClick = () => {
    onSaveMix(mixName);
    setMixName('');
  };

  return (
    <div>
      <h2>Saved Mixes</h2>
      <div>
        <input
          type="text"
          placeholder="Name of mix"
          value={mixName}
          onChange={(e) => setMixName(e.target.value)}
        />
        <button onClick={handleSaveMixClick}>Save</button>
      </div>
      <ul>
        {savedMixes.map((mix, index) => (
          <li key={index}>
            <button onClick={() => onPlayMixClick(mix)}>Play</button>
            <span>{mix.name}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SavedMixes;