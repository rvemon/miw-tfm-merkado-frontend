import {Component, AfterViewInit, ViewChild, ElementRef, Renderer2} from '@angular/core';

@Component({
  selector: 'app-ufo',
  templateUrl: './ufo.component.html',
  styleUrls: ['./ufo.component.css']
})
export class UfoComponent implements AfterViewInit {
  @ViewChild('ufo') ufo!: ElementRef;
  @ViewChild('game_div') game_div!: ElementRef;

  conf = {
    rLimit: 720,
    uLimit: 480
  };
  ufoWidth: any;  ufoHeight: any;
  hpos:any;       vpos:any;
  hstep: any;     hitbox: any;

  constructor(private renderer: Renderer2) {
  }

  ngAfterViewInit() {
    this.ufoWidth = this.ufo.nativeElement.width;
    this.ufoHeight = this.ufo.nativeElement.height;
    this.hpos = Math.floor(Math.random()*(this.conf.rLimit - this.ufoWidth));
    this.vpos = Math.floor(Math.random()*(this.conf.uLimit/2 - this.ufoHeight) + this.conf.uLimit/2) ;
    this.hstep = Math.floor(Math.random()*5) + 3;
    this.hitbox = true;

    this.renderer.setStyle(this.ufo.nativeElement, 'left',  this.hpos + 'px');
    this.renderer.setStyle(this.ufo.nativeElement, 'bottom', this.vpos + 'px');
    window.setInterval(() => { this.move(); } , 25);
    window.onresize = () => {this.conf.rLimit = window.innerWidth; };

  }

  move() {
    if ((this.hpos > this.conf.rLimit - this.ufoWidth - 8) || (this.hpos) < 0) {
      this.hstep = (-1) * this.hstep;
    }
    this.hpos = this.hpos + this.hstep;
    this.renderer.setStyle(this.ufo.nativeElement, 'left', this.hpos + 'px');
  }

  explode(){
    this.renderer.setAttribute(this.ufo.nativeElement, 'src', "../assets/imgs/explosion.gif");
    this.hitbox = false;
    setTimeout(()=>{
      this.renderer.setAttribute(this.ufo.nativeElement, 'src', "../assets/imgs/ufo.png");
      this.hitbox = true;
    },1000);

  }


}
