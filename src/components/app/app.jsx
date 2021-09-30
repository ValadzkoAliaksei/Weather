import React, { useState } from 'react';
import { Link, Route } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { Weather } from '../weather';
import { Main } from '../main';

import './app.css';

const App = () => {
  const [city, setCity] = useState('');
  const favorites = useSelector((state) => state.favorites);
  const weather = useSelector((state) => state.weather);

  const dispatch = useDispatch();

  const onChangeCity = (event) => {
    setCity(event.target.value);
  };

  const onShow = (item) => {
    if (item) {
      dispatch({ type: 'ON_SHOW_REQUEST', item });
    }
  };

  const onAddFavorites = (value) => {
    dispatch({ type: 'ADD_F', value, city, favorites, weather });
  };
  return (
    <div className='App'>
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
      <Route path='/:id'>
        <div>
          <Weather isLoaded={weather.isLoaded} isError={weather.isError} weather={weather.data} />{' '}
          <Link to='/'>Назаnд</Link>
        </div>
      </Route>
    </div>
  );
};

export default App;
