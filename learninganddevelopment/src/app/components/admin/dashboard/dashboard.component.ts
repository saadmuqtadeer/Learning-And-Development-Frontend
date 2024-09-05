import { Component } from '@angular/core';
import { AuthService } from '../../../services/authentication/auth.service';
import { UserStoreService } from '../../../services/authentication/user-store.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  constructor(private auth: AuthService, private userStore: UserStoreService) { }

  public users: any = [];
  public Name: string = "";
  public Role: string = "";
  public Email: string = "";

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
        console.error('Error occurred during POST request:', err);
      }
      });

    this.userStore.getName().subscribe(val=>{
      this.Name = val || this.auth.getNameFromToken();
    });

    this.userStore.getRole().subscribe(val=>{
      this.Role = val || this.auth.getRoleFromToken();
    })

    this.userStore.getEmail().subscribe(val=>{
      this.Email = val || this.auth.getEmailFromToken();
    })
  }
}
