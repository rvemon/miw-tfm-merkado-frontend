import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from './user.service';
import { loginobservable } from './loginobservable.service';
import { ToastrService } from 'ngx-toastr';
import {ConfirmationDialogComponent} from "./shared/confirmation-dialog/confirmation-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {DailyMenu} from "./shared/model/dailyMenu.model";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'MiW TFM';
  loggedIn: boolean = false;

  constructor(private router: Router, private toastr: ToastrService, private dialog: MatDialog){}

  ngOnInit(){
    if(sessionStorage.getItem('id')!=null){
      this.loggedIn = true;
    }

  }

  logout(){

    const dialogRef =
      this.dialog.open(ConfirmationDialogComponent,
        {
          data: {
            title: 'Logout',
            message: 'Are you sure you want to logout?'
          }
        });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.loggedIn = false;
        sessionStorage.removeItem('id');
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('email');
        this.toastr.warning("Logged Out, please login again.");
        this.router.navigate(['login']);
      }
      else{
        console.log("cancel");
      }
    });
  }
}
