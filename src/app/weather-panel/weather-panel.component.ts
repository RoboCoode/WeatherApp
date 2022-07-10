import { Component, OnInit } from '@angular/core';
import { ApiservService } from '../services/apiserv.service';
import { CurrentWeather } from '../models/CurrentWeather';

@Component({
  selector: 'app-weather-panel',
  templateUrl: './weather-panel.component.html',
  styleUrls: ['./weather-panel.component.css']
})
export class WeatherPanelComponent implements OnInit {

  data!: CurrentWeather ;
  date_update!: any;
  date!: any;
  constructor(public apiserv: ApiservService) {
   
  }

  ngOnInit(): void {
    this.loaddata();
    this.date = new Date();
    this.date_update = this.date.toLocaleString();
  
  }

  loaddata() {
    this.apiserv
      .getWeather('43.6992', '17.5332')
      .subscribe((res: any) => (this.data = res));
  }
}