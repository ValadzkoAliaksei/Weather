import React, { useState } from 'react';

import CircularProgress from '@material-ui/core/CircularProgress';
import { TextField, Button } from '@material-ui/core';

import './main.css';

export const Main = () => {
  const [city, setCity] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [isLoaded, setLoaded] = useState(false);
  const [isError, setError] = useState(false);
  const [weather, setWeather] = useState({});

  const onChangeCity = (event) => {
    setCity(event.target.value);
  };

  const onButtonClick = async () => {
    try {
      const weatherResponse = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=f4a3e13f259dfdbd23f06c3973018636&units=metric&`);
      console.log(weatherResponse);
      let weatherNow = await weatherResponse.json();
      console.log(weatherNow);
      if (weatherNow.cod !== 200 )  throw new Error("Ошибка!");
      setWeather(weatherNow);
      setLoaded(true);
    } catch {
      setError(true);
    }
  };
  return (
    <div className="Form">
      <TextField value={city} onChange={onChangeCity} />
      <Button onClick={onButtonClick}>Показать</Button>
      { isLoading && (<CircularProgress />)}
      { isLoaded && !isError && (
        <div>
          <div>Температура: {weather.main.temp}&deg;С</div>
          <div>Давление: {weather.main.pressure}мм.рт.ст.</div>
          <div>Влажность: {weather.main.humidity}%</div>
          <div>Ветер: {weather.wind.speed}м/с</div>
          <div>Облачность: {weather.clouds.all}%</div>
          
        </div>
      )}
      { isError && (<div>Произошла ошибка</div>)}
    </div>
  );
}