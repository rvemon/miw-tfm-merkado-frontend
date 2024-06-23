import { AfterViewInit, Component, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { MissileComponent } from '../missile/missile.component';
import { UfoComponent } from '../ufo/ufo.component';
import { FormBuilder } from '@angular/forms';
import { UfobattleService } from '../ufobattle.service';
import { record } from '../shared/model/record.model';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { loginobservable } from '../loginobservable.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit, AfterViewInit{ 
  ufos: number = 1;
  time: number = 60;
  timer: number = this.time;
  timerpid: number = 0;
  interval: any;
  points: string = '0';
  hitpoints: number = 100;
  misspoints: number = 25;
  timersrt: string = '60';
  pointssrt: string = '0';
  sendScoreBtn: boolean = false;
  startGame: boolean = false;
  showScore = false;

  @ViewChild('missile') missile!: MissileComponent;
  @ViewChildren('ufosel') ufoList!: QueryList<UfoComponent>;  
  
  constructor(private service:UfobattleService,
    private toastr: ToastrService, private loginService: loginobservable){}

  ngAfterViewInit() {
    window.setInterval(() => {this.checkHit();}, 25);
    this.subscribeMissile(this.missile);
  }

  ngOnInit(){
    this.ufos = Number(sessionStorage.getItem('ufos') || '1');
    this.time = Number(sessionStorage.getItem('time') || '60');
  }

  
  calculateScore(){
   this.points = '' + (Number(this.points)/(this.time/60));
   this.points = '' + (Number(this.points) - ((this.ufos-1)*50));
   this.pointssrt = '' + this.points;
  }

  startTimer(){
    this.timer = this.time;
    this.interval = setInterval(()=>{
      this.timer = this.timer-1;
      this.timersrt = '' + this.timer;
      if(this.timer <= 0){
        clearInterval(this.interval);
        this.missile.stopMissile();
        this.calculateScore();
        this.showScoreButton();
      }
    },1000);
  }

  checkToken(){
    return sessionStorage.getItem('token')  && sessionStorage.getItem('username');
  }


  showScoreButton(){
    this.showScore = true;
    if(this.checkToken()){
      this.sendScoreBtn = true;
    }
  }

  newGame(){
    window.location.reload();
  }

  sendScore(){
    if(this.checkToken()){
      let scoreclass = new record;
      scoreclass.disposedTime = this.time;
      scoreclass.ufos = this.ufos;
      scoreclass.punctuation = Number(this.points);

      this.service.sendRecord(JSON.stringify(scoreclass),sessionStorage.getItem('token') || '')
      .subscribe(
        res => {
          //update token
          let token = '' +  res.headers.get('Authorization');
          sessionStorage.setItem('token', token);
          this.loginService.loggedIn();
          this.toastr.success('Score saved.');
        },
        err =>{
          this.toastr.error('Something went wrong. Score could not be saved.');
        }
      );
    }
  }

  showcoordenates(){
    console.log(this.missile.vpos);
  }

  checkHit(){
    this.ufoList.forEach((ufo,index) =>{
      let hit = (this.missile.vpos + this.missile.missileHeight >= ufo.vpos) &&
          (this.missile.hpos + this.missile.missileWidth/2 >= ufo.hpos) &&
          (this.missile.hpos + this.missile.missileWidth/2 <= ufo.hpos + ufo.ufoWidth) &&
          (this.missile.vpos <= ufo.vpos) &&
          (ufo.hitbox);
      
      if(hit){
        console.log("ufo hit: " + index);
        ufo.explode();
        this.points = ''  + (Number(this.points) + this.hitpoints);
        this.pointssrt = this.points;
        this.missile.newMissile();
      } 
    });
  }

  subscribeMissile(obsMissile: MissileComponent){
    obsMissile.sharedInfoSubject$.asObservable().subscribe(
      (value) =>{
        if(value.miss){
          this.points = '' + (Number(this.points) - this.misspoints);
          this.pointssrt = this.points;
        }
        if(value.triggered && this.startGame== false){
          this.startGame = true;
          this.startTimer();
        }
      }
    );
  }
  

}