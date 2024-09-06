import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountsDashboardComponent } from './components/accounts/accounts-dashboard/accounts-dashboard.component';
import { DashboardComponent } from './components/admin/dashboard/dashboard.component';
import { ForgotpasswordComponent } from './components/authentication/forgotpassword/forgotpassword.component';
import { LoginComponent } from './components/authentication/login/login.component';
import { RegisterComponent } from './components/authentication/register/register.component';
import { UnauthorizedComponent } from './components/authentication/Unauth/unauthorized/unauthorized.component';
import { EmpDashboardComponent } from './components/employee/emp-dashboard/emp-dashboard.component';
import { AccountsGuard } from './guards/accounts.guard';
import { AdminGuard } from './guards/admin.guard';
import { AuthGuard } from './guards/auth.guard';
import { EmployeeGuard } from './guards/employee.guard';

const routes: Routes = [

  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'forgot-password', component: ForgotpasswordComponent },
  
  { path: 'admin-dashboard', component: DashboardComponent, canActivate: [AuthGuard, AdminGuard] },
  { path: 'employee-dashboard', component: EmpDashboardComponent, canActivate: [AuthGuard, EmployeeGuard] },
  { path: 'accounts-dashboard', component: AccountsDashboardComponent, canActivate: [AccountsGuard] },
  
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/login' },
  { path: 'unauthorized', component: UnauthorizedComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
