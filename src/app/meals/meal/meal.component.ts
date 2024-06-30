import {Component, DestroyRef} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {ConfirmationDialogComponent} from "../../shared/confirmation-dialog/confirmation-dialog.component";
import {AddIngredientDialogComponent} from "./add-ingredient-dialog/add-ingredient-dialog.component";
import {Meal} from "../../shared/model/meal.model";
import {Router} from "@angular/router";
import {MealService} from "../meal.service";

@Component({
  selector: 'app-meal',
  templateUrl: './meal.component.html',
  styleUrls: ['./meal.component.css', '../../shared/shared-styles.css']
})
export class MealComponent {
  meal!: Meal;
  editable: boolean = false;
  categories: string[] = ['APPETIZER', 'SOUP', 'SALAD', 'MAIN', 'DESSERT', 'DRINK'];

  constructor(private dialog: MatDialog, private router: Router, private mealService: MealService) {
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras?.state?.['meal']) {
      this.meal = navigation.extras.state['meal'];
      this.getMeal(this.meal.id);
      console.log("meal: ", this.meal);
    } else {
      console.log("no meal :C");
    }
  }

  getMeal(id:string){
    this.mealService.getMeal(id).subscribe(
      (data:Meal)=>{
        this.meal = data;
      },
      (error) =>{
        console.log("error",error);
    }
    );
  }

  delete(id: string){
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
        this.mealService.delete(this.meal.id).subscribe(
          ()=>{
            this.router.navigate(['meals']);
          }
        );

        console.log("confirm");
      }
      else{
        console.log("cancel");
      }
    });
  }

  save(){
    const dialogRef =
      this.dialog.open(ConfirmationDialogComponent,
        {
          data: {
            title: 'Save Meal',
            message: 'Are you sure you want to save the meal?'
          }
        });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        console.log("confirm");
        this.mealService.update(this.meal.id, this.meal).subscribe(
          (data: Meal)=>{
            this.meal = data;
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

  removeIngredient(id: string){
    const dialogRef =
      this.dialog.open(ConfirmationDialogComponent,
        {
          data: {
            title: 'Remove Meal',
            message: 'Are you sure you want to remove this ingredient?'
          }
        });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.meal.ingredients = this.meal.ingredients.filter(p => p.id !== id);
        console.log("remove ingredient");
        console.log("nuevos ingredientes", this.meal.ingredients)
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
    const dialogRef = this.dialog.open(AddIngredientDialogComponent,
      {data:this.meal});

    dialogRef.afterClosed().subscribe(
      ()=>{
        this.getMeal(this.meal.id);
      }
    );
  }
}
