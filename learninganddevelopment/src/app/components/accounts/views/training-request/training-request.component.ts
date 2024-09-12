import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../../services/authentication/auth.service';
import { Modal } from 'bootstrap';
import { TrainingRequestService } from '../../../../services/accounts/training-request.service'; // Update the import

@Component({
  selector: 'app-training-request',
  templateUrl: './training-request.component.html',
  styleUrls: ['./training-request.component.css']
})
export class TrainingRequestComponent implements OnInit {
  request: any = {};
  requestorInfo: any = {};
  activeTab: string = 'all';
  trainingRequests: any[] = []; // Array to hold training requests
  employeeId: number | null = null; // Initialize to null

  constructor(private auth: AuthService, private trainingRequestService: TrainingRequestService) { }

  ngOnInit() {
    this.loadRequestorInfo();
    this.employeeId = this.auth.decodeToken().nameid; // Retrieve ID from AuthService
    if (this.employeeId !== null) {
      this.loadTrainingRequests(); // Load requests if employeeId is not null
    } else {
      console.error('Employee ID is undefined or null');
    }
  }

  loadRequestorInfo() {
    // Get user details from AuthService
    this.requestorInfo = this.auth.getUserDetails();
    // Pre-fill requestor information in the form
    this.request.requestorName = this.requestorInfo.name;
    this.request.requestorEmail = this.requestorInfo.email;
    this.employeeId = this.requestorInfo.id; // Set employeeId from requestorInfo
  }

  submitRequest() {
    if (this.employeeId === null) {
      console.error('Employee ID is not available');
      return;
    }

    const employeeIdAsNumber = Number(this.employeeId);
    // Add employeeId to the request object
    const requestWithId = {
      ...this.request,
      employeeId: employeeIdAsNumber // Add employeeId field to the request
    };

    console.log('Training Request Submitted:', requestWithId);
    
    // Call the sendRequest method from the service and handle the response
    this.trainingRequestService.sendRequest(requestWithId).subscribe({
      next: (response) => {
        console.log('Request sent successfully:', response);
        // Handle success, maybe navigate or show success message
        this.loadTrainingRequests(); // Reload requests after submitting a new one
      },
      error: (error) => {
        console.error('Error in sending request:', error);
        // Handle error, show an error message
      }
    });
  }

  // Method to change active tab
  setActiveTab(tab: string) {
    this.activeTab = tab;
  }

  openModal(id: string) {
    const modalElement = document.getElementById(id);
    if (modalElement) {
      const modal = new Modal(modalElement);
      modal.show();
    }
  }

  // Load training requests for the logged-in employee
  loadTrainingRequests() {
    if (this.employeeId !== null) {
      console.log(this.employeeId); // Adjust based on how you get the employee ID
      this.trainingRequestService.getAllRequests(this.employeeId).subscribe({
        next: (requests) => {
          this.trainingRequests = requests;
        },
        error: (error) => {
          console.error('Error fetching training requests:', error);
        }
      });
    } else {
      console.error('Employee ID is not available');
    }
  }
}
