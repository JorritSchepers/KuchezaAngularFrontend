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
import { LogoutApi } from './api/logout.api';
import { LogoutComponent } from './component/logout/logout.component';

@NgModule({
  declarations: [
    AppComponent
    ,LoginComponent
    ,RegisterComponent
    ,LogoutComponent
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
    ,LogoutApi
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule {}
