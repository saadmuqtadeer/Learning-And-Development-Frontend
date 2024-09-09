import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../../../services/authentication/auth.service';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {
  user: any = {};

  constructor(private auth: AuthService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    const userId = +this.route.snapshot.paramMap.get('id')!;
    this.auth.getUserById(userId).subscribe({
      next: (response) => {
        this.user = response;
      },
      error: (err) => {
        console.error('Error occurred during GET request:', err);
      }
    });
  }

  save() {
    const userId = this.user.employeeId; // Make sure this matches your user object’s ID field
    this.auth.updateUser(userId, this.user).subscribe({
      next: (response) => {
        this.router.navigate(['/admin/all-users']); // Redirect to the list after successful update
      },
      error: (err) => {
        console.error('Error occurred during PUT request:', err);
      }
    });
  }
}
