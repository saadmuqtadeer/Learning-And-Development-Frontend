import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms'
import { Router } from '@angular/router';
import { AuthService } from '../../../services/authentication/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm:FormGroup;
  constructor(private fb:FormBuilder, private loginService:AuthService, private router:Router){
    this.loginForm=this.fb.group({
      Email:['',Validators.required],
      Password:['',Validators.required],
    })
  }
  logIn() {
    const loginData = this.loginForm.value;
    this.loginService.login(loginData.Email, loginData.Password).subscribe({
      next: (response) => {
        console.log('POST request successful:', response);
        this.router.navigate(['dashboard-admin']);
      },
      error: (err) => {
        console.error('Error occurred during POST request:', err);
      }
    });
  }

}
