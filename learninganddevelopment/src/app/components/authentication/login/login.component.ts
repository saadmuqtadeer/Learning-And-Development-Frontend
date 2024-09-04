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
      Email:['',Validators.required],
      Password:['',Validators.required],
    })
  }
  logIn() {
    const loginData = this.loginForm.value;
    this.loginService.login(loginData.Email, loginData.Password).subscribe(
      response => {
        console.log('POST request successful:', response);
      },
      error => {
        console.error('Error occurred during POST request:', error);
      }
    );
  }

}
