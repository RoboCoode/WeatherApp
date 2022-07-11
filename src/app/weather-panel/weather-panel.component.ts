import { Component, OnInit } from '@angular/core';
import { ApiservService } from '../services/apiserv.service';
import { CurrentWeather } from '../models/CurrentWeather';

@Component({
  selector: 'app-weather-panel',
  templateUrl: './weather-panel.component.html',
  styleUrls: ['./weather-panel.component.css'],
})
export class WeatherPanelComponent implements OnInit {
  data!: CurrentWeather;

  date!: string;
  constructor(public apiserv: ApiservService) {}

  ngOnInit(): void {
    this.loaddata();
    this.date = Date();
  }

  loaddata() {
    this.apiserv
      .getWeather('29.4545', '98.4946')
      .subscribe((res: any) => (this.data = res));
  }

  time_format(d: any) {
    let t = new Date(d * 1000);
    let tail = '';
    let time = [t.getHours(), t.getMinutes()];

    if (+time[0] > 12) {
      time[0] -= 12;
      tail = ' PM ';
    } else tail = ' AM ';

    return '' + time.join(':') + tail;
  }

  daytime(sunset: number, sunrise: number) {
    let c = sunset - sunrise;
    let hours = '' + c / 3600;
    let minutes = '' + (c % 3600) / 60;
    return '' + hours.split('.')[0] + 'h' + '  ' + minutes.split('.')[0] + 'm';
  }

  datenow(dt: any) {
    let array = dt.toString().split(' ');
    console.log(array);
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
}
