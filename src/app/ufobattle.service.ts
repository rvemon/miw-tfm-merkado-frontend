import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UfobattleService {
  private baseUrl = 'http://fenw.etsisi.upm.es:10000';

  constructor(private http: HttpClient) { }

  getRecords(){
    return this.http.get (this.baseUrl + '/records');
  }

  getRecord(username: string, token: string){
    const headers = new HttpHeaders()
       .set("Authorization", token)
       .set("Access-Control-Expose-Headers","*");
    return this.http.get (this.baseUrl + '/records' + '/' + username, {headers: headers, observe: 'response'});
  }

  createUser(inputData: any){
    return this.http.post(this.baseUrl + '/users', inputData);
  }

  loginUser(inputData: any){
    const headers = new HttpHeaders().set("Content-Type", "application/json")
    .set("Access-Control-Expose-Headers","*");
    return this.http.get(this.baseUrl + '/users' + '/login', {headers: headers, params: inputData, observe: 'response'});
  }

  searchUser(username: string){
    const headers = new HttpHeaders().set("Content-Type", "application/json")
    .set("Access-Control-Expose-Headers","*");
    return this.http.get (this.baseUrl + '/users' + '/' + username, {headers: headers, observe: 'response'});
  }

  sendRecord(newRecord:any, token: string){
    const headers = new HttpHeaders().set("Content-Type", "application/json")
    .set("Authorization", token)
    .set("Access-Control-Expose-Headers","*");
    return this.http.post(this.baseUrl + '/records', newRecord, {headers, observe: 'response'});
  }

}
