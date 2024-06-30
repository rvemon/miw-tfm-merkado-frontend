import {Component, Inject} from '@angular/core';
import {IngredientService} from "../../../ingredients/ingredient.service";
import {MealService} from "../../meal.service";
import {Meal} from "../../../shared/model/meal.model";
import {Ingredient} from "../../../shared/model/ingredient.model";
import {Router} from "@angular/router";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {MealIngredient} from "../../../shared/model/mealIngredient.model";

@Component({
  selector: 'app-add-ingredient-dialog',
  templateUrl: './add-ingredient-dialog.component.html',
  styleUrls: ['./add-ingredient-dialog.component.css',
    './../../../shared/shared-styles.css']
})
export class AddIngredientDialogComponent {
  meal!:Meal;
  ingredients!: Ingredient[];
  ingredient: Ingredient | undefined;
  quantity: number = 0;

  constructor(
    private ingredientService: IngredientService,
    private mealService: MealService,
    private router: Router,
    private dialogRef: MatDialogRef<AddIngredientDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Meal
  ) {
    console.log("data", data);
    this.meal = data;
    this.getIngredients(this.meal.userId);
  }

  getIngredients(id: string){
    this.ingredientService.getIngredientsByUserId(id).subscribe(
      (data: Ingredient[])=>{
        this.ingredients = data;
      },
      (error)=>{
        console.log("error: ",error);
      }
    );
  }

  addIngredient(){
    if (this.ingredient) {
      let mealIngredient: MealIngredient = {
        id: '',
        ingredient: this.ingredient,
        quantity: this.quantity

      }
      let ingredients: MealIngredient[] = [];
      ingredients.push(mealIngredient);
      this.meal.ingredients.push(mealIngredient);
      this.mealService.update(this.meal.id, this.meal).subscribe(
        ()=>{
        },
        (error)=>{
          console.log("error", error);
        }
      );
    }
    this.dialogRef.close();

  }


}
