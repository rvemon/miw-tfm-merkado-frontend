import {Component, inject, Inject} from '@angular/core';
import {Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {CreateMealDialogComponent, Item, DialogData} from "./create-meal-dialog/create-meal-dialog.component";
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
      this.dialog.open(CreateMealDialogComponent,
        {data: {items: this.getItems(), name: '', day: ''}
        });

    /*dialogRef.afterClosed().subscribe((result: Item[] | undefined) => {
      if (result) {
        this.selectedItems = result;
      }
    });*/
  }


  openMeal(meal: Meal) {
    this.router.navigate(['meal'], {state: {meal}});
  }

  getItems(): Item[] {
    return [
      { id: 1, name: 'Item 1', quantity:0 },
      { id: 2, name: 'Item 2', quantity: 0 },
      { id: 3, name: 'Item 3', quantity: 0 },
      // Agrega más elementos según sea necesario
    ];
  }

}
