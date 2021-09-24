const initialState = {
  city: 'Орша',
  weather: {
    isLoaded: false,
    isError: false,
    data: {},
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

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'CHANGE_CITY':
      return {
        ...state,
        city: action,
      };
    case 'ON_SHOW_REQUEST': {
      return {
        ...state,
        weather: {
          ...state.weather,
          isLoading: true,
          isError: false,
        },
      };
    }
    case 'ON_SHOW_SUCCESS': {
      const { data } = action;
      return {
        ...state,
        weather: {
          ...state.weather,
          isLoaded: true,
          data: data,
        },
      };
    }
    case 'ON_SHOW_FAIL': {
      return {
        ...state,
        weather: {
          ...state.weather,
          isError: true,
        },
      };
    }
    case 'ADD_CITY': {
      const { value } = action;
      return {
        ...state,
        favorites: [
          ...state.favorites,
          {
            name: value.name,
            link: value.link,
          },
        ],
      };
    }
    default:
      return state;
  }
};
