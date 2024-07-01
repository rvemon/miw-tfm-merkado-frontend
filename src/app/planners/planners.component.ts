import {Component, inject, OnInit} from '@angular/core';
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
export class PlannersComponent implements OnInit{
  planners: Planner[] = [];
  userId: string = '1';
  private dialog = inject(MatDialog);

  constructor(private router: Router, private plannerService: PlannerService) {
  }

  ngOnInit(){
    if(sessionStorage.getItem('id')!=null){
      this.userId = sessionStorage.getItem('id') as string;
      console.log("userId", this.userId);
      this.getPlannersByUserId(this.userId);
    }
    else{
      this.router.navigate(['login']);
    }

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
