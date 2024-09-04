import { Component } from '@angular/core';
// import { registerUser } from '../../../models/authentication/register';
import { RegisterService } from '../../../services/authentication/register/register.service';
import { FormBuilder, FormGroup, FormResetEvent, Validators } from '@angular/forms'
import { LoginComponent } from '../login/login.component';
import { Route, Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  registrationForm: FormGroup;

  constructor(private fb: FormBuilder, private registrationService: RegisterService, private router: Router) {

    this.registrationForm = this.fb.group({
      FirstName: ['', Validators.required],
      LastName: ['', Validators.required],
      Email: ['', Validators.required, Validators.email],
      PhoneNumber: ['', Validators.required],
      // EmployeeId: ['', Validators.required],
      Role: ['', Validators.required],
      SecurityQuestion: ['', Validators.required],
      Password: ['', Validators.required]
    });

  }
  onSubmit() {
    this.registrationService.register(this.registrationForm.value).subscribe(
      response => {
        console.log('POST request successful:', response);
        this.router.navigate(["login"]);
      },
      error => {
        console.error('Error occurred during POST request:', error);
      }
    );
  }
}
