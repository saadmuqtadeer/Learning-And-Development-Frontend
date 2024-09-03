import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ForgotpasswordComponent } from './components/authentication/forgotpassword/forgotpassword.component';
import { LoginComponent } from './components/authentication/login/login.component';
import { RegisterComponent } from './components/authentication/register/register.component';

const routes: Routes = [
  {'path': '','component': RegisterComponent},
  {'path': 'login','component': LoginComponent},
  {'path':'forgotpassword','component':ForgotpasswordComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
