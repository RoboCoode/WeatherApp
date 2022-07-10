import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiservService {
  public optional: any;
  private api_current = (lat: string ,lon:string) => 'https://api.openweathermap.org/data/2.5/weather?lat='+lat+'&lon='+lon+'&appid=d6e68d99ae416bc82f8cf813f4f77092&units=metric'

  constructor(private http: HttpClient) { }

  getWeather(lat: string,lon:string){
    return this.http.get(this.api_current(lat,lon))
    .pipe(map((res) => {console.log('res :'+ JSON.stringify(res)); return res}
     
  
    
      ))};
     
}




