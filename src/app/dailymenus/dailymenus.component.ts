import {Component, inject} from '@angular/core';
import {Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {CreateDailyMenuDialogComponent, Item} from "./create-daily-menu-dialog/create-daily-menu-dialog.component";


@Component({
  selector: 'app-dailymenus',
  templateUrl: './dailymenus.component.html',
  styleUrls: ['./dailymenus.component.css']
})
export class DailymenusComponent {
  selectedItems: Item[] = [];
  private dialog = inject(MatDialog);

  constructor(private router: Router) {
  }

  openDailyMenu() {
    console.log("hola");
    this.router.navigate(['dailymenu']);
  }

  openCreateDialog() {
    const dialogRef =
      this.dialog.open(CreateDailyMenuDialogComponent,
        {data: {items: this.getItems(), name: '', day: ''}
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
