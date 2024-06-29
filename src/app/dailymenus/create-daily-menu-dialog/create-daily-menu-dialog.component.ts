import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

export interface Item {
  id: number;
  name: string;
}
export interface DialogData {
  items: Item[];
}

@Component({
  selector: 'app-create-daily-menu-dialog',
  templateUrl: './create-daily-menu-dialog.component.html',
  styleUrls: ['./create-daily-menu-dialog.component.css',
    './../../shared/shared-styles.css']
})
export class CreateDailyMenuDialogComponent {
  name: string = '';
  day: string = '';
  days: string[] = ['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY']
  openDailyMenus: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<CreateDailyMenuDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {
  }

  createDailyMenu(selectedOptions: any) {
    const selectedItems = selectedOptions.map((option: any) => option.value);

    //una vez tengo esto puedo crear el Planner
    this.dialogRef.close(selectedItems);
  }

}
