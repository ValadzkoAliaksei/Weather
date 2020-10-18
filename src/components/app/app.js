import React, { useState } from 'react';
import { Link, Route} from 'react-router-dom';

import { Weather } from '../weather';
import { Main } from '../main';
import { store } from '../../store';

import './app.css';

export const App = () => {

  const action = (value) => {
    return {
      type: 'CHANGE_CITY',
      value: value,
    };
  };

  const onChangeCity = (event) => {
    store.dispatch(action(event.target.value));
  }
  
  const onShow = async (item) => {
    if (item) try {
      const weatherResponse = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${item}&appid=f4a3e13f259dfdbd23f06c3973018636&units=metric&`);
      const weatherNow = await weatherResponse.json();
      if (weatherNow.cod !== 200 )  throw new Error("Ошибка!");
      store.dispatch({ type:'ON_SHOW_SUCCESS',  weatherNow});
    } catch {
      store.dispatch({ type:'ON_SHOW_FAIL' });
    }
  };

  // const onAdd = () => {
  //   if (store.city && store.favorites.findIndex(item => item.name === store.city) === -1 ) {
  //     const newObject = {
  //       name: store.city,
  //       link: store.weather.data.name,
  //     };
  //     store.city && setFavorite([...favorites, newObject]);
  //     console.log(favorites);
  //   }
  // }
  const mapStateToProps = (state) => ({
    favorites: state.favorites,
    weather: state.weasther,
  });

  const mapDispatchToProps = (dispatch) => ({
    onAdd: (value) => dispatch({type: 'ADD_CITY', value }),
    onShowRequest: () => dispatch({ type: 'ON_SHOW_REQUEST' }),
    onShowSuccess: (item) => dispatch({ type: 'ON_SHOW_SUCCESS', item }),
    onShowFail: () => dispatch({ type: 'ON_SHOW_FAIL' }),
  })
  return (
    <div className="App">
      <Route exact path='/'>
        <Main
          city={store.city}
          isLoaded={store.weather.isLoaded}
          isError={store.weather.isError}
          weather={store.weather}
          onChangeCity={onChangeCity}
          onShow={onShow}
          // onAdd={onAdd}
          // favorites={favorites}
        />
      </Route>
      <Route path="/:id" children={<div><Weather isLoaded={store.weather.isLoaded} isError={store.weather.isError} weather={store.weather}/> <Link to=''>Назад</Link></div>}/>
    </div>
  );
}