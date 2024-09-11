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

  constructor(private auth: AuthService, private trainingRequestService: TrainingRequestService) { }

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
    
    // Call the sendRequest method from the service and handle the response
    this.trainingRequestService.sendRequest(this.request).subscribe({
      next: (response) => {
        console.log('Request sent successfully:', response);
        // Handle success, maybe navigate or show success message
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
