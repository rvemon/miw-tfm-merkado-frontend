import {Injectable} from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable} from "rxjs";
import {EndPoints} from "../shared/end-points";
import {Meal} from "../shared/model/meal.model";
import {MealIngredient} from "../shared/model/mealIngredient.model";
import {Ingredient} from "../shared/model/ingredient.model";

@Injectable({
  providedIn: 'root'
})
export class MealService{

  constructor(private http: HttpClient) {
  }

  getMealsByUserId(id:string): Observable<Meal[]>{
    return this.http.get<Meal[]>(('http://localhost:8080/meals/userid/1'));
  }

  getMeal(id: string):Observable<Meal>{
    return this.http.get<Meal>('http://localhost:8080/meals/'+id);
  }

  update(id: string, meal: Meal):Observable<Meal>{
    return this.http.put<Meal>('http://localhost:8080/meals/'+ id, meal);
  }


  create(meal: Meal) {
    return this.http.post<Meal>('http://localhost:8080/meals', meal);
  }

  delete(id: string) {
    return this.http.delete('http://localhost:8080/meals/'+ id);
  }

  deleteMealIngredient(id: string){
    return this.http.delete('http://localhost:8080/meals/meal-ingredient/'+ id);
  }

}
