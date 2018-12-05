import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, RequestMethod } from '@angular/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

@Injectable({
  providedIn: 'root'
})
export class CountriesService {
  restcountriesapi = environment.restcountriesapi;


  constructor(private http:Http) { }

  getAllCountries(){
    return this.http.get(this.restcountriesapi+'/all')
    .map(
      res => res.json()
    )
  }

  getCountriesByName(name:string){
    return this.http.get(this.restcountriesapi+'/name/'+name)
    .map(
      res => res.json()
    )
  }

}
