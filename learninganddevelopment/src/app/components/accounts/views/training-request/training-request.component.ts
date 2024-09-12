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
   // View request details in a modal
   viewRequestDetails(request: any) {
    this.selectedRequest = request;  // Store the selected request details
    const modalElement = document.getElementById('viewRequestModal');
    if (modalElement) {
      const modal = new Modal(modalElement);
      modal.show();  // Show the modal with request details
    }
  }

// Method to open the edit modal and load the selected request details
openEditModal(request: any) {
  this.request = { ...request }; // Create a copy of the selected request
  const modalElement = document.getElementById('editRequestModal');
  if (modalElement) {
    const modal = new Modal(modalElement);
    modal.show();
  }
}

// Method to submit the edited request
submitEditedRequest() {
  // Handle the submission of the edited request, e.g., send an update request to the backend.
  console.log("Edited Request Submitted:", this.request);

  // After submission, you can close the modal programmatically
  const modalElement = document.getElementById('editRequestModal');
  if (modalElement) {
    const modal = new Modal(modalElement);
    modal.hide();
  }
}


  // Delete request
  deleteRequest(request: any) {
    if (confirm(`Are you sure you want to delete the request from ${request.name}?`)) {
      this.trainingRequestService.deleteRequest(request.id).subscribe({
        next: (response) => {
          console.log('Request deleted successfully:', response);
          // Refresh the list or remove the request from the table
          this.pendingRequests = this.pendingRequests.filter(r => r !== request);
        },
        error: (error) => {
          console.error('Error deleting request:', error);
        }
      });
    }
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
  allRequests = [
    {
      requestorName: 'Airi Satou',
      department: 'Accountant',
      trainingTitle: 'Accounting Training',
      status: 'Pending'
    },
    {
      requestorName: 'Ashton Cox',
      department: 'Junior Technical Author',
      trainingTitle: 'Technical Writing',
      status: 'Accepted'
    },
    {
      requestorName: 'Bradley Greer',
      department: 'Software Developer',
      trainingTitle: 'Advanced JavaScript',
      status: 'Rejected'
    }
  ];
  pendingRequests = [
    {
      name: 'Airi Satou',
      department: 'Accounting',
      title: 'Tokyo'
    },
    {
      name: 'Ashton Cox',
      department: 'HR',
      title: 'San Francisco'
    },
    {
      name: 'John Doe',
      department: 'IT',
      title: 'London'
    }
  ];
  acceptedRequests = [
    {
      name: 'Airi Satou',
      department: 'Accounting',
      title: 'Tokyo'
    },
    {
      name: 'Ashton Cox',
      department: 'HR',
      title: 'San Francisco'
    },
    {
      name: 'John Doe',
      department: 'IT',
      title: 'London'
    }
  ];
  rejectedRequests = [
    {
      name: 'Airi Satou',
      department: 'Accounting',
      title: 'Tokyo'
    },
    {
      name: 'Ashton Cox',
      department: 'HR',
      title: 'San Francisco'
    },
    {
      name: 'John Doe',
      department: 'IT',
      title: 'London'
    }
  ];
}
