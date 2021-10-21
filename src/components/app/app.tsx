/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { Link, Route } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { onShowWeatherRequest, addFavorite } from '../../store/weather/actions';

import { Weather } from '../weather';
import { Main } from '../main';

import type { RootState } from '../../store';

import './app.css';

const App: React.FC = () => {
  const [city, setCity] = useState('');
  const { weather, favorites, isLoaded, isError } = useSelector((state: RootState) => state.weather);

  const dispatch = useDispatch();

  const onChangeCity: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    setCity(event.target.value);
  };

  const onShow = (item: string | null) => {
    if (item) {
      dispatch(onShowWeatherRequest(item));
    }
  };

  const onAddFavorites: React.MouseEventHandler<HTMLButtonElement> = () => {
    if (city && !favorites.find((item) => item.name === city)) {
      dispatch(
        addFavorite({
          name: city,
          link: weather.name,
        })
      );
    }
  };

  return (
    <div className='App'>
      <Route exact path='/'>
        <Main
          city={city}
          isLoaded={isLoaded}
          isError={isError}
          weather={weather}
          onChangeCity={onChangeCity}
          onShow={onShow}
          onAdd={onAddFavorites}
          favorites={favorites}
        />
      </Route>
      <Route path='/:id'>
        <div>
          <Weather isLoaded={isLoaded} isError={isError} weather={weather} /> <Link to='/'>Назаnд</Link>
        </div>
      </Route>
    </div>
  );
};

export default App;
