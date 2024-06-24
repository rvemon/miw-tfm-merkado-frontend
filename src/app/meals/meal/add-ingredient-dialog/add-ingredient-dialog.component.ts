import { Component } from '@angular/core';

@Component({
  selector: 'app-add-ingredient-dialog',
  templateUrl: './add-ingredient-dialog.component.html',
  styleUrls: ['./add-ingredient-dialog.component.css']
})
export class AddIngredientDialogComponent {
  quantity: number = 0;
  ingredient: string = '';
  ingredients: string[] = ['Ingredient 1', 'Ingredient 2', 'Ingredient 3', 'Ingredient 4'];

}
