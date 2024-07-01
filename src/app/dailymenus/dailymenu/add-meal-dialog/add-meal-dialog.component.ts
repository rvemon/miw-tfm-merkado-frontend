import {Component, Inject} from '@angular/core';
import {DailyMenu} from "../../../shared/model/dailyMenu.model";
import {Meal} from "../../../shared/model/meal.model";
import {MealService} from "../../../meals/meal.service";
import {Router} from "@angular/router";
import {DailymenuService} from "../../dailymenu.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-add-meal-dialog',
  templateUrl: './add-meal-dialog.component.html',
  styleUrls: ['./add-meal-dialog.component.css', './../../../shared/shared-styles.css']
})
export class AddMealDialogComponent {

  dailyMenu!: DailyMenu;
  meals!:Meal[];
  meal: Meal | undefined;

  constructor(
    private mealService: MealService,
    private router: Router,
    private dailyMenuService: DailymenuService,
    private dialogRef: MatDialogRef<AddMealDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DailyMenu
  ) {
    console.log("data:",data);
    this.dailyMenu = data;
    this.getMeals(this.dailyMenu.userId);
  }

  getMeals(id: string){
    this.mealService.getMealsByUserId(id).subscribe(
      (data: Meal[])=>{
        this.meals = data;
      },
      (error)=>{
        console.log("error: ",error);
      }
    );
  }

  addMeal(){
    if (this.meal) {
      this.dailyMenu.meals.push(this.meal);
      this.dailyMenuService.update(this.dailyMenu.id, this.dailyMenu).subscribe(
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
