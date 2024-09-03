import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms'
import { LoginService } from '../../../services/authentication/login/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm:FormGroup;
  constructor(private fb:FormBuilder, private loginService:LoginService){
    this.loginForm=this.fb.group({
      id:['',Validators.required],
      password:['',Validators.required],
    })
  }
  onSubmit() {
    const loginData = this.loginForm.value;
    const isLoginSuccessful = this.loginService.login(loginData.id, loginData.password);

    // if (isLoginSuccessful) {
    //   // Redirect to the dashboard or home page
    // } else {
    //   // Show an error message to the user
    // }
  }

}
