import React from 'react';
import styles from './playeer.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVolumeMute, faPause, faCirclePlay } from '@fortawesome/free-solid-svg-icons';

interface PlayeerProps {
  isPlaying: boolean;
  handlePlayPause: () => void;
}

const Playeer: React.FC<PlayeerProps> = ({ isPlaying, handlePlayPause }) => {
        const handlePlayPauseClick = () => {
          handlePlayPause();
        };

  return (
    <div className={`${styles.media_section} ${isPlaying ? styles.show : ''}`}>
      <div className={styles.player}>
        <button className={styles.playButton} onClick={handlePlayPauseClick}>
          <FontAwesomeIcon icon={isPlaying ? faPause : faCirclePlay} className={styles.play} />
        </button>
        <div className={styles.volume}>
          <input className={styles.volumeSlider} type="range" min="0" max="100" />
          <FontAwesomeIcon icon={faVolumeMute} className={styles.vol} />
        </div>
      </div>
    </div>
  );
};

export default Playeer;