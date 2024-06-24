import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import {FormsModule} from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule} from "ngx-toastr";


import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { PlannersComponent } from './planners/planners.component';
import { DailymenusComponent } from './dailymenus/dailymenus.component';
import { MealsComponent } from './meals/meals.component';
import { IngredientsComponent } from './ingredients/ingredients.component';
import {MatListModule} from "@angular/material/list";
import {MatIconModule} from "@angular/material/icon";
import {MatGridListModule} from "@angular/material/grid-list";
import {MatToolbarModule} from "@angular/material/toolbar";
import {CdkVirtualScrollViewport} from "@angular/cdk/scrolling";
import { PlannerComponent } from './planners/planner/planner.component';
import { CreatePlannerDialogComponent } from './planners/create-planner-dialog/create-planner-dialog.component';
import {MatDialogModule} from "@angular/material/dialog";
import {MatInputModule} from "@angular/material/input";
import { ConfirmationDialogComponent } from './shared/confirmation-dialog/confirmation-dialog.component';
import { CreateDailyMenuDialogComponent } from './dailymenus/create-daily-menu-dialog/create-daily-menu-dialog.component';
import { CreateMealDialogComponent } from './meals/create-meal-dialog/create-meal-dialog.component';
import {MatSelectModule} from "@angular/material/select";
import { MealComponent } from './meals/meal/meal.component';
import { DailymenuComponent } from './dailymenus/dailymenu/dailymenu.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    PlannersComponent,
    DailymenusComponent,
    MealsComponent,
    IngredientsComponent,
    PlannerComponent,
    CreatePlannerDialogComponent,
    ConfirmationDialogComponent,
    CreateDailyMenuDialogComponent,
    CreateMealDialogComponent,
    MealComponent,
    DailymenuComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ToastrModule.forRoot({
      'timeOut': 5000,
      'closeButton': true,
      'tapToDismiss': true,
      'countDuplicates': true,
      'positionClass': 'toast-top-right'
    }),
    MatListModule,
    MatIconModule,
    MatGridListModule,
    MatToolbarModule,
    CdkVirtualScrollViewport,
    MatDialogModule,
    MatInputModule,
    MatSelectModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
