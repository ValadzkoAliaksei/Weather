import { takeLatest, call, put } from 'redux-saga/effects';

import { TYPES } from '../acion-types';
import { showWeatherSuccess, showWeatherError } from './actions';

function* getWeather({ payload: city }) {
  try {
    const weatherResponse = yield call(
      fetch,
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=f4a3e13f259dfdbd23f06c3973018636&units=metric&`
    );
    const data = yield call(weatherResponse.json.bind(weatherResponse));
    if (data.cod !== 200) throw new Error('Ошибка!');
    yield put(showWeatherSuccess(data));
  } catch {
    yield put(showWeatherError());
  }
}

function* rootSaga() {
  yield takeLatest(TYPES.ON_SHOW_REQUEST, getWeather);
}

export default rootSaga;
