import React from 'react';
import styles from './footer.module.css'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVolumeMute, faPause,  faClock, faCirclePlay } from '@fortawesome/free-solid-svg-icons';

const Footer: React.FC = () => {
  return (
    <footer>
      <div className={styles.media_section}>
        <h2 className={styles.title}>RAIN</h2>
        <div className={styles.player}>
          <button className={styles.playButton}>
            <FontAwesomeIcon icon={faCirclePlay} className={styles.play} />
          </button>
          <button className={styles.pauseButton}>
            <FontAwesomeIcon icon={faPause} className={styles.pause} />
          </button>
          <div className={styles.volume}>
            <input className={styles.volumeSlider} type="range" min="0" max="100" />
            <FontAwesomeIcon icon={faVolumeMute} className={styles.vol} />
          </div>
          <FontAwesomeIcon icon={faClock} className={styles.timer} />
        </div>
      </div>
    </footer>
  );
};

export default Footer;