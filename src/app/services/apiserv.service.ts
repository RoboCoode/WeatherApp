import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { catchError, map, throwError } from 'rxjs';
import { retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ApiservService {
  public optional: any;
  private api_current = (lat: string, lon: string) =>
    'https://api.openweathermap.org/data/2.5/weather?lat=' +
    lat +
    '&lon=' +
    lon +
    '&appid=d6e68d99ae416bc82f8cf813f4f77092&units=metric';

  private api_current2 = (lat: string, lon: string) =>
    'https://api.openweathermap.org/data/2.5/forecast?lat=' +
    lat +
    '&lon=' +
    lon +
    '&cnt=32' +
    '&appid=d6e68d99ae416bc82f8cf813f4f77092&units=metric';

  constructor(private http: HttpClient) {}

  getWeather(lat: string, lon: string) {
    return this.http
      .get(this.api_current(lat, lon))
      .pipe(
        retry(3),
        catchError((error) => {
          switch (error.status) {
            case 400:
              alert('Wrong API request');
              break;
            case 404:
              alert('Network or client-server error. Please try later ');
              break;
            case 500:
              alert('Server error. Please try later ');
              break;
            case 0:
              alert('Network or client-server error. Please try later ');
              break;
            default:
              alert('Network or client-server error. Please try later ');
              break;
          }
          return throwError(() => new Error(error));
        })
      )
      .pipe(
        map((res) => {
          return res;
        })
      );
  }

  getForecast(lat: string, lon: string) {
    return this.http
      .get(this.api_current2(lat, lon))
      .pipe(
        retry(3),
        catchError((error) => {
          switch (error.status) {
            case 400:
              alert('Wrong API request');
              break;
            case 404:
              alert('Network or client-server error. Please try later ');
              break;
            case 500:
              alert('Server error. Please try later ');
              break;
            case 0:
              alert('Network or client-server error. Please try later ');
              break;
            default:
              alert('Network or client-server error. Please try later ');
              break;
          }
          return throwError(() => new Error(error));
        })
      )
     
  }
}
