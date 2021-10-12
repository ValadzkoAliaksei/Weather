import React from 'react';

import './weather.css';

export const Weather = ({ isLoaded, isError, weather }) => (
  <div className='weather'>
    {isLoaded && !isError && (
      <div className='weatherLoaded'>
        <div>Температура: {weather.main.temp}&deg;С</div>
        <div>Давление: {weather.main.pressure}мм.рт.ст.</div>
        <div>Влажность: {weather.main.humidity}%</div>
        <div>Ветер: {weather.wind.speed}м/с</div>
        <div>Облачность: {weather.clouds.all}%</div>
      </div>
    )}
    {isError && <div>Произошла ошибка</div>}
  </div>
);
