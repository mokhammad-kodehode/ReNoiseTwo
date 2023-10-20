import React, { useState } from 'react';
import styles from './playeer.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faVolumeUp, faVolumeMute, faPause, faCirclePlay } from '@fortawesome/free-solid-svg-icons';

interface PlayeerProps {
  isPlaying: boolean;
  handlePlayPause: () => void;
  handleVolumeChangeAll: (volume:number) => void;
  handleMuteAll: () => void;
}

const Playeer: React.FC<PlayeerProps> = ({ isPlaying, handlePlayPause, handleVolumeChangeAll, handleMuteAll }) => {
      const [isMuted, setIsMuted] = useState(false)

        const handlePlayPauseClick = () => {
          console.log('Before handlePlayPause:', isPlaying);

          handlePlayPause();
          console.log('After handlePlayPause:', isPlaying)
        };

        const handleVolumeSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
          const volume = parseFloat(e.target.value) / 100;
          handleVolumeChangeAll(volume);
        };

        const handleMuteClick = () => {
          if (isMuted) {
            handleVolumeChangeAll(1); 
          } else {
            handleMuteAll(); 
          }
          setIsMuted(!isMuted);
        };
        

  return (
    <div className={`${styles.media_section} ${isPlaying ? styles.show : ''}`}>
      <div className={styles.player}>
        <button className={styles.playButton} onClick={handlePlayPauseClick}>
          <FontAwesomeIcon icon={isPlaying ? faPause : faCirclePlay} className={styles.play} />
        </button>
        <div className={styles.volume}>
          <input 
            className={styles.volumeSlider} 
            type="range" 
            min="0"
            max="100"
            onChange={handleVolumeSliderChange}
            />
          <FontAwesomeIcon
            icon={isMuted ? faVolumeMute : faVolumeUp}
            className={styles.vol}
            onClick={handleMuteClick}
            
             />
        </div>
      </div>
    </div>
  );
};

export default Playeer;