import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, ValidatorFn, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import {UsersService} from "../users.service";
import {UserRequest} from "../shared/model/userRequest.model";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css', '../app.component.css'],
})

export class RegisterComponent implements OnInit{
  usernameUniqueness = false;
  constructor(private builder:FormBuilder, private toastr: ToastrService,
              private service:UserService, private router: Router,
              private usersService: UsersService){}

  ngOnInit(){
    if(sessionStorage.getItem('id')!=null){
      this.router.navigate(['home']);
    }

  }

  registerform=this.builder.group({
    //username: this.builder.control('', Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(8)])),
    password: this.builder.control('', Validators.compose([Validators.required, Validators.minLength(4)])),
    passwordConfirm: this.builder.control('', Validators.compose([Validators.required, Validators.minLength(4)])),
    email: this.builder.control('', Validators.compose([Validators.required, Validators.email]))
  });

  /*checkUniqueness(){
    if(this.registerform.value.username){
      let username = this.registerform.value.username;
      this.service.searchUser(username)
      .subscribe(
        res =>{
        this.toastr.warning("Username Already Exists, please enter a new one.")
        },
        err => {
          this.toastr.warning("Valid username");
          this.usernameUniqueness = true;
        }
        );
    }

  }*/

  checkToken(){
    return sessionStorage.getItem('token')  && sessionStorage.getItem('username');
  }

  register(){
    if(this.registerform.valid){
      const userRequest: UserRequest={
        email: this.registerform.value.email as string,
        password: this.registerform.value.password as string
      }
      this.usersService.createUser(userRequest).subscribe(
        ()=>{
          this.toastr.success('User created','Registered successfully.');
          this.router.navigate(['login']);
        }
      );
    }
    else{
      this.toastr.warning('Something went wrong. Please enter valid data.');

      /*if(!this.usernameUniqueness){
        this.toastr.warning('Username already exist');
      }
      else{
        this.toastr.warning('Something went wrong. Please enter valid data.');
      }*/

    }
  }
}

export default class CustomValidators {
  static match(controlName: string, matchControlName: string): ValidatorFn {
    return (controls: AbstractControl) => {
      const control = controls.get(controlName);
      const matchControl = controls.get(matchControlName);

      if (!matchControl?.errors && control?.value !== matchControl?.value) {
        matchControl?.setErrors({
          matching: {
            actualValue: matchControl?.value,
            requiredValue: control?.value
          }
        });
        return { matching: true };
      }
      return null;
    };
  }
}
