import React from 'react';
import { Link } from 'react-router-dom';
import { TextField, Button } from '@material-ui/core';

import { Weather } from '../weather';

import './main.css';

export const Main = ({
  city,
  isLoaded,
  isError,
  weather,
  onChangeCity,
  onShow,
  onAdd,
  favorites
}) => (
  <div className="main">
    <TextField value={city} onChange={onChangeCity} />
    <br/>
    <br/>
    <Button variant="contained" color="primary" onClick={() => {onShow(city)}}>Показать</Button>
    <br/>
    <br/>
    <Button variant="contained" color="secondary" onClick={onAdd}>Добавить в избранное</Button>
    <br/>
    {favorites.map(item => (<Link to={`/${item.link}`} onClick={() => { onShow(item.name)}}>{item.name}<br/></Link>))}
    <Weather isLoaded={isLoaded} isError={isError} weather={weather}/>
  </div>
)