import { BrowserModule } from '@angular/platform-browser';
import { NgModule} from '@angular/core';

import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { LoginApi } from './api/login.api';

@NgModule({
  declarations: [
    AppComponent  
  ],
  imports: [
    BrowserModule
    ,FormsModule
    ,ReactiveFormsModule
    ,HttpClientModule
  ],
  providers: [
    LoginApi
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
