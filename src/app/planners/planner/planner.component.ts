import { Component } from '@angular/core';
import {ConfirmationDialogComponent} from "../../shared/confirmation-dialog/confirmation-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {Router} from "@angular/router";
import {Planner} from "../../shared/model/planner.model";
import {DailyMenu} from "../../shared/model/dailyMenu.model";
import {AddDailyMenuDialogComponent} from "./add-daily-menu-dialog/add-daily-menu-dialog.component";
import {PlannerService} from "../planner.service";
import {AddMealDialogComponent} from "../../dailymenus/dailymenu/add-meal-dialog/add-meal-dialog.component";
import {ShoppingListDialogComponent} from "./shopping-list-dialog/shopping-list-dialog.component";

@Component({
  selector: 'app-planner',
  templateUrl: './planner.component.html',
  styleUrls: ['./planner.component.css']
})
export class PlannerComponent {

  editable: boolean = false;
  shoppingList: boolean = false;
  planner!: Planner;
  dailyMenuList: DailyMenu[] = [];

  constructor(
    private dialog: MatDialog,
    private router: Router,
    private plannerService: PlannerService) {
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras?.state?.['planner']) {
      this.planner = navigation.extras.state['planner'];
      this.getPlanner(this.planner.id);
      console.log("meal: ", this.planner);
    } else {
      console.log("no meal");
    }
  }

  getPlanner(id: string){
    this.plannerService.getPlanner(id).subscribe(
      (data:Planner)=>{
        this.planner = data;
      },
      (error) =>{
        console.log("error",error);
      }
    );
  }

  delete(id:string){
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
        this.plannerService.delete(this.planner.id).subscribe(
          ()=>{
            this.router.navigate(['planners']);
          }
        );
        console.log("deleted");
      }
      else{
        console.log("cancel");
      }
    });
  }

  removeDailyMenu(id: string){
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
        //TODO remove planner
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

  addDailyMenu() {
    const dialogRef = this.dialog.open(AddDailyMenuDialogComponent,
      {data:this.planner});

    dialogRef.afterClosed().subscribe(
      ()=>{
        this.getPlanner(this.planner.id);
      }
    );
  }

  save(){
    const dialogRef =
      this.dialog.open(ConfirmationDialogComponent,
        {
          data: {
            title: 'Save Planner',
            message: 'Are you sure you want to save the Planner?'
          }
        });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        console.log("confirm");
        this.plannerService.update(this.planner.id, this.planner).subscribe(
          (data: Planner)=>{
            this.planner = data;
            console.log("guardado");
          },
          (error)=>{
            console.log("error: ", error);
          }
        );

      }
      else{
        console.log("cancel");
      }
    });
  }

  openShoppingList(){
    this.dialog.open(ShoppingListDialogComponent, {data:this.planner});
  }
}
