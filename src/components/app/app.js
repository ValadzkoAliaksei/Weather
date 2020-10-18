import React, { useState } from 'react';
import { Link, Route} from 'react-router-dom';
import { connect } from 'react-redux';

import { Weather } from '../weather';
import { Main } from '../main';

import './app.css';

const App = (props) => {
  const {
    weather,
    favorites,
    onShowRequest,
    onShowSuccess,
    onShowFail,
    onAdd,
  } = props;

  const [city, setCity] = useState("");
  
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

const mapStateToProps = (state) => ({
  favorites: state.favorites,
  weather: state.weather,
});

const mapDispatchToProps = (dispatch) => ({
  onAdd: (value) => dispatch({type: 'ADD_CITY', value }),
  onShowRequest: () => dispatch({ type: 'ON_SHOW_REQUEST' }),
  onShowSuccess: (data) => dispatch({ type: 'ON_SHOW_SUCCESS', data}),
  onShowFail: () => dispatch({ type: 'ON_SHOW_FAIL' }),
})

export default connect(mapStateToProps, mapDispatchToProps)(App);