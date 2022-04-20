import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { AngularFireModule } from '@angular/fire/compat';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SuppliesComponent } from './supplies/supplies.component';
import { RecepiesComponent } from './recepies/recepies.component'
import { HttpClientModule } from '@angular/common/http';
import { WeekPlanComponent } from './week-plan/week-plan.component';
import { ShopListComponent } from './shop-list/shop-list.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    DashboardComponent,
    SuppliesComponent,
    RecepiesComponent,
    WeekPlanComponent,
    ShopListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
