import { Component, ViewChild, OnInit } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { AuthService } from "../webservices/auth.service";

import { InscriptionComponent } from '../inscription/inscription.component';




@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css'],
  providers:[AuthService]
})
export class MessagesComponent implements OnInit {
  messages: Observable<any[]>;
  @ViewChild('myModal')
  modal: InscriptionComponent;


  constructor(public db: AngularFireDatabase, private modalService: NgbModal, public authService: AuthService) {
    this.messages = db.list('messages').valueChanges();
 }

  ngOnInit() {
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

}
