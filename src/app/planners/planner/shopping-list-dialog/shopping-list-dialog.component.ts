import {Component, Inject} from '@angular/core';
import {PlannerService} from "../../planner.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {ShoppingItem} from "../../../shared/model/shoppingItem.model";
import {Planner} from "../../../shared/model/planner.model";

@Component({
  selector: 'app-shopping-list-dialog',
  templateUrl: './shopping-list-dialog.component.html',
  styleUrls: ['./shopping-list-dialog.component.css',
    './../../../shared/shared-styles.css']
})
export class ShoppingListDialogComponent {
  shoppingList: ShoppingItem[] = [];
  planner!: Planner;

  constructor(private plannerService: PlannerService,
              private dialogRef: MatDialogRef<ShoppingListDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: Planner) {
    console.log("data: ", data);
    this.planner = data;
    this.getShoppingListByPlannerId(this.planner.id);
  }

  getShoppingListByPlannerId(id: string){
    this.plannerService.getShoppingListByPlannerId(id).subscribe(
      (data: ShoppingItem[])=>{
        this.shoppingList = data;
    },
      (error)=>{
        console.log("error: ", error);
      }
    );
  }

}
