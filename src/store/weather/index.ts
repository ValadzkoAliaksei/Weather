import { TYPES } from '../acion-types';

import * as actions from './actions';

import type { WeatherStoreType } from './types';

const initialState: WeatherStoreType = {
  city: 'Орша',
  isLoaded: false,
  isError: false,
  weather: {
    main: {
      temp: null,
      pressure: null,
      humidity: null,
    },
    wind: {
      speed: null,
    },
    clouds: {
      all: null,
    },
    name: null,
    cod: null,
  },
  favorites: [
    {
      name: 'Орша',
      link: 'Orsha',
    },
    {
      name: 'Анталия',
      link: 'Antalya Province',
    },
  ],
};

type InferValueTypes<T> = T extends { [key: string]: infer U } ? U : never;

type ActionType = ReturnType<InferValueTypes<typeof actions>>;

export const weatherReducer = (state = initialState, action: ActionType): WeatherStoreType => {
  switch (action.type) {
    // case TYPES.CHANGE_CITY:
    //   return {
    //     ...state,
    //     city: action,
    //   };
    case TYPES.ON_SHOW_REQUEST: {
      return {
        ...state,
        isLoaded: true,
        isError: false,
      };
    }
    case TYPES.ON_SHOW_SUCCESS: {
      const data = action.payload;
      return {
        ...state,
        weather: data,
        isLoaded: true,
      };
    }
    case TYPES.ON_SHOW_FAIL: {
      return {
        ...state,
        isError: true,
      };
    }
    case TYPES.ADD_FAVORITE_CITY: {
      const value = action.payload;
      return {
        ...state,
        favorites: [
          ...state.favorites,
          {
            name: value?.name,
            link: value?.link,
          },
        ],
      };
    }
    default:
      return state;
  }
};
