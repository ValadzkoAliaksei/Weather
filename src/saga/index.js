import { takeLatest, call, put } from 'redux-saga/effects';

function* getWeather({ item }) {
  try {
    const weatherResponse = yield call(
      fetch,
      `https://api.openweathermap.org/data/2.5/weather?q=${item}&appid=f4a3e13f259dfdbd23f06c3973018636&units=metric&`
    );
    const weatherNow = yield call(weatherResponse.json.bind(weatherResponse));
    if (weatherNow.cod !== 200) throw new Error('Ошибка!');
    yield put({ type: 'ON_SHOW_SUCCESS', data: weatherNow });
  } catch {
    yield put({ type: 'ON_SHOW_FAIL' });
  }
}

function* AddCity({ city, favorites, weather }) {
  if (city && favorites.findIndex((item) => item.name === city) === -1) {
    const newObject = {
      name: city,
      link: weather.data.name,
    };
    yield put({ type: 'ADD_CITY', value: newObject });
    console.log(newObject);
  }
}

function* rootSaga() {
  yield takeLatest('ON_SHOW_REQUEST', getWeather);
  yield takeLatest('ADD_F', AddCity);
}

export default rootSaga;
