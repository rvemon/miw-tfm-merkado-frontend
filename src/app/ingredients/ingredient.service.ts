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

  update(id: string, ingredient: Ingredient):Observable<Ingredient>{
    return this.http.put<Ingredient>('http://localhost:8080/ingredients/'+ id,ingredient);
  }


  create(ingredient: Ingredient) {
    return this.http.post<Ingredient>('http://localhost:8080/ingredients', ingredient);
  }

  delete(id: string) {
    return this.http.delete('http://localhost:8080/ingredients/'+ id);
  }
}
