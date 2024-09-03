import { Component } from '@angular/core';
// import { registerUser } from '../../../models/authentication/register';
import { RegisterService } from '../../../services/authentication/register/register.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  registrationForm: FormGroup;

  constructor(private fb: FormBuilder, private registrationService: RegisterService) {

    this.registrationForm = this.fb.group({
      FirstName: ['', Validators.required],
      LastName: ['', Validators.required],
      Email: ['', Validators.required, Validators.email],
      PhoneNumber: ['', Validators.required],
      EmployeeId: ['', Validators.required],
      Role: ['', Validators.required],
      SecurityQuestion: ['', Validators.required],
      Password: ['', Validators.required]
    });

  }
  onSubmit() {
    this.registrationService.register(this.registrationForm.value).subscribe(
      response => {
        console.log('POST request successful:', response);
      },
      error => {
        console.error('Error occurred during POST request:', error);
      }
    );
  }
}
