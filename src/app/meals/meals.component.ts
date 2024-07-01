import {Component, inject, Inject, OnInit} from '@angular/core';
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
export class MealsComponent implements OnInit{
  meals: Meal[] = [];
  userId: string = '1';
  private dialog = inject(MatDialog);

  constructor(private router: Router, private mealService: MealService) {
  }


  ngOnInit(){
    if(sessionStorage.getItem('id')!=null){
      this.userId = sessionStorage.getItem('id') as string;
      console.log("userId", this.userId);
      this.getMealsByUserId(this.userId);
    }
    else{
      this.router.navigate(['login']);
    }

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
