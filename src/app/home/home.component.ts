import { Component, OnDestroy, Input,  OnInit } from '@angular/core';

import { CountriesService } from "../webservices/countries.service"

import { Subject } from 'rxjs';

import 'rxjs/add/operator/map';

import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router,RouterModule, CanActivate } from '@angular/router';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers:[CountriesService]
})
export class HomeComponent implements OnDestroy, OnInit {
  @Input()
  count: number = 0;

  countries:any;
  selectedCountrie : any;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject <any> = new Subject();

  closeResult: string;

  items: Observable<any[]>;



  constructor(private countriesService:CountriesService,
    private modalService: NgbModal,
    private router:Router,
    public db: AngularFireDatabase) {
     }

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

  displayCounter(event) {
     console.log(event);
 }

}
