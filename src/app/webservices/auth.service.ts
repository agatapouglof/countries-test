import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { UserService } from './user.service';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(public afAuth: AngularFireAuth, private userService:UserService) { }
  doFacebookLogin(){
    return new Promise<any>((resolve, reject) => {
      let provider = new firebase.auth.FacebookAuthProvider();
      this.afAuth.auth
      .signInWithPopup(provider)
      .then(res => {
        this.storeUser(res.user);
        resolve(res);
      }, err => {
        console.log(err);
        reject(err);
      })
    })
  }


  doGoogleLogin(){
    return new Promise<any>((resolve, reject) => {
      let provider = new firebase.auth.GoogleAuthProvider();
      provider.addScope('profile');
      provider.addScope('email');
      this.afAuth.auth
      .signInWithPopup(provider)
      .then(res => {
        // console.log("res auth")
        console.log(res.user)
        this.storeUser(res.user)
        resolve(res);
      }, err => {
        console.log(err);
        reject(err);
      })
    })
  }

  doRegister(value){
    return new Promise<any>((resolve, reject) => {
      firebase.auth().createUserWithEmailAndPassword(value.email, value.password)
      .then(res => {
        resolve(res);
      }, err => reject(err))
    })
  }

  doLogin(value){
    return new Promise<any>((resolve, reject) => {
      firebase.auth().signInWithEmailAndPassword(value.email, value.password)
      .then(res => {
        resolve(res);
      }, err => reject(err))
    })
  }

  doLogout(){
    return new Promise((resolve, reject) => {
      if(firebase.auth().currentUser){
        this.afAuth.auth.signOut()
        resolve();
      }
      else{
        reject();
      }
    });
  }

  storeUser(res){
    let user:any = {};
    console.log("user in store user function")
    console.log(user)
    if(res.providerData[0].providerId == 'password'){
      user.image = 'http://dsi-vd.github.io/patternlab-vd/images/fpo_avatar.png';
      user.name = res.displayName;
      user.provider = res.providerData[0].providerId;
      user.uid = res.uid;
      localStorage.setItem("user", user);
    }else{
        user.image = res.photoURL;
        user.name = res.displayName;
        user.provider = res.providerData[0].providerId;
        user.uid = res.uid;
        localStorage.setItem("user", JSON.stringify(user));

      }

  }

}
