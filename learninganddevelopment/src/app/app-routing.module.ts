import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './components/admin/views/dashboard/dashboard.component';
import { LayoutComponent } from './components/admin/layout/layout.component';
import { TrainingRequestsComponent } from './components/admin/views/training-requests/training-requests.component';
import { ForgotpasswordComponent } from './components/authentication/forgotpassword/forgotpassword.component';
import { LoginComponent } from './components/authentication/login/login.component';
import { RegisterComponent } from './components/authentication/register/register.component';
import { AccountsGuard } from './guards/accounts.guard';
import { AdminGuard } from './guards/admin.guard';
import { AuthGuard } from './guards/auth.guard';
import { AccountsDashboardComponent } from './components/accounts/views/accounts-dashboard/accounts-dashboard.component';
import { TrainingRequestComponent } from './components/accounts/views/training-request/training-request.component';
import { AccountsLayoutComponent } from './components/accounts/accounts-layout/accounts-layout.component';
import { EmployeeLayoutComponent } from './components/employee/employee-layout/employee-layout.component';
import { EmployeeDashboardComponent } from './components/employee/views/employee-dashboard/employee-dashboard.component';
import { EmployeeGuard } from './guards/employee.guard';
import { UnauthorizedComponent } from './components/authentication/unauthorized/unauthorized.component';
import { PagenotfoundComponent } from './components/authentication/pagenotfound/pagenotfound.component';
import { ELearningComponent } from './components/employee/views/e-learning/e-learning.component';
import { LiveSessionsComponent } from './components/employee/views/live-sessions/live-sessions.component';
import { EmployeeFeedbackComponent } from './components/employee/views/employee-feedback/employee-feedback.component';

const routes: Routes = [
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'forgot-password', component: ForgotpasswordComponent },
  { path: 'unauthorized', component: UnauthorizedComponent },
  { path: 'pagenotfound', component: PagenotfoundComponent },
  
  {
    path: 'admin',
    component: LayoutComponent,
    canActivate: [AuthGuard, AdminGuard],
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'training-requests', component: TrainingRequestsComponent }
    ]
  },
  {
    path: 'accounts',
    component: AccountsLayoutComponent,
    canActivate: [AuthGuard, AccountsGuard],
    children: [
      { path: 'dashboard', component: AccountsDashboardComponent },
      { path: 'training-request', component: TrainingRequestComponent }
    ]
  },
  {
    path: 'employee',
    component: EmployeeLayoutComponent,
   // canActivate: [AuthGuard, EmployeeGuard],
    children: [
      { path: 'dashboard', component: EmployeeDashboardComponent },
      { path: 'e-learning', component: ELearningComponent },
      { path: 'live-sessions', component: LiveSessionsComponent },
      { path: 'feedback', component: EmployeeFeedbackComponent }
    ]
  },
  
  // { path: '', redirectTo: 'login', pathMatch: 'full' },
  // { path: '**', redirectTo: 'pagenotfound' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
