import {Component, inject} from '@angular/core';
import { Router } from '@angular/router';
import {MatDialog} from "@angular/material/dialog";
import {CreateIngredientDialogComponent} from "./create-ingredient-dialog/create-ingredient-dialog.component";

@Component({
  selector: 'app-ingredients',
  templateUrl: './ingredients.component.html',
  styleUrls: ['./ingredients.component.css']
})
export class IngredientsComponent {
  private dialog = inject(MatDialog);
  editable: boolean = false;
  ingredientTypes: string[] = ['LIQUID', 'DAIRY', 'VEGETABLE', 'FRUIT', 'POWDER'];
  ingredientType: string = '';
  ingredientType2: string = '';
  ingredientUnits: string[] = ['GRAM', 'MILLILITER', 'TABLESPOON', 'TEASPOON', 'CUP'];
  ingredientUnit: string = '';
  ingredientUnit2: string = '';


  constructor(private router: Router) {
  }

  openCreateDialog(){
    const dialogRef =
      this.dialog.open(CreateIngredientDialogComponent);

  }

  delete() {

  }

  edit() {
    this.editable= !this.editable;
  }
}
