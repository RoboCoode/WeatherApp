import { Injectable } from '@angular/core';

import { ApiservService } from './apiserv.service';

@Injectable({
  providedIn: 'root',
})
export class GlobStorageService {
  temps: string[] = [];
  cities = [
    { name: 'Bratislava', cord: ['48.1482', '17.1067'], temp: '' },
    { name: 'Humenné', cord: ['48.9371', '21.9163'], temp: '' },
    { name: 'Koromľa', cord: ['48.7163', '22.2926'], temp: '' },
    { name: 'Košice', cord: ['48.714', '21.2581'], temp: '' },
    { name: 'Michalovce', cord: ['48.7543', '21.9195'], temp: '' },
    { name: 'Sobrance', cord: ['48.7445', '22.1814'], temp: '' },
  ];

  constructor(public apiserv: ApiservService) {
    this.temps = this.loadTemps();
  }

  saveData(value: string[]) {
    let NOW = new Date();

    const data = {
      value: value,
      expiry: NOW.getTime() + 30000,
    };

    localStorage.setItem('storageData', JSON.stringify(data));
  }

  getData() {
    let dataString = localStorage.getItem('storageData');

    if (!dataString) {
      this.loadTemps();
      return null;
    }

    const dataObj = JSON.parse(dataString);
    const now = new Date();

    if (now.getTime() > dataObj.expiry) {
      localStorage.removeItem('storageData');
      return null;
    }

    return dataObj.value;
  }

  loadTemps() {
    let arr: string[] = [];
    if (this.temps.length != 6) {
    }
    for (let city of this.cities) {
      this.apiserv
        .reqWeather(city.cord[0], city.cord[1])
        .subscribe((res: any) => {
          arr.push(res.main.temp.toFixed(0).toString());
        });
    }

    this.saveData(arr);
    return arr;
  }

  checkData() {
    if (!this.getData()) {
      this.loadTemps();
    }
  }

  tempToCities() {
    if (this.temps.length) {
      for (let i = 0; i < this.cities.length; i++) {
        this.cities[i].temp = this.temps[i];
      }
    }
    return this.cities;
  }

  getCities() {
    this.tempToCities();
    return this.cities;
  }
}
