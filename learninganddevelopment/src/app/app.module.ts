import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/authentication/login/login.component';
import { RegisterComponent } from './components/authentication/register/register.component';
import { ForgotpasswordComponent } from './components/authentication/forgotpassword/forgotpassword.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
// import { DashboardComponent } from './components/admin/dashboard/dashboard.component';
import { TokenInterceptor } from './interceptors/token.interceptor';
import { LayoutComponent } from './components/admin/layout/layout.component';
import { DashboardComponent } from './components/admin/views/dashboard/dashboard.component';
import { TrainingRequestsComponent } from './components/admin/views/training-requests/training-requests.component';
import { TrainingRequestComponent } from './components/accounts/views/training-request/training-request.component';
import { AccountsDashboardComponent } from './components/accounts/views/accounts-dashboard/accounts-dashboard.component';
import { AccountsLayoutComponent } from './components/accounts/accounts-layout/accounts-layout.component';
import { EmployeeLayoutComponent } from './components/employee/employee-layout/employee-layout.component';
import { EmployeeDashboardComponent } from './components/employee/views/employee-dashboard/employee-dashboard.component';
// import { NgToastModule } from 'ng-angular-popup';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    ForgotpasswordComponent,
    LayoutComponent,
    DashboardComponent,
    TrainingRequestsComponent,
    TrainingRequestComponent,
    AccountsDashboardComponent,
    AccountsLayoutComponent,
    EmployeeLayoutComponent,
    EmployeeDashboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    // NgToastModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
