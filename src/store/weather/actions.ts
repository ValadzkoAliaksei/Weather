import { TYPES } from '../acion-types';

import { IWeather } from './types';

export const showWeatherSuccess = (payload: IWeather) => <const>{ type: TYPES.ON_SHOW_SUCCESS, payload };

export const showWeatherError = () => <const>{ type: TYPES.ON_SHOW_FAIL };

export const onShowWeatherRequest = (payload: string) => <const>{ type: TYPES.ON_SHOW_REQUEST, payload };

export const addFavorite = (payload: { [k: string]: string | null }) =>
  <const>{ type: TYPES.ADD_FAVORITE_CITY, payload };
