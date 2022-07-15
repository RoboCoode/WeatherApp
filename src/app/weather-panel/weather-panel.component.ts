import { Component, OnInit } from '@angular/core';
import { ApiservService } from '../services/apiserv.service';
import { CurrentWeather } from '../models/CurrentWeather';
import { ForecastWeather } from '../models/ForecastWeather';
import { HourStep } from '../models/ForecastWeather';
import { map } from 'rxjs';
import { GlobStorageService } from '../services/glob-storage.service';

@Component({
  selector: 'app-weather-panel',
  templateUrl: './weather-panel.component.html',
  styleUrls: ['./weather-panel.component.css'],
})
export class WeatherPanelComponent implements OnInit {
  icons: any;

  hourstep: HourStep = {
    dt: 0,
    main: {
      temp_min: 0,
      temp_max: 0,
    },
    weather: [
      {
        id: 0,
        icon: '',
      },
    ],
    dt_txt: '',
  };

  data_forecast: ForecastWeather | undefined = undefined;

  data: CurrentWeather = {
    coord: {
      lon: 0,
      lat: 0,
    },
    weather: [
      {
        id: 0,
        main: '',
        description: '',
        icon: '',
      },
    ],
    base: '',
    main: {
      temp: 0,
      feels_like: 0,
      temp_min: 0,
      temp_max: 0,
      pressure: 0,
      humidity: 0,
      sea_level: undefined,
      grnd_level: undefined,
    },
    visibility: 0,
    wind: {
      speed: 0,
      deg: 0,
      gust: undefined,
    },
    clouds: {
      all: 0,
    },
    dt: 0,
    sys: {
      type: 0,
      id: 0,
      message: undefined,
      country: '',
      sunrise: 0,
      sunset: 0,
    },
    timezone: 0,
    id: 0,
    name: '',
    cod: 0,
  };

  open: boolean = false;
  date: string = '';
  childData: string[] =['48.714', '21.2581'];
  newlistForecast: HourStep[] = [
    this.hourstep,
    this.hourstep,
    this.hourstep,
    this.hourstep,
  ];

  days_forecast: (string | undefined)[] = [];
  number_days_date: (string | undefined)[] = [];

  constructor(
    public apiserv: ApiservService,
    public storage: GlobStorageService
  ) {}

  ngOnInit(): void {
    this.loaddata_forecast();
    this.loaddata();
    this.date = Date();
  }

  loaddata_forecast() {
    this.apiserv
      .reqForecast(this.childData[0], this.childData[1])
      .pipe(map((res) => this.filter3days(res)))
      .subscribe((res: any) => {
        return (this.data_forecast = res);
      });
  }

  loaddata() {
    this.apiserv
      .reqWeather(this.childData[0], this.childData[1])
      .subscribe((res: any) => (this.data = res));
  }

  time_format(d: any) {
    let t = new Date(d * 1000);
    let tail = '';
    let time = [t.getHours(), t.getMinutes()];
    let T = [];
    if (+time[0] > 12) {
      time[0] -= 12;
      tail = ' PM ';
    } else tail = ' AM ';

    if (time[1] < 10) {
      T.push(time[0].toString());
      T[1] = '0' + time[1];
    } else {
      T.push(time[0].toString());
      T.push(time[1].toString());
    }
    return '' + T.join(':') + tail;
  }

  daytime(sunset: number, sunrise: number) {
    let c = sunset - sunrise;
    let hours = '' + c / 3600;
    let minutes = '' + (c % 3600) / 60;
    return '' + hours.split('.')[0] + 'h' + '  ' + minutes.split('.')[0] + 'm';
  }

  datenow(dt: any) {
    let array = dt.toString().split(' ');
    let day = (d: any) => {
      let day;
      switch (d) {
        case 'Mon':
          day = 'Monday';
          break;
        case 'Tue':
          day = 'Tuesday';
          break;
        case 'Wed':
          day = 'Wednesday';
          break;
        case 'Thu':
          day = 'Thursday';
          break;
        case 'Fri':
          day = 'Friday';
          break;
        case 'Sat':
          day = 'Saturday';
          break;
        case 'Sun':
          day = 'Sunday';
          break;
      }
      return day;
    };

    let time = array[4].split(':');
    time.pop();
    let tail = '';
    if (+time[0] > 12) {
      time[0] -= 12;
      tail = 'PM';
    } else tail = 'AM';

    return (
      day(array[0]) +
      ',' +
      ' ' +
      array[2] +
      ' ' +
      array[1] +
      ' ' +
      array[3] +
      ' ' +
      '|' +
      ' ' +
      time.join(':') +
      tail
    );
  }

  opensearchbar() {
    this.open = !this.open;
  }

  getData(newdata: []) {
    this.childData = newdata;
    this.open = !this.open;
    this.date = Date();
    this.loaddata();
    this.loaddata_forecast();
  }

  filter3days(e: any) {
    if (e) {
      this.newlistForecast = e.list.filter((ee: any) => {
        let arr1 = ee.dt_txt?.split(' ');
        let arr2 = arr1[1]?.split(':');
        return arr2[0] == '12';
      });

      let day = (dd: number) => {
        let day;
        switch (dd) {
          case 0:
            day = 'Sun';
            break;
          case 1:
            day = 'Mon';
            break;
          case 2:
            day = 'Tue';
            break;
          case 3:
            day = 'Wed';
            break;
          case 4:
            day = 'Thu';
            break;
          case 5:
            day = 'Fri';
            break;
          case 6:
            day = 'Sat';
            break;
        }
        return day;
      };

     
      this.days_forecast = this.newlistForecast.map((e) => {
        let num: number = e.dt * 1000;
        let t = new Date(num);
        return day(t.getDay());
      });

      this.number_days_date = this.newlistForecast.map((e) => {
        let num: number = e.dt * 1000;
        let t = new Date(num);
        return t.getDate().toString();
      });

      let today = new Date();
      let today_day = day(today.getDay());

      if (this.days_forecast[0] == today_day) {
        this.days_forecast.shift();
        this.newlistForecast.shift();
        this.number_days_date.shift();
      }

      this.days_forecast = this.days_forecast.map((e, i) => {
        e = e + ', ' + this.number_days_date[i];

        return e;
      });

      return e;
    } else {
      return;
    }
  }
}
