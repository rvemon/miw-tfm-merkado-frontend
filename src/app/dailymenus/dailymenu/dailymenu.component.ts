import { Component } from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {ConfirmationDialogComponent} from "../../shared/confirmation-dialog/confirmation-dialog.component";

@Component({
  selector: 'app-dailymenu',
  templateUrl: './dailymenu.component.html',
  styleUrls: ['./dailymenu.component.css']
})
export class DailymenuComponent {
  editable: boolean = false;
  days: string[] = ['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY']
  day: string = 'MONDAY'

  constructor(private dialog: MatDialog) {
  }

  delete(){
    const dialogRef =
      this.dialog.open(ConfirmationDialogComponent,
        {
          data: {
            title: 'Delete Daily Menu',
            message: 'Are you sure you want to delete this daily menu?'
          }
        });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        console.log("confirm");
      }
      else{
        console.log("cancel");
      }
    });
  }

  removeMeal(){
    const dialogRef =
      this.dialog.open(ConfirmationDialogComponent,
        {
          data: {
            title: 'Remove Meal',
            message: 'Are you sure you want to remove this meal?'
          }
        });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        console.log("remover meal");
      }
      else{
        console.log("cancel");
      }
    });
  }

  edit() {
    this.editable= !this.editable;
  }

}
