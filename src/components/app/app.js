import React, { useState } from 'react';
import { Link, Route } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { Weather } from '../weather';
import { Main } from '../main';

import './app.css';

const App = () => {

  const [city, setCity] = useState("");
  const favorites = useSelector (state => state.favorites);
  const weather = useSelector (state => state.weather);


  const onAdd = useDispatch({ type: 'ADD_CITY', value });
  const onShowRequest = useDispatch({ type: 'ON_SHOW_REQUEST' });
  const onShowSuccess = useDispatch({ type: 'ON_SHOW_SUCCESS', data });
  const onShowFail = useDispatch({ type: 'ON_SHOW_FAIL' });

  const onChangeCity = (event) => {
    setCity(event.target.value);
  };
  
  const onShow = async (item) => {
    if (item) {
      onShowRequest();
      try {
        const weatherResponse = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${item}&appid=f4a3e13f259dfdbd23f06c3973018636&units=metric&`);
        const weatherNow = await weatherResponse.json();
        if (weatherNow.cod !== 200 )  throw new Error("Ошибка!");
        onShowSuccess(weatherNow);
      } catch {
        onShowFail();
      }
    }
  };
  const onAddFavorites = () => {
    if (city && favorites.findIndex(item => item.name === city) === -1 ) {
      const newObject = {
        name: city,
        link: weather.data.name,
      };
      onAdd(newObject);
      console.log(favorites);
    }
  }
  return (
    <div className="App">
      <Route exact path='/'>
        <Main
          city={city}
          isLoaded={weather.isLoaded}
          isError={weather.isError}
          weather={weather.data}
          onChangeCity={onChangeCity}
          onShow={onShow}
          onAdd={onAddFavorites}
          favorites={favorites}
        />
      </Route>
      <Route path="/:id" children={<div><Weather isLoaded={weather.isLoaded} isError={weather.isError} weather={weather.data}/> <Link to=''>Назад</Link></div>}/>
    </div>
  );
}

export default App;