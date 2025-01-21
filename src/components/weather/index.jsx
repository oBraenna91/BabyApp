import React from 'react';
import useWeather from '../../hooks/useWeather';

const WeatherWidget = () => {
  const { weather, loading, error } = useWeather('Kragerø');

  if (loading) return <p>Laster værdata...</p>;
  if (error) return <p>Feil: {error}</p>;

  return (
    <div className="weather-widget">
      <h3>Været i {weather.location}</h3>
      <img src={weather.icon} alt={weather.description} />
      <p>{weather.description}</p>
      <p>Temperatur: {weather.temp}°C</p>
      <p>Vindhastighet: {weather.windSpeed} m/s</p>
    </div>
  );
};

export default WeatherWidget;