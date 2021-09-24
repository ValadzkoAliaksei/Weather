import React from 'react';
import { Link } from 'react-router-dom';
import { TextField, Button } from '@material-ui/core';

import { Weather } from '../weather';

import './main.css';

export const Main = ({ city, isLoaded, isError, weather, onChangeCity, onShow, onAdd, favorites }) => (
  <div className='main'>
    <div className='mainContent'>
      <div className='form'>
        <div className='textInput'>
          <TextField label='Outlined' variant='outlined' value={city} onChange={onChangeCity} />
        </div>
        <div className='buttons'>
          <Button
            variant='contained'
            color='secondary'
            onClick={() => {
              onShow(city);
            }}
          >
            Показать
          </Button>
          <Button variant='contained' color='secondary' onClick={onAdd}>
            Добавить в избранное
          </Button>
        </div>
        <Weather isLoaded={isLoaded} isError={isError} weather={weather} />
      </div>
      <div className='favorite'>
        <h2>Избранное</h2>
        {favorites.map((item) => (
          <Link
            to={`/${item.link}`}
            onClick={() => {
              onShow(item.name);
            }}
            className='favoriteLink'
          >
            {item.name}
          </Link>
        ))}
      </div>
    </div>
  </div>
);
