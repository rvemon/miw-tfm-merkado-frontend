import { Component } from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {ConfirmationDialogComponent} from "../../shared/confirmation-dialog/confirmation-dialog.component";
import {DailyMenu} from "../../shared/model/dailyMenu.model";
import {Router} from "@angular/router";
import {DailymenuService} from "../dailymenu.service";
import {Meal} from "../../shared/model/meal.model";
import {AddMealDialogComponent} from "./add-meal-dialog/add-meal-dialog.component";

@Component({
  selector: 'app-dailymenu',
  templateUrl: './dailymenu.component.html',
  styleUrls: ['./dailymenu.component.css']
})
export class DailymenuComponent {
  editable: boolean = false;
  days: string[] = ['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY'];
  dailyMenu!: DailyMenu;
  meals: Meal[] = [];

  constructor(private dialog: MatDialog, private router: Router, private dailyMenuService: DailymenuService) {
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras?.state?.['dailyMenu']) {
      this.dailyMenu = navigation.extras.state['dailyMenu'];
      this.getDailyMenu(this.dailyMenu.id);
      console.log("meal: ", this.dailyMenu);
    } else {
      console.log("no meal");
    }
  }

  getDailyMenu(id:string){
    this.dailyMenuService.getDailyMenu(id).subscribe(
      (data:DailyMenu)=>{
        this.dailyMenu = data;
      },
      (error) =>{
        console.log("error",error);
      }
    );
  }

  delete(id:string){
    const dialogRef =
      this.dialog.open(ConfirmationDialogComponent,
        {
          data: {
            title: 'Delete Daily Menu',
            message: 'Are you sure you want to delete this daily menu?'
          }
        });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.dailyMenuService.delete(this.dailyMenu.id).subscribe(
          ()=>{
            this.router.navigate(['dailymenus']);
          }
        );
        console.log("deleted");
      }
      else{
        console.log("cancel");
      }
    });
  }

  removeMeal(id: string){
    const dialogRef =
      this.dialog.open(ConfirmationDialogComponent,
        {
          data: {
            title: 'Remove Meal',
            message: 'Are you sure you want to remove this meal?'
          }
        });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        //TODO remove meal
        console.log("remover meal");
      }
      else{
        console.log("cancel");
      }
    });
  }

  edit() {
    this.editable= !this.editable;
  }

  addMeal() {
    const dialogRef = this.dialog.open(AddMealDialogComponent,
      {data:this.dailyMenu});

    dialogRef.afterClosed().subscribe(
      ()=>{
        this.getDailyMenu(this.dailyMenu.id);
      }
    );
  }

  save(){
    const dialogRef =
      this.dialog.open(ConfirmationDialogComponent,
        {
          data: {
            title: 'Save Daily Menu',
            message: 'Are you sure you want to save the daily Menu?'
          }
        });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        console.log("confirm");
        this.dailyMenuService.update(this.dailyMenu.id, this.dailyMenu).subscribe(
          (data: DailyMenu)=>{
            this.dailyMenu = data;
            console.log("guardado");
          },
          (error)=>{
            console.log("error: ", error);
          }
        );

      }
      else{
        console.log("cancel");
      }
    });
  }

}
