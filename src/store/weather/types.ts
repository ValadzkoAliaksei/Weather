export interface IWeather {
  main: {
    temp: number | null;
    pressure: number | null;
    humidity: number | null;
  };
  wind: {
    speed: number | null;
  };
  clouds: {
    all: number | null;
  };
  name: string | null;
  cod: number | null;
}

export type WeatherStoreType = {
  readonly city: string;
  weather: IWeather;
  favorites: {
    name: string | null;
    link: string | null;
  }[];
  isLoaded: boolean;
  isError: boolean;
};
