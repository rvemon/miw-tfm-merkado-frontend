import {Component} from '@angular/core';
import {Ingredient} from "../../shared/model/ingredient.model";
import {IngredientService} from "../ingredient.service";
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-create-ingredient-dialog',
  templateUrl: './create-ingredient-dialog.component.html',
  styleUrls: ['./create-ingredient-dialog.component.css',
    './../../shared/shared-styles.css']
})
export class CreateIngredientDialogComponent{
  newIngredient: Ingredient;
  ingredientTypes: string[] = ['LIQUID', 'DAIRY', 'VEGETABLE', 'FRUIT', 'POWDER'];

  ingredientUnits: string[] = ['GRAM', 'MILLILITER', 'TABLESPOON', 'TEASPOON', 'CUP'];
  userId: string = '1';
  constructor(
    private dialogRef: MatDialogRef<CreateIngredientDialogComponent>,
    private ingredientService: IngredientService
  ) {
    this.userId = sessionStorage.getItem('id') as string;
    this.newIngredient = {
      id: '',
      userId: this.userId,
      name: '',
      ingredientType: '',
      measurement: ''
    };
  }


  createIngredient() {
    this.ingredientService.create(this.newIngredient)
      .subscribe(
        (data: Ingredient)=>{
          console.log("created");
        },
        (error)=>{
          console.log("error", error);

        }
      );
    this.dialogRef.close();
  }
}
