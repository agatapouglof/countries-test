import { Component, ViewChild, OnInit } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { AuthService } from "../webservices/auth.service";
import { UserService } from "../webservices/user.service";

import { InscriptionComponent } from '../inscription/inscription.component';
import * as moment from "moment";





@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css'],
  providers:[AuthService, UserService]
})
export class MessagesComponent implements OnInit {
  messages: Observable<any[]>;
  @ViewChild('myModal')
  modal: InscriptionComponent;
  position : any;
  setMessage = false;
  user : any;
  message : any;
  errorMessage = null


  constructor(public db: AngularFireDatabase, private modalService: NgbModal, public authService: AuthService, private userService:UserService) {
    this.messages = db.list('messages').valueChanges();
 }

  ngOnInit() {
    this.getUser();
    this.userService.getUserPosition().subscribe(
      posts => {
        this.position = posts;
      }
    );
  }


  openLg(content, countrieName) {
    // this.modalService.open(content, { size: 'lg' });
    this.modalService.open(InscriptionComponent, { size: 'lg' });
    // this.authService.doGoogleLogin()
    // .then(res => {
    //   // this.router.navigate(['/user']);
    //   console.log("do login");
    // })
    // this.countriesService.getCountriesByName(countrieName).subscribe(
    //   posts => {
    //     console.log(posts);
    //     this.selectedCountrie = posts[0];
    //   }
    // );
  }
  getUser(){
    if (localStorage.length > 0) {
      this.user =  JSON.parse(localStorage.getItem("user"));
    } else {
      console.log("no user in localStorage")
    }
  }
  seeFormMessage(){
    if(this.user) {
      this.setMessage = true;
      this.errorMessage = null;
    }
    else this.errorMessage = "Connectez vous pour laisser un message"
  }
  sendMessage(){
    let tmt = moment();

    if(this.message){
      if(this.position){
        this.db.list('/messages').push({ "message": this.message, "city" : this.position.city, "country" : this.position.country_name, "time" : moment().locale('fr').format("LLL"), "user" : this.user });
      }else{
        this.db.list('/messages').push({ "message": this.message, "city" : "NONE", "country" : "NONE", "time" : moment().locale('fr').format("LLL"), "user" : this.user });
      }
      this.setMessage = false;
    }

  }

}
