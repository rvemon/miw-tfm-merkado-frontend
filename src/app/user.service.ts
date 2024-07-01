import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) { }


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


}
