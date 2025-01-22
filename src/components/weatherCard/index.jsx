import React from 'react';
import WeatherAnimation from '../weatherAnimations';
import styles from './styles.module.scss';

const WeatherCard = ({ weather }) => {
  const { main, description, temp, feels_like, highest, lowest, windDir } = weather;
  console.log(weather);
  const capitalizeFirstLetter = (text) => {
    if (!text) return '';
    return text.charAt(0).toUpperCase() + text.slice(1);
  };

  return (
    <div className={`${styles.weatherCard} col-11 d-flex flex-column text-center rounded-5 p-3 shadow`}>
      <div className="">
        <WeatherAnimation weatherType={main} />
      </div>
      <div className={styles.subDiv}>
        <WindDirection windDir={windDir} />
        <div className={styles.header}>{Math.round(temp)}°C, {capitalizeFirstLetter(description)}</div>
        <div className={styles.sub}>Føles som: {Math.round(feels_like)}°C</div>
        <div className={styles.sub}>H : {Math.round(highest)}°C / L : {Math.round(lowest)}°C</div>
      </div>
    </div>
  );
};

export default WeatherCard;

const getWindDirection = (degree) => {
    const directions = [
      'N', 'NØ', 'Ø', 'SØ', 'S', 'SV', 'V', 'NV', 'N',
    ];
    const index = Math.round(degree / 45) % 8;
    return directions[index];
  };
  
  const WindDirection = ({ windDir }) => {
    const direction = getWindDirection(windDir);
  
    return (
        <div style={{ textAlign: 'center' }}>
          <div
            className={styles['arrow-outer']}
            style={{
              '--wind-direction': `${windDir}deg`,
            }}
          >
            <div className={styles['arrow-inner']}>⬆</div>
          </div>
          <p>Vind: {direction} ({windDir}°)</p>
        </div>
      );
  };
  