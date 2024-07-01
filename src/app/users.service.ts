import {UserRequest} from "./shared/model/userRequest.model";
import {UserResponse} from "./shared/model/userResponse.model";
import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UsersService{
  private baseUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) {
  }

  createUser(request: UserRequest): Observable<UserResponse>{
    return this.http.post<UserResponse>(this.baseUrl+ '/users', request);
  }

  login(request: UserRequest): Observable<UserResponse>{
    return this.http.post<UserResponse>(this.baseUrl+ '/users/login', request);
  }
}
