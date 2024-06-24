import { Component } from '@angular/core';
import {ConfirmationDialogComponent} from "../../shared/confirmation-dialog/confirmation-dialog.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-planner',
  templateUrl: './planner.component.html',
  styleUrls: ['./planner.component.css']
})
export class PlannerComponent {

  editable: boolean = false;
  shoppingList: boolean = false;

  constructor(private dialog: MatDialog) {
  }

  delete(){
    const dialogRef =
      this.dialog.open(ConfirmationDialogComponent,
        {
          data: {
            title: 'Delete Planner',
            message: 'Are you sure you want to delete this planner?'
          }
        });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        console.log("confirmado");
      }
      else{
        console.log("cancelado");
      }
    });
  }
  removeDailyMenu(){
    const dialogRef =
      this.dialog.open(ConfirmationDialogComponent,
        {
          data: {
            title: 'Remove DailyMenu',
            message: 'Are you sure you want to remove this daily menu?'
          }
        });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        console.log("remover daily menu");
      }
      else{
        console.log("cancelar");
      }
    });
  }

  edit() {
    this.editable= !this.editable;
  }
}
