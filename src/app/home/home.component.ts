import { Component, OnDestroy, OnInit } from '@angular/core';

import { CountriesService } from "../webservices/countries.service"

import { Subject } from 'rxjs';

import 'rxjs/add/operator/map';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';





@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers:[CountriesService]
})
export class HomeComponent implements OnDestroy, OnInit {

  countries:any;
  selectedCountrie : any;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject <any> = new Subject();

  closeResult: string;



  constructor(private countriesService:CountriesService, private modalService: NgbModal) { }

  ngOnInit() {
    this.dtOptions = {
    pagingType: 'full_numbers',
    pageLength: 10
  };
    this.loadCountries();
  }

  loadCountries(){
    this.countriesService.getAllCountries().subscribe(
      posts => {
        console.log(posts);
        this.countries = posts;
        this.dtTrigger.next();

      }
    );
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }


  openLg(content, countrieName) {
    this.countriesService.getCountriesByName(countrieName).subscribe(
      posts => {
        console.log(posts);
        this.selectedCountrie = posts[0];
        this.modalService.open(content, { size: 'lg' });
      }
    );

  }

}
