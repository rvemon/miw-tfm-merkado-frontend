import {Component, inject, Inject} from '@angular/core';
import {Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {CreateMealDialogComponent} from "./create-meal-dialog/create-meal-dialog.component";
import {MealService} from "./meal.service";
import {Meal} from "../shared/model/meal.model";

@Component({
  selector: 'app-meals',
  templateUrl: './meals.component.html',
  styleUrls: ['./meals.component.css']
})
export class MealsComponent{
  meals: Meal[] = [];
  private dialog = inject(MatDialog);

  constructor(private router: Router, private mealService: MealService) {
  }

  ngOnInit(): void {
    this.getMealsByUserId("1");
  }

  getMealsByUserId(id:string){
    //TODO login user
    this.mealService.getMealsByUserId(id).subscribe(
      (data: Meal[])=>{
        this.meals = data;
        console.log("meals obtained", this.meals);
      },
      (error)=>{
        console.log("error");
      }
    );
  }

  openCreateDialog() {
    const dialogRef =
      this.dialog.open(CreateMealDialogComponent);
  }


  openMeal(meal: Meal) {
    this.router.navigate(['meal'], {state: {meal}});
  }

}
