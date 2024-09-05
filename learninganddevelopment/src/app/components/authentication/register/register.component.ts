import { Component } from '@angular/core';
import { RegisterService } from '../../../services/authentication/register/register.service';
import { FormBuilder, FormGroup, FormResetEvent, Validators, AbstractControl } from '@angular/forms'
import { LoginComponent } from '../login/login.component';
import { Route, Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  registrationForm!: FormGroup;
  

  constructor(private fb: FormBuilder, private registrationService: RegisterService, private router: Router) {}
  
  ngOnInit():void{
    this.registrationForm = this.fb.group({
      FirstName: ['', Validators.required],
      LastName: ['', Validators.required],
      Email: ['', [Validators.required, Validators.email]],
      Role: ['', Validators.required],
      SecurityQuestion: ['', Validators.required],
      Password: ['', Validators.required],
      ConfirmPassword:['']
    },
    {
      validator:this.passwordMatchValidator
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

  validateControl(input:string){
    return  this.registrationForm.get(input)?.invalid && 
    ((this.registrationForm.get(input)?.touched) ||
    (this.registrationForm.get(input)?.dirty))
  }

  validateControlError(input:string,errorType:string){
    return this.registrationForm.get(input)?.hasError(errorType) &&
   ((this.registrationForm.get(input)?.touched) ||
    (this.registrationForm.get(input)?.dirty));
  }
  passwordMatchValidator(control: AbstractControl) {
    const password: string = control.get('Password')?.value;
    const confirmPassword: string = control.get('ConfirmPassword')?.value;
    if (password !== confirmPassword) {
      control.get('ConfirmPassword')?.setErrors({ passwordMismatch: true });
      return { passwordMismatch: true };
    } else {
      return null;
    }
  }
}
