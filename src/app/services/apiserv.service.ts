import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { map, retry } from 'rxjs/operators';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root',
})
export class ApiservService {

  
  private api_current = (lat: string, lon: string) =>
    `${environment.apiUrl}/weather?lat=` +
    lat +
    '&lon=' +
    lon +
    `&${environment.apiId}`;

  private api_forecast = (lat: string, lon: string) =>
  `${environment.apiUrl}/forecast?lat=` +
    lat +
    '&lon=' +
    lon +
    '&cnt=32' +
    `&${environment.apiId}`;


  constructor(private http: HttpClient) {}

  reqWeather(lat: string, lon: string) {
    return this.http
      .get(this.api_current(lat, lon))
      .pipe(
        retry(3),
        catchError((error) => this.switchHandleError(error))
      );
  }

  reqForecast(lat: string, lon: string) {
    return this.http
      .get(this.api_forecast(lat, lon))
      .pipe(
        retry(3),
        catchError((error) => this.switchHandleError(error))
      )
     
  }


  switchHandleError(error: any){ 
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
  return throwError(() => new Error(error));}
}
