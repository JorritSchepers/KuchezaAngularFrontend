import { Component } from '@angular/core';
import { RegisterApi } from "src/app/api/register.api";
import { FormBuilder } from '@angular/forms';
import { RegisterModel } from 'src/app/model/register.model';
import { UserModel } from 'src/app/model/user.model';

@Component({
  selector: 'app-register',
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

  registerUser(registerModel: RegisterModel) {
    if(registerModel.password == registerModel.repeatPassword) {
      this.registerApi.query(new UserModel(-1, registerModel.name, registerModel.password, registerModel.email));
      this.registerForm.reset();
    } else {
      console.warn("The two passwords are not equal!");
    }
  }
}
