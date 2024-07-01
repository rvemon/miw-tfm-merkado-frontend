import {Component, inject} from '@angular/core';
import {Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {CreateDailyMenuDialogComponent} from "./create-daily-menu-dialog/create-daily-menu-dialog.component";
import {DailyMenu} from "../shared/model/dailyMenu.model";
import {DailymenuService} from "./dailymenu.service";

@Component({
  selector: 'app-dailymenus',
  templateUrl: './dailymenus.component.html',
  styleUrls: ['./dailymenus.component.css']
})
export class DailymenusComponent {
  private dialog = inject(MatDialog);

  dailyMenus: DailyMenu[] = [];


  constructor(private router: Router, private dailyMenuService: DailymenuService) {
  }

  ngOnInit(){
    this.getDailyMenusByUserId("1");
  }

  getDailyMenusByUserId(id:string){
    //TODO login user
    this.dailyMenuService.getDailyMenuByUserId(id).subscribe(
      (data: DailyMenu[])=>{
        this.dailyMenus = data;
        console.log("dailyMenusobtained", this.dailyMenus);
      },
      (error)=>{
        console.log("error");
      }
    );
  }

  openDailyMenu(dailyMenu: DailyMenu) {
    this.router.navigate(['dailymenu'], {state: {dailyMenu}});
  }

  openCreateDialog() {
    const dialogRef =
      this.dialog.open(CreateDailyMenuDialogComponent);
  }
}
