import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'
import { AppRoutingModule } from './app-routing.module';
import { LoginComponent } from './component/login/login.component';
import { RegisterComponent } from './component/register/register.component';
import { FarmComponent } from './component/farm/farm.component';
import { PlotComponent } from './component/plot/plot.component';
import { LoginApi } from './api/login.api';
import { RegisterApi } from './api/register.api';
import { FarmApi } from './api/farm.api';
import { PlotApi } from './api/plot.api';
import { PlantApi } from './api/plant.api';

@NgModule({
  declarations: [
    AppComponent
    ,LoginComponent
    ,RegisterComponent
    ,FarmComponent
    ,PlotComponent
  ],
  imports: [
    BrowserModule
    ,FormsModule
    ,AppRoutingModule
    ,ReactiveFormsModule
    ,HttpClientModule
  ],
  providers: [
    LoginApi
    ,RegisterApi
    ,FarmApi
    ,PlotApi
    ,PlantApi
  ],
  bootstrap: [
    AppComponent
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class AppModule {}
