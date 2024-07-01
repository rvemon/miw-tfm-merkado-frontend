import {Injectable} from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable} from "rxjs";
import {EndPoints} from "../shared/end-points";
import {DailyMenu} from "../shared/model/dailyMenu.model";

@Injectable({
  providedIn: 'root'
})
export class DailymenuService{

  constructor(private http: HttpClient) {
  }
  getDailyMenuByUserId(id: string):Observable<DailyMenu[]>{
    return this.http.get<DailyMenu[]>('http://localhost:8080/daily-menus/userid/' + id);
  }

  getDailyMenu(id: string):Observable<DailyMenu>{
    return this.http.get<DailyMenu>('http://localhost:8080/daily-menus/'+id)
  }

  update(id: string, dailyMenu: DailyMenu):Observable<DailyMenu>{
    return this.http.put<DailyMenu>('http://localhost:8080/daily-menus/'+ id, dailyMenu);
  }


  create(dailyMenu: DailyMenu) {
    return this.http.post<DailyMenu>('http://localhost:8080/daily-menus', dailyMenu);
  }

  delete(id: string) {
    return this.http.delete('http://localhost:8080/daily-menus/'+ id);
  }

}
