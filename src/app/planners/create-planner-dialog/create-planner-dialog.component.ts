import { Component } from '@angular/core';
import { MatDialogRef} from '@angular/material/dialog';
import {DailyMenu} from "../../shared/model/dailyMenu.model";
import {PlannerService} from "../planner.service";
import {Router} from "@angular/router";
import {DailymenuService} from "../../dailymenus/dailymenu.service";
import {MatListOption} from "@angular/material/list";
import {Planner} from "../../shared/model/planner.model";

@Component({
  selector: 'app-create-planner-dialog',
  templateUrl: './create-planner-dialog.component.html',
  styleUrls: ['./create-planner-dialog.component.css',
    './../../shared/shared-styles.css']
})

export class CreatePlannerDialogComponent {
  name: string = '';
  description: string = '';
  dailyMenuList: DailyMenu[] = [];

  constructor(
    public dialogRef: MatDialogRef<CreatePlannerDialogComponent>,
    private plannerService: PlannerService,
    private router: Router,
    private dailyMenuService: DailymenuService) {
    this.getDailyMenus("1");
  }

  getDailyMenus(id:string){
    this.dailyMenuService.getDailyMenuByUserId("1").subscribe(
      (data: DailyMenu[])=>{
        this.dailyMenuList = data;
      }
    );
  }

  createDailyMenu(selectedMeals: MatListOption[]) {
    const selectedItems
      = selectedMeals
      .map((option: any) => option.value as DailyMenu);
    let newPlanner: Planner = {
      id: "0",
      userId: "1",
      description: this.description,
      name: this.name,
      dailyMenus: selectedItems
    }
    this.plannerService.create(newPlanner).subscribe(
      (planner: Planner)=>{
        this.router.navigate(['planner'], {state: {planner}});
        this.dialogRef.close();
      }
    );
  }
}
