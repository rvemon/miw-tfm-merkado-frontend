import { Component, OnInit } from '@angular/core';
import { UfobattleService } from '../ufobattle.service';
import { record } from '../shared/model/record.model';
import { loginobservable } from '../loginobservable.service';

@Component({
  selector: 'app-records',
  templateUrl: './records.component.html',
  styleUrls: ['./records.component.css', '../app.component.css']
})
export class RecordsComponent implements OnInit{ 
  records: record[] = [];
  userRecords: record[] = [];
  test = false;

  constructor(private service:UfobattleService, private loginService: loginobservable){}

  ngOnInit(){
    this.getGlobalRecords();
    this.getUserRecords();
  }

  getGlobalRecords(){
    this.service.getRecords().subscribe((value:any) => {
      this.records = value;
    });
  }

  checkToken(){
    return sessionStorage.getItem('token')  && sessionStorage.getItem('username');
  }

  getUserRecords(){
    if(this.checkToken()){
      this.service.getRecord(sessionStorage.getItem('username') || '', sessionStorage.getItem('token') || '')
      .subscribe((value:any) => {
        this.userRecords = value.body;
        //update token
        let token = '' +  value.headers.get('Authorization');
        sessionStorage.setItem('token', token);

        this.loginService.loggedIn();
      });
    }
    
  }

  userDataExist(){
    return this.userRecords.length != 0;
  }
}