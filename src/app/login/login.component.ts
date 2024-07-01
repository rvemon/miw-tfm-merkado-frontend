import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import {UsersService} from "../users.service";
import {UserRequest} from "../shared/model/userRequest.model";
import {UserResponse} from "../shared/model/userResponse.model";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css', '../app.component.css']
})
export class LoginComponent implements OnInit{
  constructor(private builder:FormBuilder, private toastr: ToastrService,
              private router: Router, private usersService: UsersService){}

  ngOnInit(){
    if(this.checkToken()){
      console.log("automatic login");
      this.toastr.success('Login Successfull.');
      this.router.navigate(['home']);
      console.log("session: ", sessionStorage.getItem('id'));
    }
  }

  loginform = this.builder.group({
    email: this.builder.control('', Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(20)])),
    password: this.builder.control('', Validators.compose([Validators.required, Validators.minLength(4)]))
  });

  checkToken(){
    return sessionStorage.getItem('token')  && sessionStorage.getItem('id');
  }

  login(){
    if(this.loginform.valid){
      const  userRequest : UserRequest = {
        email: this.loginform.value.email as string,
        password: this.loginform.value.password as string
      }

      this.usersService.login(userRequest).subscribe(
        (data: UserResponse)=>{
          sessionStorage.setItem('id', data.id);
          sessionStorage.setItem('token', data.token);
          sessionStorage.setItem('email', data.token);
          this.toastr.success('Login Successfull.');
          this.router.navigate(['home']);
        },
        (error)=>{
          this.toastr.error('Something went wrong. Please enter a valid username and password.');
        }
      );
    }
    else{
      this.toastr.error('Enter a valid username and password.');
    }

  }

}
