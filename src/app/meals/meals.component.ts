import {Component, inject, Inject} from '@angular/core';
import {Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {CreateMealDialogComponent, Item, DialogData} from "./create-meal-dialog/create-meal-dialog.component";

@Component({
  selector: 'app-meals',
  templateUrl: './meals.component.html',
  styleUrls: ['./meals.component.css']
})
export class MealsComponent {
  selectedItems: Item[] = [];
  private dialog = inject(MatDialog);

  constructor(private router: Router) {
  }

  openCreateDialog() {
    const dialogRef =
      this.dialog.open(CreateMealDialogComponent,
        {data: {items: this.getItems(), name: '', day: ''}
        });

    dialogRef.afterClosed().subscribe((result: Item[] | undefined) => {
      if (result) {
        this.selectedItems = result;
      }
    });
  }


  openMeal() {
    this.router.navigate(['meal']);
  }

  getItems(): Item[] {
    return [
      { id: 1, name: 'Item 1', quantity:0 },
      { id: 2, name: 'Item 2', quantity: 0 },
      { id: 3, name: 'Item 3', quantity: 0 },
      // Agrega más elementos según sea necesario
    ];
  }

}
