import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PreferencesComponent } from './preferences/preferences.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { GameComponent } from './game/game.component';
import { RecordsComponent } from './records/records.component';
import { PlannersComponent } from './planners/planners.component';
import { DailymenusComponent } from './dailymenus/dailymenus.component';
import { MealsComponent } from './meals/meals.component';
import { IngredientsComponent } from './ingredients/ingredients.component';
import { PlannerComponent } from './planners/planner/planner.component';


const routes: Routes = [
    {path: 'home', component: HomeComponent},
    {path: 'prefs', component: PreferencesComponent},
    {path: 'login', component: LoginComponent},
    {path: 'register', component: RegisterComponent},
    {path: 'game', component: GameComponent},
    {path: 'records', component: RecordsComponent},
    {path: 'planners', component: PlannersComponent},
    {path: 'planner', component: PlannerComponent},
    {path: 'dailymenus', component: DailymenusComponent},
    {path: 'meals', component: MealsComponent},
    {path: 'ingredients', component: IngredientsComponent},
    {path: '', redirectTo: '/home', pathMatch: 'full'},
    {path: '**', redirectTo: '/home', pathMatch: 'full'}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule{}
