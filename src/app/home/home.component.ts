import { Component, OnInit } from '@angular/core';

import { CountriesService } from "../webservices/countries.service"


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers:[CountriesService]
})
export class HomeComponent implements OnInit {

  countries:any;

  constructor(private countriesService:CountriesService) { }

  ngOnInit() {
    this.loadCountries();
  }

  loadCountries(){
    this.countriesService.getAllCountries().subscribe(
      posts => {
        console.log(posts);
        this.countries = posts;
      }
    );
  }

}
