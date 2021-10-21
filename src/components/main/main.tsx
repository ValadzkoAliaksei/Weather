/* eslint-disable no-unused-vars */
import React from 'react';
import { Link } from 'react-router-dom';
import { TextField, Button } from '@material-ui/core';

import { Weather } from '../weather';

import { IWeather } from '../../store/weather/types';

import './main.css';

type MainPropsType = {
  city: string;
  isLoaded: boolean;
  isError: boolean;
  weather: IWeather;
  onChangeCity: React.ChangeEventHandler<HTMLInputElement>;
  onShow: (item: string | null) => void;
  onAdd: React.MouseEventHandler<HTMLButtonElement>;
  favorites: {
    name: string | null;
    link: string | null;
  }[];
};

export const Main = ({ city, isLoaded, isError, weather, onChangeCity, onShow, onAdd, favorites }: MainPropsType) => (
  <div className='main'>
    <div className='mainContent'>
      <div className='form'>
        <div className='textInput'>
          <TextField label='Город' variant='outlined' value={city} onChange={onChangeCity} />
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
        {favorites?.map((item, index) => (
          <Link
            to={`/${item.link}`}
            onClick={() => {
              onShow(item.name);
            }}
            key={index.toString()}
            className='favoriteLink'
          >
            {item.name}
          </Link>
        ))}
      </div>
    </div>
  </div>
);
