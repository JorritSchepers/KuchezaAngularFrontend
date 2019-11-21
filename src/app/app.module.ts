import { BrowserModule } from '@angular/platform-browser';
import { NgModule} from '@angular/core';

import { AppComponent } from './app.component';
import { LoginApi } from './api/login.api';

import { LoginComponent } from './component/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [
    AppComponent  
    ,LoginComponent
  ],
  imports: [
    BrowserModule
    ,FormsModule
    ,ReactiveFormsModule
    ,HttpClientModule
    ,AppRoutingModule
  ],
  providers: [
    LoginApi
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
