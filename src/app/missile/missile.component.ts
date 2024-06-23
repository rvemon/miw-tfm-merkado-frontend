import { Component, OnInit, ViewChild, ElementRef, HostListener, AfterViewInit  } from '@angular/core';
import { Subject } from 'rxjs';
import { missileSharedInfo } from './model/missileSharedInfo.model';

@Component({
  selector: 'app-missile',
  templateUrl: './missile.component.html',
  styleUrls: ['./missile.component.css']
})
export class MissileComponent implements OnInit, AfterViewInit {
  @ViewChild('missile') missile!: ElementRef;
  conf = {
    rLimit: 720,
    uLimit: 480
  };
  hpos = 300; hstep = 5;
  vpos = 0;   vstep = 5;
  pid = 0;    
  missileWidth: any;
  missileHeight: any;
  private canMove = true;
  missileSharedInfo = new missileSharedInfo();
  public sharedInfoSubject$: Subject<missileSharedInfo> = new Subject();

  constructor() { }
  ngOnInit() {}

  ngAfterViewInit(){
    this.missileHeight = this.missile.nativeElement.height;
    this.missileWidth = this.missile.nativeElement.width;
  }

  getConf(){
    return this.conf;
  }

  stopMissile(){
    this.canMove = false;
  }

  @HostListener('document:keydown', ['$event'])
  keypressed(theEvent: KeyboardEvent) {

    if(this.missileSharedInfo.triggered || !this.canMove){
      return;
    }

    switch (theEvent.key) {
      case 'ArrowRight': this.moveRight(this.hstep);
                         break;
      case 'ArrowLeft':  this.moveLeft(this.hstep);
                         break;
      case ' ':          this.missileSharedInfo.triggered = true;
                         this.sharedInfoSubject$.next(this.missileSharedInfo);
                         this.pid = window.setInterval(() => {
                          this.trigger(); 
                        }, 15);
                         break;
      }
  }


  moveLeft(step: number){
    if(this.hpos  > 8){
      this.moveHorizontal((-1)*step);
    } 
  }

  moveRight(step: number) {
    if ((this.hpos + this.missileWidth + 8 < this.conf.rLimit)){
    this.moveHorizontal(step);
    }
  }

  moveHorizontal(step:number){
    this.hpos = this.hpos + step;
    this.missile.nativeElement.style.left = this.hpos + 'px';
  }

  newMissile() {
    clearInterval(this.pid);
    this.vpos = 0;
    this.missile.nativeElement.style.bottom = this.vpos + 'px';
    this.missileSharedInfo.triggered = false;
    this.missileSharedInfo.miss = false;
  }

  trigger() {
    if (this.vpos > this.conf.uLimit - this.missileHeight - 8) {
      this.missileSharedInfo.miss = true;
      this.sharedInfoSubject$.next(this.missileSharedInfo);
      this.newMissile();
    } else {
      this.vpos = this.vpos + this.vstep;
    }
    this.missile.nativeElement.style.bottom = this.vpos + 'px';
  }
}
