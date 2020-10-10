import React, { useState } from 'react';
import { Link, Route} from 'react-router-dom';

import { Weather } from '../weather';
import { Main } from '../main';

import './app.css';

export const App = () => {
  const [city, setCity] = useState("");
  const [isLoaded, setLoaded] = useState(false);
  const [isError, setError] = useState(false);
  const [weather, setWeather] = useState({});
  const [favorites, setFavorite] = useState([
    {
      name: 'Орша',
      link: "Orsha",
    },
    {
      name: 'Анталия',
      link: "Antalya Province",
    },
  ]);

  const onChangeCity = (event) => {
    setCity(event.target.value);
  };

  const onShow = async (item) => {
    if (item) try {
      setError(false);
      const weatherResponse = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${item}&appid=f4a3e13f259dfdbd23f06c3973018636&units=metric&`);
      const weatherNow = await weatherResponse.json();
      if (weatherNow.cod !== 200 )  throw new Error("Ошибка!");
      setWeather(weatherNow);
      setLoaded(true);
    } catch {
      setError(true);
    }
  };

  const onAdd = () => {
    if (city && favorites.findIndex(item => item.name === city) === -1 ) {
      const newObject = {
        name: city,
        link: weather.name,
      };
      city && setFavorite([...favorites, newObject]);
      setCity('');
      console.log(favorites);
    }
  }

  return (
    <div className="App">
      <Route exact path='/'>
        <Main
          city={city}
          isLoaded={isLoaded}
          isError={isError}
          weather={weather}
          onChangeCity={onChangeCity}
          onShow={onShow}
          setCity={setCity}
          onAdd={onAdd}
          favorites={favorites}
        />
      </Route>
      <Route path="/:id" children={<div><Weather isLoaded={isLoaded} isError={isError} weather={weather}/> <Link to=''>Назад</Link></div>}/>
    </div>
  );
}
