import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

export interface Item {
  id: number;
  name: string;
  quantity: number;
}
export interface DialogData {
  items: Item[];
}

interface Option {
  name: string;
  quantity: number;
}

@Component({
  selector: 'app-create-meal-dialog',
  templateUrl: './create-meal-dialog.component.html',
  styleUrls: ['./create-meal-dialog.component.css',
    './../../shared/shared-styles.css']
})
export class CreateMealDialogComponent {
  name: string = '';
  category: string = '';
  categories: string[] = ['APPETIZER', 'SOUP', 'SALAD', 'MAIN', 'DESSERT', 'DRINK'];
  openMeals: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<CreateMealDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {
  }

  createMeal(selectedOptions: any) {
    const selectedItems = selectedOptions.map((option: any) => option.value);

    //una vez tengo esto puedo crear el Planner
    this.dialogRef.close(selectedItems);
  }

}
