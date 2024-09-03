import { Component } from '@angular/core';
// import { registerUser } from '../../../models/authentication/register';
import { RegisterService } from '../../../services/authentication/register/register.service';
import { FormBuilder, FormGroup, Validators} from '@angular/forms'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  registrationForm: FormGroup;
  constructor(private fb:FormBuilder, private registrationService:RegisterService){
    this.registrationForm=this.fb.group({
      firstName:['',Validators.required],
      lastName:['',Validators.required],
      email:['',Validators.required,Validators.email],
      phoneNo:['',Validators.required,Validators.maxLength(10)],
      id:['',Validators.required],
      role:['',Validators.required],
      securityQuestion:['',Validators.required],
      password:['',Validators.required],
      confirmPassword:['',Validators.required],
      terms:['',Validators.requiredTrue]
    })
  }
  onSubmit(){
    this.registrationService.register(this.registrationForm.value);
  }
}
