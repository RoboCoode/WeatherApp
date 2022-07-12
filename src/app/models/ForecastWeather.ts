export interface HourStep {
  dt: number;
  main: {
    temp_min: number;
    temp_max: number;
  };
  weather: [
    {
      id: number;
      icon: string;
    }
  ];
  dt_txt: string;
}

export interface ForecastWeather {
  cod: string;
  message: number;
  cnt: number;
  list: [
    HourStep,
    HourStep,
    HourStep,
    HourStep,
    HourStep,
    HourStep,
    HourStep,
    HourStep,
    HourStep,
    HourStep,
    HourStep,
    HourStep,
    HourStep,
    HourStep,
    HourStep,
    HourStep,
    HourStep,
    HourStep,
    HourStep,
    HourStep,
    HourStep,
    HourStep,
    HourStep,
    HourStep,
    HourStep,
    HourStep,
    HourStep,
    HourStep,
    HourStep,
    HourStep,
    HourStep,
    HourStep,
  ];
  city: {
    id: number;
    name: string;
    coord: {
      lat: number;
      lon: number;
    };
    country: string;
  };
}
