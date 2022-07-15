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
    console.log(`SAVE DATA`);

    let NOW = new Date();

    console.log(NOW.toLocaleString());

    const data = {
      value: value,
      expiry: NOW.getTime() + 30000,
    };

    console.log(`SAVE DATA:` + JSON.stringify(data.value));

    localStorage.setItem('storageData', JSON.stringify(data));
  }

  getData() {
    let dataString = localStorage.getItem('storageData');
    console.log(`dataString v getData: ` + dataString);
    if (!dataString) {
      console.log(`getDATA spusta loadTemps`);

      this.loadTemps();
      return [];
    }

    const dataObj = JSON.parse(dataString);
    const now = new Date();

    if (now.getTime() > dataObj.expiry) {
      console.log(`REMOVE ITEM`);

      localStorage.removeItem('storageData');
      return null;
    }
    console.log(`dataObj.value:` + JSON.stringify(dataObj.value));
    return dataObj.value;
  }

  loadTemps() {
    console.log(`LOADING 1 v global storage - loadTemps`);

    let arr: string[] = [];
    if (this.temps.length != 6) {
    }
    for (let city of this.cities) {
      this.apiserv
        .reqWeather(city.cord[0], city.cord[1])
        .subscribe((res: any) => {
          arr.push(res.main.temp.toFixed(0).toString());
          console.log(arr);
        });
    }

    console.log(` arr pred return z loadTemps a savom:` + arr);
    this.saveData(arr);
    return arr;
  }

  checkData() {
    console.log(`CHECKOVANIE`);
    if (!this.getData()) {
      console.log(`checkData spusta loadTemps z checkDATA`);
      this.loadTemps();
    }
  }

  tempToCities() {
    console.log(
      `tempToCities spustene ! this.temps.length:  ` + this.temps.length
    );

    if (this.temps.length) {
      console.log(`temps v tempToCities zo storage: ` + this.temps);
      for (let i = 0; i < this.cities.length; i++) {
        this.cities[i].temp = this.temps[i];

        console.log(`IRITATION`);
      }
    }
    return this.cities;
  }

  getCities() {
    this.tempToCities();
    return this.cities;
  }
}
