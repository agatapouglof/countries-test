import { Component, OnInit } from '@angular/core';
import { CountriesService } from "../webservices/countries.service"


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
  total : number = 0;
  goodAnswer : string;
  questionsNumber : number = 0;

  constructor(private countriesService:CountriesService) { }

  ngOnInit() {
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

  showRandom(){
    let n = this.randomNumber(0,249);
    this.randomCountry = this.countries[n];
    this.goodAnswer = this.randomCountry.capital;
    this.setPropositionsReponses();
    // this.total++;
    console.log(this.countries[n]);
  }

  repondre(rep:string){
    console.log(rep)
    console.log(this.goodAnswer)
    if(rep == this.goodAnswer) this.total++;
    this.showRandom();
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
