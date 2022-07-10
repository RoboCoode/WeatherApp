import { Component, OnInit } from '@angular/core';
import { ApiservService } from './services/apiserv.service';
import { CurrentWeather } from './models/CurrentWeather';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'CssWeatherApp';
  data!: CurrentWeather;
  date_update!: any;
  date!: any;
  constructor(public apiserv: ApiservService) {
    this.loaddata();
  }

  ngOnInit(): void {
 
    this.date = new Date();
    this.date_update = this.date.toLocaleString();
  
  }

  loaddata() {
    this.apiserv
      .getWeather('43.6992', '15.5332')
      .subscribe((res: any) => (this.data = res));
  }
}
