import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/authentication/auth.service';
// import { NgToastService } from 'ng-toast';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
}) 

export class LoginComponent  {
  loginForm: FormGroup;

  constructor(
    private auth: AuthService,
    private fb: FormBuilder,
    private loginService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      Email: ['', [Validators.required, Validators.email]],
      Password: ['', [Validators.required]]
    });
  }
  validateControl(input:string){
    return  this.loginForm.get(input)?.invalid && 
    ((this.loginForm.get(input)?.touched) ||
    (this.loginForm.get(input)?.dirty))
  }
  validateControlError(input:string,errorType:string){
    return this.loginForm.get(input)?.hasError(errorType) &&
   ((this.loginForm.get(input)?.touched) ||
    (this.loginForm.get(input)?.dirty));
  }

  // ngOnInit() {}

  logIn() {
    if (this.loginForm.invalid) {
      // Handle form errors (e.g., show a message)
      console.error('Form is invalid');
      return;
    }

    const loginData = this.loginForm.value;
    this.loginService.login(loginData.Email, loginData.Password).subscribe({
      next: (response) => {
        console.log('POST request successful:', response);
        this.auth.storeToken(response.token);
        this.router.navigate(['dashboard-admin']);
      },
      error: (err) => {
        console.error('Error occurred during POST request:', err);
        // Provide user feedback here
      }
    });
  }
}
