import { Component } from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {ConfirmationDialogComponent} from "../../shared/confirmation-dialog/confirmation-dialog.component";
import {AddIngredientDialogComponent} from "./add-ingredient-dialog/add-ingredient-dialog.component";

@Component({
  selector: 'app-meal',
  templateUrl: './meal.component.html',
  styleUrls: ['./meal.component.css']
})
export class MealComponent {
  editable: boolean = false;
  category: string = 'MAIN';
  categories: string[] = ['APPETIZER', 'SOUP', 'SALAD', 'MAIN', 'DESSERT', 'DRINK'];

  constructor(private dialog: MatDialog) {
  }

  delete(){
    const dialogRef =
      this.dialog.open(ConfirmationDialogComponent,
        {
          data: {
            title: 'Delete Meal',
            message: 'Are you sure you want to delete this meal?'
          }
        });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        console.log("confirm");
      }
      else{
        console.log("cancel");
      }
    });
  }

  removeIngredient(){
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

  addIngredient() {
    console.log("hola");
    this.dialog.open(AddIngredientDialogComponent);
  }
}
