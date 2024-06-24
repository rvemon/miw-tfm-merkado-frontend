import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import {MatDialog} from "@angular/material/dialog";
import {CreatePlannerDialogComponent, DialogData, Item} from "./create-planner-dialog/create-planner-dialog.component";



@Component({
  selector: 'app-planners',
  templateUrl: './planners.component.html',
  styleUrls: ['./planners.component.css'],
})
export class PlannersComponent {
  selectedItems: Item[] = [];
  private dialog = inject(MatDialog);

  constructor(private router: Router) {
  }

  openPlanner() {
    this.router.navigate(['planner']);
  }

  openCreateDialog(){
    const dialogRef =
      this.dialog.open(CreatePlannerDialogComponent,
        {data: {items: this.getItems(), name: '', description: ''}
        });

    dialogRef.afterClosed().subscribe((result: Item[] | undefined) => {
      if (result) {
        this.selectedItems = result;
      }
    });
  }

  getItems(): Item[] {
    return [
      { id: 1, name: 'Item 1' },
      { id: 2, name: 'Item 2' },
      { id: 3, name: 'Item 3' },
      // Agrega más elementos según sea necesario
    ];
  }
}
