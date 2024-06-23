import { Component } from '@angular/core';
import { Router } from '@angular/router';



@Component({
  selector: 'app-planners',
  templateUrl: './planners.component.html',
  styleUrls: ['./planners.component.css'],
})
export class PlannersComponent {

  constructor(private router: Router) {
  }

  openPlanner() {
    this.router.navigate(['planner']);
  }
}
