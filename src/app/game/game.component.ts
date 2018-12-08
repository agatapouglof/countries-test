import { Component, OnInit } from '@angular/core';
import { CountriesService } from "../webservices/countries.service";
import { AngularFireDatabase } from 'angularfire2/database';

import { Observable } from 'rxjs';


import * as firebase from 'firebase/app';
import * as moment from "moment";




@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css'],
  providers:[CountriesService]
})
export class GameComponent implements OnInit {
  countries :any;
  randomCountry : any;
  answers : any = [];
  score : number = 0;
  goodAnswer : string;
  questionsNumber : number = 20;
  questionIndex = 1;
  inGame = false;
  user : any;
  bestScores : any = [];
  allScores : any;


  constructor(private countriesService:CountriesService, public db: AngularFireDatabase) {
    // this.bestScores = this.db.list<any>('scores',ref => ref.orderByChild('score'));
    this.allScores = db.list('scores').valueChanges();


  }

  ngOnInit() {
    // var user = firebase.auth().currentUser;

    // this.bestScores = this.db.list('scores',ref => ref.orderByChild('score')).limitToLast(3).valueChanges();
    // const ref = firebase.database().ref('scores');
    // this.bestScores = ref.orderBy('score','desc').limit(3);
    let self = this;

    // this.bestScores = this.db.list('/scores', ref =>
    //   // ref.limitToLast(1)
    //   ref.orderByChild('score').on("value", function(snapshot) {
    //     snapshot.forEach(function(data) {
    //       self.bestScores.push(data.val());
    //       console.log("The " + data.key + " score is " + data.val());
    //     });

      // ref.orderByValue()
    // )
    // .valueChanges();
    // orderByValue
    // this.bestScores = this.db.list('/scores', ref => ref.orderBy('score')).valueChanges();

    // this.bestScores = this.db.list('/scores', {
    //   query: {
    //     orderByChild: 'score'
    //   }
    // });

    console.log(this.bestScores)


    if (localStorage.length > 0) {
      this.user =  JSON.parse(localStorage.getItem("user"));
    } else {
      console.log("no user in localStorage")
    }

    this.loadCountries();
  }


  loadCountries(){
    this.countriesService.getAllCountries().subscribe(
      posts => {
        this.countries = posts;
      }
    );
  }

  randomNumber(min, max){
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  startGame(){
    this.questionIndex = 1;
    this.score = 0;
    this.inGame = true;
    this.showRandom();
  }

  saveScore(){
    if(this.user){
      let time = Date.now();
      console.log(time);
      this.db.list('/scores').push({ "score" : this.score, "time" : time, "user" : this.user});

    }
  }

  showRandom(){
    let n = this.randomNumber(0,249);
    this.randomCountry = this.countries[n];
    this.goodAnswer = this.randomCountry.capital;
    this.setPropositionsReponses();
    // this.score++;
    // console.log(this.countries[n]);
  }

  repondre(rep:string){
    if(this.questionIndex == 20){
      this.inGame = false;
      this.saveScore();
      console.log("le score final est");
      console.log(this.score);
    }else{
      // console.log(rep)
      // console.log(this.goodAnswer)
      if(rep == this.goodAnswer) this.score++;
      this.showRandom();
      this.questionIndex++;
    }

  }

  setPropositionsReponses(){
    let i = 0;
    this.answers  = [];
    this.answers.push(this.goodAnswer);
    while (i < 4){
      let cap = this.countries[this.randomNumber(0,249)].capital
      if(this.answers.indexOf(cap) == -1) {
        this.answers.push(cap);
        i++;
      }
    }
    this.answers = this.shuffle(this.answers);
  }

  shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  }

}
