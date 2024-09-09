import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../../services/authentication/auth.service';

@Component({
  selector: 'app-training-request',
  templateUrl: './training-request.component.html',
  styleUrls: ['./training-request.component.css']
})
export class TrainingRequestComponent implements OnInit {
  request: any = {};
  requestorInfo: any = {};

  constructor(private auth: AuthService) { }

  ngOnInit() {
    this.loadRequestorInfo();
  }

  loadRequestorInfo() {
    // Get user details from AuthService
    this.requestorInfo = this.auth.getUserDetails();
    // Pre-fill requestor information in the form
    this.request.requestorName = this.requestorInfo.name;
    this.request.requestorEmail = this.requestorInfo.email;
  }

  submitRequest() {
    console.log('Training Request Submitted:', this.request);
    // Logic to send the request data to the server
  }
}
