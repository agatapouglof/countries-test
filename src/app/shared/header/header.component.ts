import { Component, OnInit } from '@angular/core';
import { Router,RouterModule, CanActivate } from '@angular/router';
import { Observable } from 'rxjs';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { AuthService } from "../../webservices/auth.service";

import { InscriptionComponent } from '../../inscription/inscription.component';
import { UserService } from '../../webservices/user.service';



@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  user : any;

  constructor(private router:Router, private modalService: NgbModal, private userService:UserService, private authService:AuthService) { }

  ngOnInit() {
    this.isConnected();
  }

  connexion(){
    this.modalService.open(InscriptionComponent, { size: 'lg' });
    this.isConnected();

  }
  isConnected(){
    this.user =  JSON.parse(localStorage.getItem("user"));

    // this.userService.getCurrentUser().then( post => {
    //   console.log("post")
    //   console.log(post)
    //   this.user = post;
    // });
  }
  deconnexion(){
    localStorage.removeItem("user");
    this.authService.doLogout()
    .then((res) => {
      this.user = null;
      this.router.navigate(['/']);
    }, (error) => {
      console.log("Logout error", error);
    });

  }

}
