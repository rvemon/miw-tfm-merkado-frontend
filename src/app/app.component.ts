import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UfobattleService } from './ufobattle.service';
import { loginobservable } from './loginobservable.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'MiW Trabajo 2: UFO Battle';
  loggedIn: boolean = false;
  
  constructor(private service:UfobattleService, private toastr: ToastrService,
    private loginService: loginobservable){}

  ngOnInit(){
    this.loginService.comunicator$.asObservable().subscribe(
      res =>{
        if(res){
          this.loggedIn = true;
        }
        else{
          this.logout();
        }
        console.log("app component res: " + res);
      });
  }

  logout(){
    this.loggedIn = false;
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('username');
    this.toastr.warning("Logged Out, please login again.");
    //this.router.navigate(['login']);
  }
}
