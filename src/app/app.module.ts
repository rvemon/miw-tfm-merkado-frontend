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
import { PreferencesComponent } from './preferences/preferences.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { GameComponent } from './game/game.component';
import { RecordsComponent } from './records/records.component';
import { MissileComponent } from './missile/missile.component';
import { UfoComponent } from './ufo/ufo.component';
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

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PreferencesComponent,
    LoginComponent,
    RegisterComponent,
    GameComponent,
    RecordsComponent,
    MissileComponent,
    UfoComponent,
    PlannersComponent,
    DailymenusComponent,
    MealsComponent,
    IngredientsComponent,
    PlannerComponent
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
    CdkVirtualScrollViewport
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
