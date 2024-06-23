import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { UfobattleService } from '../ufobattle.service';
import { Router } from '@angular/router';
import { loginobservable } from '../loginobservable.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css', '../app.component.css']
})
export class LoginComponent implements OnInit{
  constructor(private builder:FormBuilder, private toastr: ToastrService,
    private service:UfobattleService, private router: Router, private loginService: loginobservable){}

  ngOnInit(){
    if(this.checkToken()){
      console.log("automatic login");
      this.toastr.success('Login Successfull.');
      this.router.navigate(['game']);
      this.loginService.loggedIn();
    };
  }

  loginform = this.builder.group({
    username: this.builder.control('', Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(8)])),
    password: this.builder.control('', Validators.compose([Validators.required, Validators.minLength(4)]))
  });

  checkToken(){
    return sessionStorage.getItem('token')  && sessionStorage.getItem('username');
  }

  login(){
    this.toastr.success('Login Successfull.');

    this.router.navigate(['planners']);

    return;

  }
}
