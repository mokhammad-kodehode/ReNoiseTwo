import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import soundsData, { SoundData } from '../../data/soundData';
import Playeer from '../playeer/playeer';
import styles from './soundcard.module.css';

const RelaxSoundsMap: React.FC = () => {
  const [audioPlayers, setAudioPlayers] = useState<Record<string, HTMLAudioElement>>({});
  const [activeSounds, setActiveSounds] = useState<Record<string, boolean>>({});

  const handleSoundClick = (sound: SoundData) => {
    const audioPlayer = audioPlayers[sound.title] || new Audio(sound.soundSource);

    if (activeSounds[sound.title]) {
      audioPlayer.pause();
      audioPlayer.currentTime = 0;
      setActiveSounds((prevActiveSounds) => ({
        ...prevActiveSounds,
        [sound.title]: false,
      }));
    } else {
      audioPlayer.loop = true;
      audioPlayer.play();
      setActiveSounds((prevActiveSounds) => ({
        ...prevActiveSounds,
        [sound.title]: true,
      }));
    }

    setAudioPlayers((prevAudioPlayers) => ({
      ...prevAudioPlayers,
      [sound.title]: audioPlayer,
    }));

    console.log(`Play/Stop: ${sound.title}`);
  };

  const handlePlayPause = () => {
    // Ваша логика для паузы/воспроизведения здесь
    // Пример:
    // Если хотя бы один звук играет, поставьте их все на паузу
    // Иначе возобновите их воспроизведение
    const isAnyPlaying = Object.values(activeSounds).some((playing) => playing);

    if (isAnyPlaying) {
      // Поставить на паузу все активные звуки
      Object.values(audioPlayers).forEach((player) => {
        player.pause();
        player.currentTime = 0;
      });
      setActiveSounds({});
    } else {
      // Возобновить воспроизведение всех звуков
      Object.values(audioPlayers).forEach((player) => {
        player.loop = true;
        player.play();
      });
      const newActiveSounds: Record<string, boolean> = {};
      Object.keys(audioPlayers).forEach((key) => {
        newActiveSounds[key] = true;
      });
      setActiveSounds(newActiveSounds);
    }
  };

  const handleVolumeChange = (sound: SoundData, volume: number) => {
    const audioPlayer = audioPlayers[sound.title];

    if (audioPlayer) {
      audioPlayer.volume = volume;

      setAudioPlayers((prevAudioPlayers) => ({
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
          const isCurrentPlaying = activeSounds[sound.title];

          return (
            <li key={key} className={`${styles.sound_card} ${isCurrentPlaying ? styles.sound_card_playing : ''}`}>
              <button className={styles.button} onClick={() => handleSoundClick(sound)}>
                  <FontAwesomeIcon className={styles.icon} aria-hidden="true" icon={sound.icon}  />
              </button>
              <p>{sound.title}</p>
              {isCurrentPlaying && (
                <input
                  className={styles.slider}
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
    <Playeer isPlaying={Object.values(activeSounds).some((playing) => playing)} handlePlayPause={handlePlayPause} />
    </div>
  );
};

export default RelaxSoundsMap;