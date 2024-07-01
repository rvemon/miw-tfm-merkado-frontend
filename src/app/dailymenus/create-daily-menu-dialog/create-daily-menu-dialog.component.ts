import {Component} from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';
import {Meal} from "../../shared/model/meal.model";
import {DailymenuService} from "../dailymenu.service";
import {MealService} from "../../meals/meal.service";
import {DailyMenu} from "../../shared/model/dailyMenu.model";
import {Router} from "@angular/router";
import {MatListOption} from "@angular/material/list";

@Component({
  selector: 'app-create-daily-menu-dialog',
  templateUrl: './create-daily-menu-dialog.component.html',
  styleUrls: ['./create-daily-menu-dialog.component.css',
    './../../shared/shared-styles.css']
})
export class CreateDailyMenuDialogComponent {
  name: string = '';
  day: string = '';
  days: string[] = ['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY']
  mealList: Meal[] = [];
  userId: string = '1';


  constructor(
    public dialogRef: MatDialogRef<CreateDailyMenuDialogComponent>,
    private dailyMenuService: DailymenuService,
    private router: Router,
    private mealService: MealService
  ) {
    this.userId = sessionStorage.getItem('id') as string;
    this.getMeals(this.userId);
  }

  getMeals(id:string){
    this.mealService.getMealsByUserId(id).subscribe(
      (data: Meal[])=>{
        this.mealList = data;
      }
    );
  }

  createDailyMenu(selectedMeals: MatListOption[]) {
    const selectedItems
      = selectedMeals
      .map((option: any) => option.value as Meal);
    let newDailyMenu: DailyMenu = {
      id: "0",
      userId: this.userId,
      day: this.day,
      name: this.name,
      meals: selectedItems
    }
    this.dailyMenuService.create(newDailyMenu).subscribe(
      (dailyMenu: DailyMenu)=>{
        this.router.navigate(['dailymenu'], {state: {dailyMenu}});
        this.dialogRef.close();
      }
    );
  }

}
