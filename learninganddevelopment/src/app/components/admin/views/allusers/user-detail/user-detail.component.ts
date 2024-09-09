import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../../../../services/authentication/auth.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {
  user: any;

  constructor(private auth: AuthService, private route: ActivatedRoute) { }

  ngOnInit() {
    // Retrieve the userId from the route parameters
    const userId = +this.route.snapshot.paramMap.get('id')!;
    console.log('Fetched user ID:', userId); // Debugging log
    this.auth.getUserById(userId).subscribe({
      next: (response) => {
        this.user = response;
        console.log('User details:', this.user); // Debugging log
      },
      error: (err) => {
        console.error('Error occurred during GET request:', err);
      }
    });
  }
}
