  import { Component } from '@angular/core';
  import { Router } from '@angular/router';
  import { RegisterApi } from "src/app/api/register.api";
  import { FormBuilder } from '@angular/forms';
  import { RegisterModel } from 'src/app/model/register.model';
  import { UserModel } from 'src/app/model/user.model';
  import { TokenModel } from 'src/app/model/token.model';
  import { RegisterResponse } from 'src/app/model/register-response.model';

  @Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
  })
  export class RegisterComponent {
    title: string = 'Register';
    name: string;
    email: string;
    password: string;
    repeatPassword: string;
    registerForm: any;

    constructor(private formBuilder: FormBuilder, private registerApi: RegisterApi, private router: Router) {
      this.registerForm = this.formBuilder.group({
        name: '',
        email: '',
        password: '',
        repeatPassword: ''
      });
    }

    registerUser(registerModel: RegisterModel): void {
      if(registerModel.password == registerModel.repeatPassword) {
        this.registerApi.registerUser(new UserModel(-1, registerModel.name, registerModel.password, registerModel.email)).then(response => this.handleRegisterResponse(response))
          .catch(any => this.handleRegisterException(any));
        this.registerForm.reset();
      } else {
        console.warn("The two passwords are not equal!");
      }
    }

    private handleRegisterResponse(response: RegisterResponse): void {
      TokenModel.setCurrentToken(response.token);
      this.router.navigateByUrl('/farm');
    }

    private handleRegisterException(exception: any): void {
      console.warn("Exception:", exception);
    }
  }
