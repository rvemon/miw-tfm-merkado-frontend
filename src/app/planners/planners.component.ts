import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import {MatDialog} from "@angular/material/dialog";
import {CreatePlannerDialogComponent} from "./create-planner-dialog/create-planner-dialog.component";
import {PlannerService} from "./planner.service";
import {Planner} from "../shared/model/planner.model";

@Component({
  selector: 'app-planners',
  templateUrl: './planners.component.html',
  styleUrls: ['./planners.component.css'],
})
export class PlannersComponent {
  planners: Planner[] = [];
  private dialog = inject(MatDialog);

  constructor(private router: Router, private plannerService: PlannerService) {
  }

  ngOnInit(){
    this.getPlannersByUserId("1");
  }

  getPlannersByUserId(id:string){
    //TODO login user
    this.plannerService.getPlannersByUserId(id).subscribe(
      (data: Planner[])=>{
        this.planners = data;
        console.log("planners obtained", this.planners);
      },
      (error)=>{
        console.log("error");
      }
    );
  }

  openPlanner(planner: Planner) {
    this.router.navigate(['planner'], {state: {planner}});
  }

  openCreateDialog() {
    const dialogRef =
      this.dialog.open(CreatePlannerDialogComponent);
  }

}
