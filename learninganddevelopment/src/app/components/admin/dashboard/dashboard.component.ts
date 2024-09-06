import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/authentication/auth.service';
import { UserStoreService } from '../../../services/authentication/user-store.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  public users: any = [];
  public Name: string = "";
  public Role: string = "";
  public Email: string = "";

  constructor(private auth: AuthService, private userStore: UserStoreService, private router: Router) { }

  logout() {
    this.auth.logout();
  }

  ngOnInit() {
    this.auth.getAll().subscribe({
      next: (response) => {
        this.users = response;
        console.log('GET request successful:', response);
      },
      error: (err) => {
        console.error('Error occurred during GET request:', err);
      }
    });

    this.userStore.getName().subscribe(val => {
      this.Name = val || this.auth.getNameFromToken();
    });

    this.userStore.getRole().subscribe(val => {
      this.Role = val || this.auth.getRoleFromToken();
    });

    this.userStore.getEmail().subscribe(val => {
      this.Email = val || this.auth.getEmailFromToken();
    });
  }

  viewUser(userId: number) {
    // Navigate to user detail page
    this.router.navigate(['/user-detail', userId]);
  }

  editUser(userId: number) {
    // Navigate to user edit page
    this.router.navigate(['/user-edit', userId]);
  }

  deleteUser(userId: number) {
    if (confirm('Are you sure you want to delete this user?')) {
      this.auth.deleteUser(userId).subscribe({
        next: (response) => {
          console.log('User deleted successfully:', response);
          this.ngOnInit(); // Refresh the list
        },
        error: (err) => {
          console.error('Error occurred during DELETE request:', err);
        }
      });
    }
  }
}
