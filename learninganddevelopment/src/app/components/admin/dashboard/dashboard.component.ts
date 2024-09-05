import { Component } from '@angular/core';
import { AuthService } from '../../../services/authentication/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  constructor(private auth: AuthService) { }

  public users: any = [];

  logout() {
    this.auth.logout();
  }

  ngOnInit() {
    this.auth.getAll().subscribe({
      next: (response) => {
        this.users = response;
        console.log('POST request successful:', response);
      },
      error: (err) => {
        console.error('Error occurred during POST request:', err);
        // Provide user feedback here
      }
    });
  }
}
