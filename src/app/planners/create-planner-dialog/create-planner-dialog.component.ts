import { Component, Inject } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

export interface Item {
  id: number;
  name: string;
}
export interface DialogData {
  items: Item[];
}

@Component({
  selector: 'app-create-planner-dialog',
  templateUrl: './create-planner-dialog.component.html',
  styleUrls: ['./create-planner-dialog.component.css',
    './../../shared/shared-styles.css']
})

export class CreatePlannerDialogComponent {
  name: string = '';
  description: string = '';
  openDailyMenus: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<CreatePlannerDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {
  }

  createPlanner(selectedOptions: any) {
    const selectedItems = selectedOptions.map((option: any) => option.value);

    //una vez tengo esto puedo crear el Planner
    this.dialogRef.close(selectedItems);
  }

  protected readonly close = close;
}
