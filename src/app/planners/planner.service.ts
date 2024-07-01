import {Injectable} from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable} from "rxjs";
import {EndPoints} from "../shared/end-points";
import {Planner} from "../shared/model/planner.model";
import {DailyMenu} from "../shared/model/dailyMenu.model";
import {ShoppingItem} from "../shared/model/shoppingItem.model";

@Injectable({
  providedIn: 'root'
})
export class PlannerService{
  constructor(private http: HttpClient) {
  }

  getPlannersByUserId(id: string):Observable<Planner[]>{
    return this.http.get<Planner[]>('http://localhost:8080/planners/userid/'+id);
  }

  getPlanner(id: string):Observable<Planner>{
    return this.http.get<Planner>('http://localhost:8080/planners/'+id)
  }

  update(id: string, planner: Planner):Observable<Planner>{
    return this.http.put<Planner>('http://localhost:8080/planners/'+ id, planner);
  }


  create(planner: Planner) {
    return this.http.post<Planner>('http://localhost:8080/planners', planner);
  }

  delete(id: string) {
    return this.http.delete('http://localhost:8080/planners/'+ id);
  }


  getShoppingListByPlannerId(id: string):Observable<ShoppingItem[]> {
    return this.http.get<ShoppingItem[]>('http://localhost:8080/planners/'+ id + '/shopping-list')
  }
}
