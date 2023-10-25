import React, { useState, useEffect } from 'react';
import styles from './playeer.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faVolumeUp, faVolumeMute, faPause, faCirclePlay, faClock } from '@fortawesome/free-solid-svg-icons';

interface PlayeerProps {
  isPlaying: boolean;
  handlePlayPause: () => void;
  handleVolumeChangeAll: (volume:number) => void;
  handleMuteAll: () => void;
  stopAllSounds: () => void;
}

const Playeer: React.FC<PlayeerProps> = ({ isPlaying, handlePlayPause, handleVolumeChangeAll, handleMuteAll,  stopAllSounds }) => {
      const [isMuted, setIsMuted] = useState(false)
      const [isTimePickerOpen, setIsTimePickerOpen] = useState(false);
      const [selectedTime, setSelectedTime] = useState('');

      const toggleTimePicker = () => {
        setIsTimePickerOpen(!isTimePickerOpen);
      };
    
      const closeTimePicker = () => {
        setIsTimePickerOpen(false);
      };
    
      const selectTime = (time: number) => {
        closeTimePicker();
        startTimer(time);
      };


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

        const startTimer = (time: number) => {
          console.log(`Timer started for ${time} minutes`);
          setTimeout(() => {
            stopAllSounds(); // Останавливаем звуки по истечении времени
            console.log(`Timer ended after ${time} minutes`);
          }, time * 60 * 1000); // Переводим время из минут в миллисекунды
        };
        
        const startTimerAtTime = (time : string) => {
          const now = new Date();
          const [hours, minutes] = time.split(':').map(Number);
          const targetTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), hours, minutes);
        
          if (targetTime <= now) {
            targetTime.setDate(targetTime.getDate() + 1); // Если выбранное время уже прошло, то устанавливаем его на следующий день
          }
        
          const timeDifference = targetTime.getTime() - now.getTime();
        
          console.log(`Timer started at ${time}`);
        
          setTimeout(() => {
            stopAllSounds(); // Останавливаем звуки по указанному времени
            console.log(`Timer ended at ${time}`);
          }, timeDifference);
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
                  <div className={styles.clock}>
                    <FontAwesomeIcon className={styles.clockIcon} icon={faClock} onClick={toggleTimePicker} />
                    {isTimePickerOpen ? (
                      <div className={styles.timePickerContainer}>
                        <h2>Fade-out Timer</h2>
                        <div className={styles.pickers}>
                              <div className={styles.afterDur}>
                                  <label htmlFor="timeSelect">After a duration</label>
                                  <select
                                    className={styles.timeList}
                                    name="timeSelect"
                                    id="timeSelect"
                                    onChange={(e) => selectTime(parseInt(e.target.value))}
                                    defaultValue="" // Значение по умолчанию
                                  >
                                    <option className={styles.timeItem} value="" disabled>Select time</option>
                                    <option value="15">15 minutes</option>
                                    <option value="30">30 minutes</option>
                                    <option value="45">45 minutes</option>
                                    <option value="60">60 minutes</option>
                                  </select>
                              </div>
                              <span>or</span> {/* Добавляем текст "or" между выборами */}
                              <div className={styles.afterTime}>
                                  <label htmlFor="time">After a time</label>
                                  <input
                                    type="time"
                                    className={styles.timeInput}
                                    value={selectedTime}
                                    onChange={(e) => setSelectedTime(e.target.value)}
                                    onBlur={() => {
                                      console.log(`Selected time: ${selectedTime}`);
                                      startTimerAtTime(selectedTime);
                                    }}
                                  />
                              </div>
                        </div>
                      </div>
                    ) : null}
                  </div>
        </div>
      </div>
    </div>
  );
};

export default Playeer;