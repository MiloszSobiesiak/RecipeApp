import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuard } from './auth/services/auth.guard';
import { SuppliesComponent } from './supplies/supplies.component';
import { RecepiesComponent } from './recepies/recepies.component';
import { WeekPlanComponent } from './week-plan/week-plan.component';
import { ShopListComponent } from './shop-list/shop-list.component';

const routes: Routes = [
  {path: '', redirectTo:'login', pathMatch:'full'},
  {path: 'login', component : LoginComponent},
  {path: 'register', component : RegisterComponent},
  {path: 'dashboard', component : DashboardComponent, canActivate:[AuthGuard],
  children:[
    {path: 'supplies', component : SuppliesComponent},
    {path: 'recipes', component : RecepiesComponent},
    {path: 'weekplan', component : WeekPlanComponent},
    {path: 'shoplist', component : ShopListComponent},
  ]
},
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
