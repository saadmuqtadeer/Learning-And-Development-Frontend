import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../../services/authentication/auth.service';
import { UserStoreService } from '../../../../services/authentication/user-store.service';

@Component({
  selector: 'app-allusers',
  templateUrl: './allusers.component.html',
  styleUrls: ['./allusers.component.css']
})
export class AllusersComponent implements OnInit {
  public users: any[] = [];
  public filteredUsers: any[] = [];
  public selectedRole: string = '';

  constructor(private auth: AuthService, private userStore: UserStoreService, private router: Router) { }

  ngOnInit() {
    this.fetchUsers(); // Fetch users and initialize filters
  }

  fetchUsers() {
    this.auth.getAll().subscribe({
      next: (response) => {
        this.users = response;
        this.filteredUsers = [...this.users]; // Initially show all users
        console.log('GET request successful:', response);
      },
      error: (err) => {
        console.error('Error occurred during GET request:', err);
      }
    });
  }

  filterByRole() {
    this.applyFilter();
  }

  applyFilter() {
    console.log('Applying filter with selectedRole:', this.selectedRole); // Debug log
    if (this.selectedRole === '') {
      this.filteredUsers = [...this.users]; // Reset filter
    } else {
      this.filteredUsers = this.users.filter(user => user.role === this.selectedRole);
    }
    console.log('Filtered Users:', this.filteredUsers); // Debug log
  }

  viewUser(userId: number) {
    this.router.navigate([`/admin/all-users/user-detail/${userId}`]);
  }

  editUser(userId: number) {
    this.router.navigate([`/admin/all-users/user-edit/${userId}`]);
  }

  deleteUser(userId: number) {
    if (confirm('Are you sure you want to delete this user?')) {
      this.auth.deleteUser(userId).subscribe({
        next: (response) => {
          console.log('User deleted successfully:', response);
          this.fetchUsers(); // Refresh the list without resetting filters
        },
        error: (err) => {
          console.error('Error occurred during DELETE request:', err);
        }
      });
    }
  }
}
