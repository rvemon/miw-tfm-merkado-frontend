import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Meal} from "../../shared/model/meal.model";
import {DailymenuService} from "../dailymenu.service";
import {MealService} from "../../meals/meal.service";
import {DailyMenu} from "../../shared/model/dailyMenu.model";
import {Router} from "@angular/router";
import {MatListOption} from "@angular/material/list";

export interface Item {
  id: number;
  name: string;
}
export interface DialogData {
  items: Item[];
}

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


  constructor(
    public dialogRef: MatDialogRef<CreateDailyMenuDialogComponent>,
    private dailyMenuService: DailymenuService,
    private router: Router,
    private mealService: MealService,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {
    this.getMeals("1");
  }

  getMeals(id:string){
    this.mealService.getMealsByUserId("1").subscribe(
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
      userId: "1",
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
