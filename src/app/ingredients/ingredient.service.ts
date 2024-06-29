import {Injectable} from "@angular/core";
import {EndPoints} from "../shared/end-points";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable} from "rxjs";
import {Ingredient} from "../shared/model/ingredient.model";

@Injectable({
  providedIn: 'root'
})
export class IngredientService{
  constructor(private http: HttpClient) {
  }

  getIngredientsByUserId(id: string): Observable<Ingredient[]>{
    return this.http.get<Ingredient[]>('http://localhost:8080/ingredients/userid/1');
  }




}
