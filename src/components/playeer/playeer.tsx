import React, { useState} from 'react';
import styles from './playeer.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faVolumeUp, faVolumeMute, faPause, faCirclePlay, faClock, faVault } from '@fortawesome/free-solid-svg-icons';

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
      const [remainingTime, setRemainingTime] = useState<number>(0);
      const [isTimerRunning, setIsTimerRunning] = useState(false);
      const [timerIntervalId, setTimerIntervalId] = useState<number | NodeJS.Timeout | null>(null);
      const [isMixesCreatorOpen, setIsMixesCreatorOpen] = useState(false);
      
      
      const toggleMixesCreator = () => {
        setIsMixesCreatorOpen(!isMixesCreatorOpen);
      };

      const toggleTimePicker = () => {
        setIsTimePickerOpen(!isTimePickerOpen);
      };
    
      const closeTimePicker = () => {
        setIsTimePickerOpen(false);
      };
    
      const selectTime = (time: number) => {
        closeTimePicker();
        const initialRemainingTime = time * 60;
        setRemainingTime(initialRemainingTime);
        setIsTimerRunning(true);
      
        const intervalId = setInterval(() => {
          console.log(`Timer is running. Remaining time: ${Math.floor(remainingTime / 60)} minutes ${remainingTime % 60} seconds`);

          setRemainingTime((prevRemainingTime) => {
            if (prevRemainingTime > 0) {
              return prevRemainingTime - 1;
            } else {
              clearInterval(intervalId);
              stopAllSounds();
              setIsTimerRunning(false);
              setTimerIntervalId(null);
              return 0;
            }
          });
        }, 1000);
      
        setTimerIntervalId(intervalId);
      };

      
      
      const cancelTimer = () => {
        if (timerIntervalId && typeof timerIntervalId === 'number') {
          clearInterval(timerIntervalId);
          setRemainingTime(0);
          setIsTimerRunning(false);
          setTimerIntervalId(null);
        }
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

        // const startTimer = (time: number) => {
        //   console.log(`Timer started for ${time} minutes`);
        //   setTimeout(() => {
        //     stopAllSounds(); // Останавливаем звуки по истечении времени
        //     console.log(`Timer ended after ${time} minutes`);
        //   }, time * 60 * 1000); // Переводим время из минут в миллисекунды
        // };
        
        const startTimerAtTime = (time: string) => {
          const now = new Date();
          const [hours, minutes] = time.split(':').map(Number);
          const targetTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), hours, minutes);
        
          if (targetTime <= now) {
            targetTime.setDate(targetTime.getDate() + 1); // Если выбранное время уже прошло, то устанавливаем его на следующий день
          }
        
          const timeDifference = targetTime.getTime() - now.getTime();
        
          setRemainingTime(Math.floor(timeDifference / 1000)); // Устанавливаем оставшееся время в секундах
        
          setIsTimerRunning(true);
        
          const intervalId = setInterval(() => {
            console.log(`Timer is running. Remaining time: ${Math.floor(remainingTime / 60)} minutes ${remainingTime % 60} seconds`);
        
            setRemainingTime((prevRemainingTime) => {
              if (prevRemainingTime > 0) {
                return prevRemainingTime - 1;
              } else {
                clearInterval(intervalId);
                stopAllSounds();
                setIsTimerRunning(false);
                setTimerIntervalId(null);
                return 0;
              }
            });
          }, 1000);
        
          setTimerIntervalId(intervalId);
        };

  return (
    <div className={`${styles.media_section} ${isPlaying ? styles.show : ''}`}>
      <div className={styles.player}>
          <div className={styles.timeLeftContainer}>
                  {remainingTime > 0 && (
                      <div className={styles.remainingTime}>
                        Remaining Time: {Math.floor(remainingTime / 60)} minutes {remainingTime % 60} seconds
                      </div>
                    )}
                    {isTimerRunning && (
                      <button className={styles.cancelButton} onClick={cancelTimer}>
                        Cancel
                      </button>
                    )}
              </div>
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
                                    <option value="1">1 minutes</option>
                                    <option value="15">15 minutes</option>
                                    <option value="30">30 minutes</option>
                                    <option value="45">45 minutes</option>
                                    <option value="60">60 minutes</option>
                                  </select>
                              </div>
                              <span>or</span> {/* Добавляем текст "or" между выборами */}
                              <div className={styles.afterTimeContainer}>
                                  <div className={styles.afterTime}>
                                      <label htmlFor="time">After a time</label>
                                      <input
                                        type="time"
                                        className={styles.timeInput}
                                        value={selectedTime}
                                        onChange={(e) => setSelectedTime(e.target.value)}
                                      />
                                  </div>
                                  <button className={styles.startBtn} onClick={() => startTimerAtTime(selectedTime)}>Start</button>
                              </div >
  
                        </div>
                      </div>
                    ) : null}
            </div>
            <FontAwesomeIcon className={styles.mixIcon} icon={faVault} onClick={toggleMixesCreator}  />
      </div>
    </div>
  );
};

export default Playeer;