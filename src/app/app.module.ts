import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'
import { AppRoutingModule } from './app-routing.module';
import { LoginComponent } from './component/login/login.component';
import { LoginApi } from './api/login.api';
import { RegisterApi } from './api/register.api';
import { RegisterComponent } from './component/register/register.component';
import { FarmComponent } from './component/farm/farm.component';
import { FarmApi } from './api/farm.api';

@NgModule({
  declarations: [
    AppComponent
    ,LoginComponent
    ,RegisterComponent
    ,FarmComponent
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
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule {}