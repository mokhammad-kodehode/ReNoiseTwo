import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import soundsData, { SoundData } from '../../data/soundData';
import styles from './soundcard.module.css'; 

const RelaxSoundsMap: React.FC = () => {
  const [audioPlayers, setAudioPlayers] = useState<Record<string, HTMLAudioElement>>({});
  const [activeSounds, setActiveSounds] = useState<string[]>([]);

  const handleSoundClick = (sound: SoundData) => {
    const audioPlayer = audioPlayers[sound.title] || new Audio(sound.soundSource);

    // Если звук уже играет, останавливаем его
    if (activeSounds.includes(sound.title)) {
      audioPlayer.pause();
      audioPlayer.currentTime = 0;
      setActiveSounds(prevActiveSounds => prevActiveSounds.filter(activeSound => activeSound !== sound.title));
    } else {
      audioPlayer.loop = true;
      audioPlayer.play();
      setActiveSounds(prevActiveSounds => [...prevActiveSounds, sound.title]);
    }

    // Обновляем массив экземпляров
    setAudioPlayers(prevAudioPlayers => ({
      ...prevAudioPlayers,
      [sound.title]: audioPlayer,
    }));

    console.log(`Play/Stop: ${sound.title}`);
  };

  const handleVolumeChange = (sound: SoundData, volume: number) => {
    const audioPlayer = audioPlayers[sound.title];
  
    if (audioPlayer) {
      audioPlayer.volume = volume;
  
      // Обновляем массив экземпляров
      setAudioPlayers(prevAudioPlayers => ({
        ...prevAudioPlayers,
        [sound.title]: audioPlayer,
      }));
    }
  };

  return (
    <div className={styles.container}>
      <h1>Relax Sounds</h1>
      <ul className={styles.sound_map}>
        {Object.keys(soundsData).map((key) => {
          const sound = soundsData[key];
          const isCurrentPlaying = activeSounds.includes(sound.title);

          return (
            <li key={key} className={`${styles.sound_card} ${isCurrentPlaying ? styles.sound_card_playing : ''}`}>
              <button
                className={styles.button}
                onClick={() => handleSoundClick(sound)}
              >
                <FontAwesomeIcon className={styles.icon}  aria-hidden="true" icon={sound.icon}  />
              </button>
              <p >{sound.title}</p>
              {isCurrentPlaying && (
                <input
                className={styles.slider}  // Убедитесь, что вы используете правильный класс
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={audioPlayers[sound.title]?.volume}
                onChange={(e) => handleVolumeChange(sound, parseFloat(e.target.value))}
                />
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default RelaxSoundsMap;