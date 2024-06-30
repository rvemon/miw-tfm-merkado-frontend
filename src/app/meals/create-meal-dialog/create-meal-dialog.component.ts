import {Component} from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';
import {Ingredient} from "../../shared/model/ingredient.model";
import {IngredientService} from "../../ingredients/ingredient.service";
import {MealIngredient} from "../../shared/model/mealIngredient.model";
import {Meal} from "../../shared/model/meal.model";
import {MealService} from "../meal.service";
import {Router} from "@angular/router";
import {MatListOption} from "@angular/material/list";

@Component({
  selector: 'app-create-meal-dialog',
  templateUrl: './create-meal-dialog.component.html',
  styleUrls: ['./create-meal-dialog.component.css',
    './../../shared/shared-styles.css']
})
export class CreateMealDialogComponent {
  name: string = '';
  category: string = '';
  categories: string[] = ['APPETIZER', 'SOUP', 'SALAD', 'MAIN', 'DESSERT', 'DRINK'];
  ingredients: Ingredient[] =[];
  mealIngredients: MealIngredient[] = [];

  constructor(
    public dialogRef: MatDialogRef<CreateMealDialogComponent>,
    private mealService: MealService,
    private router: Router,
    private ingredientService: IngredientService) {
    this.getIngredients("1");
  }

  getIngredients(id:String){
    this.ingredientService.getIngredientsByUserId("1").subscribe(
      (data: Ingredient[])=>{
        this.ingredients = data;
        this.createMealIngredients();
      }
    );
  }

  createMealIngredients() {
    this.mealIngredients = this.ingredients.map(ingredient => ({
      id: '',
      ingredient: ingredient,
      quantity: 0
    }));
  }

  createMeal(selectedIngredients: MatListOption[]) {
    const selectedItems
      = selectedIngredients
      .map((option: any) => option.value as MealIngredient);
    let newMeal: Meal = {
      id: "0",
      userId: "1",
      category: this.category,
      name: this.name,
      ingredients: selectedItems
    }
    this.mealService.create(newMeal).subscribe(
      (meal: Meal)=>{
        this.router.navigate(['meal'], {state: {meal}});
        this.dialogRef.close();
      }
    );

  }

}
