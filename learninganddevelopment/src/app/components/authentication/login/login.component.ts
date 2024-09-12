import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/authentication/auth.service';
import { UserStoreService } from '../../../services/authentication/user-store.service';
// import { NgToastService } from 'ng-toast';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {
  loginForm!: FormGroup;
  private payloadData: any;

  constructor(
    private auth: AuthService,
    private fb: FormBuilder,
    private loginService: AuthService,
    private router: Router,
    private userStore: UserStoreService
  ) {
    localStorage.clear();
    this.loginForm = this.fb.group({
      Email: ['', [Validators.required, Validators.email]],
      Password: ['', [Validators.required]]
    });
  }
  validateControl(input: string) {
    return this.loginForm.get(input)?.invalid &&
      ((this.loginForm.get(input)?.touched) ||
        (this.loginForm.get(input)?.dirty))
  }
  validateControlError(input: string, errorType: string) {
    return this.loginForm.get(input)?.hasError(errorType) &&
      ((this.loginForm.get(input)?.touched) ||
        (this.loginForm.get(input)?.dirty));
  }



  logIn() {
    if (this.loginForm.invalid) {
      console.error('Form is invalid');
      return;
    }

    const loginData = this.loginForm.value;
    this.loginService.login(loginData.Email, loginData.Password).subscribe({
      next: (response) => {
        console.log('Login successful:', response);
        if (response.id) {
          this.auth.setId(response.id);
        } else {
          console.error('ID not present in response:', response);
        }
        this.auth.storeToken(response.token);

        switch (response.role) {
          case "Admin":
            this.router.navigate(['admin']);
            break;
          case "Employee":
            this.router.navigate(['employee']);
            break;
          case "Accounts":
            this.router.navigate(['accounts']);
            break;
          default:
            console.error('Unknown role:', response.role);
            this.router.navigate(['unauthorized']);
            break;
        }
      },
      error: (err) => {
        console.error('Error occurred during POST request:', err);
      }
    });
  }


  logOut() {
    this.auth.logout();
  }

}
