import {Component, inject} from '@angular/core';
import {Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {CreateDailyMenuDialogComponent, Item} from "./create-daily-menu-dialog/create-daily-menu-dialog.component";
import {DailyMenu} from "../shared/model/dailyMenu.model";
import {DailymenuService} from "./dailymenu.service";

@Component({
  selector: 'app-dailymenus',
  templateUrl: './dailymenus.component.html',
  styleUrls: ['./dailymenus.component.css']
})
export class DailymenusComponent {
  selectedItems: Item[] = [];
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

  getItems(): Item[] {
    return [
      { id: 1, name: 'Item 1' },
      { id: 2, name: 'Item 2' },
      { id: 3, name: 'Item 3' },
      // Agrega más elementos según sea necesario
    ];
  }
}
