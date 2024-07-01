import {Component, Inject} from '@angular/core';
import {DailyMenu} from "../../../shared/model/dailyMenu.model";
import {Router} from "@angular/router";
import {DailymenuService} from "../../../dailymenus/dailymenu.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Planner} from "../../../shared/model/planner.model";
import {PlannerService} from "../../planner.service";

@Component({
  selector: 'app-add-daily-menu-dialog',
  templateUrl: './add-daily-menu-dialog.component.html',
  styleUrls: ['./add-daily-menu-dialog.component.css', './../../../shared/shared-styles.css']
})
export class AddDailyMenuDialogComponent {
  planner!: Planner;
  dailyMenus!:DailyMenu[];
  dailyMenu: DailyMenu | undefined;

  constructor(
    private plannerService: PlannerService,
    private router: Router,
    private dailyMenuService: DailymenuService,
    private dialogRef: MatDialogRef<AddDailyMenuDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Planner
  ) {
    console.log("data:",data);
    this.planner = data;
    this.getDailyMenus(this.planner.userId);
  }

  getDailyMenus(id: string){
    this.dailyMenuService.getDailyMenuByUserId(id).subscribe(
      (data: DailyMenu[])=>{
        this.dailyMenus = data;
      },
      (error)=>{
        console.log("error: ",error);
      }
    );
  }

  addDailyMenu(){
    if (this.dailyMenu) {
      this.planner.dailyMenus.push(this.dailyMenu);
      this.plannerService.update(this.planner.id, this.planner).subscribe(
        ()=>{
        },
        (error)=>{
          console.log("error", error);
        }
      );
    }
    this.dialogRef.close();

  }



}
