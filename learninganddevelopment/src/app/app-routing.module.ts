import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/admin/views/dashboard/dashboard.component';
import { LayoutComponent } from './components/admin/layout/layout.component';
import { TrainingRequestsComponent } from './components/admin/views/training-requests/training-requests.component';
import { ForgotpasswordComponent } from './components/authentication/forgotpassword/forgotpassword.component';
import { LoginComponent } from './components/authentication/login/login.component';
import { RegisterComponent } from './components/authentication/register/register.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {'path': '','component': RegisterComponent},
  {'path': 'login','component': LoginComponent},
  {'path':'forgotpassword','component':ForgotpasswordComponent},
 // {'path':'dashboard-admin','component':DashboardComponent, canActivate:[AuthGuard],ch}
 {
  path: 'admin', // Base path for the admin section
  component: LayoutComponent, // Layout component contains the <router-outlet>
  children: [
    { path: 'dashboard', component: DashboardComponent }, // Child route (dashboard)
    {path:'training-requests',component:TrainingRequestsComponent}
  ],
}
];



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
