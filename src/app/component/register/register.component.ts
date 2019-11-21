import { Component, Directive, Injectable } from '@angular/core';
import { ExpressionStatement } from '@angular/compiler';
import { RegisterApi } from "src/app/api/register.api";
import { FormBuilder } from '@angular/forms';
import { UserModel } from 'src/app/model/user.model';
import { RegisterResponse } from "src/app/model/register-response.model";

@Component({
  selector: 'app-page',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  title = 'Register';
  name: String;
  email: String;
  password: String;
  repeatPassword: String;
  registerForm;

  constructor(private formBuilder: FormBuilder, private registerApi: RegisterApi) {
    this.registerForm = this.formBuilder.group({
      name: '',
      email: '',
      password: '',
      repeatPassword: ''
    });
  }

  onSubmit(registerData) {
    let response = this.registerApi.query(new UserModel(-1, registerData.name, registerData.password, registerData.email));
    this.registerForm.reset();
  }
}
