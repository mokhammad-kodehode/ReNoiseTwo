import React, { useState, useEffect } from 'react';
import styles from './mixesManager.module.css';

interface MixesManagerProps {
  mixes: { [key: string]: string[] };
  onMixSelect: (sounds: string[]) => void;
}

const MixesManager: React.FC<MixesManagerProps> = ({ mixes, onMixSelect }) => {
  const [newMixName, setNewMixName] = useState('');
  const [selectedSounds, setSelectedSounds] = useState<string[]>([]);
  const [localMixes, setLocalMixes] = useState<{ [key: string]: string[] }>({});

  useEffect(() => {
    // Загружаем сохраненные миксы из локального хранилища при монтировании компонента
    const savedMixes = JSON.parse(localStorage.getItem('mixes') || '{}');
    setLocalMixes(savedMixes);
  }, []);

  const handleMixNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewMixName(e.target.value);
  };

  const handleSoundCheckboxChange = (sound: string) => {
    setSelectedSounds((prevSelectedSounds) => {
      if (prevSelectedSounds.includes(sound)) {
        return prevSelectedSounds.filter((s) => s !== sound);
      } else {
        return [...prevSelectedSounds, sound];
      }
    });
  };

  const handleSaveMix = () => {
    if (newMixName.trim() === '' || selectedSounds.length === 0) {
      // Добавьте здесь логику обработки ошибок, если необходимо
      return;
    }

    const newMix = { [newMixName]: selectedSounds };
    setLocalMixes((prevLocalMixes) => ({
      ...prevLocalMixes,
      ...newMix,
    }));

    // Сохраняем микс в локальное хранилище
    localStorage.setItem('mixes', JSON.stringify({ ...prevLocalMixes, ...newMix }));

    setNewMixName('');
    setSelectedSounds([]);
  };

  const handleLoadMix = (mixName: string) => {
    const mix = localMixes[mixName];
    if (mix) {
      onMixSelect(mix);
      console.log(`Mix loaded: ${mixName}`);
    }
  };

  const handleDeleteMix = (mixName: string) => {
    const { [mixName]: _, ...restLocalMixes } = localMixes;
    setLocalMixes(restLocalMixes);

    // Удаляем микс из локального хранилища
    localStorage.setItem('mixes', JSON.stringify(restLocalMixes));

    console.log(`Mix deleted: ${mixName}`);
  };

  return (
    <div className={styles.mixesContainer}>
      <h2>Mixes</h2>
      <div className={styles.mixControls}>
        <input
          type="text"
          placeholder="Mix Name"
          value={newMixName}
          onChange={handleMixNameChange}
        />
        <button onClick={handleSaveMix} disabled={newMixName.trim() === '' || selectedSounds.length === 0}>
          Save Mix
        </button>
      </div>
      <ul className={styles.mixList}>
        {Object.keys(localMixes).map((mixName) => (
          <li key={mixName}>
            <span>{mixName}</span>
            <button onClick={() => handleLoadMix(mixName)}>Load</button>
            <button onClick={() => handleDeleteMix(mixName)}>Delete</button>
          </li>
        ))}
      </ul>
      <div className={styles.soundSelection}>
        <h3>Select Sounds for New Mix</h3>
        {Object.keys(mixes).map((mixName) => (
          mixes[mixName].map((soundTitle, index) => (
            <div key={index} className={styles.soundCheckbox}>
              <input
                type="checkbox"
                id={`${mixName}-${index}`}
                checked={selectedSounds.includes(soundTitle)}
                onChange={() => handleSoundCheckboxChange(soundTitle)}
              />
              <label htmlFor={`${mixName}-${index}`}>{soundTitle}</label>
            </div>
          ))
        ))}
      </div>
    </div>
  );
};

export default MixesManager;