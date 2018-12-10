import { Component, Input, EventEmitter, Output, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from "../webservices/auth.service";
import { Router, Params } from '@angular/router';





@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.css']
})
export class InscriptionComponent implements OnInit {
  @Output() valueChange = new EventEmitter();
  counter = 0;

    loginForm: FormGroup;
    errorMessage: string = '';

  constructor(private modalService: NgbModal,
     public activeModal: NgbActiveModal,
     public authService: AuthService,
     private router: Router,
     private fb: FormBuilder
   ) {
     this.createForm();
     this.valueChanged();
   }

  ngOnInit() {
  }

  createForm() {
    this.loginForm = this.fb.group({
      email: ['', Validators.required ],
      password: ['',Validators.required]
    });
  }

  tryFacebookLogin(){
    this.authService.doFacebookLogin()
    .then(res => {
      this.router.navigate(['/list']);
      this.activeModal.close();
    })
  }


  tryGoogleLogin(){
    this.authService.doGoogleLogin()
    .then(res => {
      this.router.navigate(['/list']);
      this.activeModal.close();
    })
  }

  tryLogin(value){
    this.authService.doLogin(value)
    .then(res => {
      this.router.navigate(['/list']);
      this.activeModal.close();
    }, err => {
      console.log(err);
      this.errorMessage = err.message;
    })
  }

  valueChanged() { // You can give any function name
    this.counter = this.counter + 1;
    this.valueChange.emit(this.counter);
}

}
