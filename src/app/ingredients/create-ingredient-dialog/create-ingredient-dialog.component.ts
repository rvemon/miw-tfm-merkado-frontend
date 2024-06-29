import { Component } from '@angular/core';

@Component({
  selector: 'app-create-ingredient-dialog',
  templateUrl: './create-ingredient-dialog.component.html',
  styleUrls: ['./create-ingredient-dialog.component.css',
    './../../shared/shared-styles.css']
})
export class CreateIngredientDialogComponent {
  ingredientTypes: string[] = ['LIQUID', 'DAIRY', 'VEGETABLE', 'FRUIT', 'POWDER'];
  ingredientType: string = '';

  ingredientUnits: string[] = ['GRAM', 'MILLILITER', 'TABLESPOON', 'TEASPOON', 'CUP'];
  ingredientUnit: string = '';
  name: string = '';

  createDailyMenu() {

  }
}
