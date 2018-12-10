import { Injectable } from "@angular/core";
import 'rxjs/add/operator/toPromise';
import { Http, Response, Headers, RequestOptions, RequestMethod } from '@angular/http';
import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import 'rxjs/add/operator/toPromise';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
   public db: AngularFirestore,
   public afAuth: AngularFireAuth,
   private http:Http
 ){
 }


  getCurrentUser(){
    return new Promise<any>((resolve, reject) => {
      var user = firebase.auth().onAuthStateChanged(function(user){
        if (user) {
          resolve(user);
        } else {
          reject('No user logged in');
        }
      })
    })
  }

  updateCurrentUser(value){
    return new Promise<any>((resolve, reject) => {
      var user = firebase.auth().currentUser;
      user.updateProfile({
        displayName: value.name,
        photoURL: user.photoURL
      }).then(res => {
        resolve(res)
      }, err => reject(err))
    })
  }

  getUserPosition(){
    return this.http.get('https://ipapi.co/json/')
    .map(
      res => res.json()
    )
  }
}
