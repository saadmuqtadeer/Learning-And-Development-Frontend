import { Component, OnInit } from '@angular/core';
import { Modal } from 'bootstrap';
import { TrainingRequestsService } from '../../../../services/admin/training-requests.service';
import { AuthService } from '../../../../services/authentication/auth.service';

@Component({
  selector: 'app-training-requests',
  templateUrl: './training-requests.component.html',
  styleUrl: './training-requests.component.css'
})
export class TrainingRequestsComponent implements OnInit {
  request: any = {};
  requestorInfo: any = {};
  activeTab: string = 'all'; // Default tab
  employeeId: number | null = null;
  trainingRequests: any[] = [];
  pendingRequests: any[] = [];
  approvedRequests: any[] = [];
  rejectedRequests: any[] = [];
  selectedRequest: any = null;

  constructor(
    private auth: AuthService,
    private trainingRequestService: TrainingRequestsService
  ) {}

  ngOnInit() {
    this.loadRequestorInfo();
    this.employeeId = this.auth.decodeToken().nameid;
    this.loadTrainingRequests();
  }

  loadRequestorInfo() {
    this.requestorInfo = this.auth.getUserDetails();
    this.request.requestorName = this.requestorInfo.name;
    this.request.requestorEmail = this.requestorInfo.email;
    this.employeeId = this.requestorInfo.id;
  }

  getTrainingRequests() {
      this.trainingRequestService.getRequests().subscribe({
        next: (requests) => {
          console.log(requests);
          this.trainingRequests = requests;
          this.updateRequestsByTab(); // Filter requests based on the active tab
        },
        error: (error) => {
          console.error('Error fetching training requests:', error);
        },
      });
  }

  updateRequestsByTab() {
    switch (this.activeTab) {
      case 'pending':
        this.pendingRequests = this.trainingRequests.filter(r => r.status === 0);
        this.approvedRequests = [];
        this.rejectedRequests = [];
        break;
      case 'approved':
        this.pendingRequests = [];
        this.approvedRequests = this.trainingRequests.filter(r => r.status === 1);
        this.rejectedRequests = [];
        break;
      case 'rejected':
        this.pendingRequests = [];
        this.approvedRequests = [];
        this.rejectedRequests = this.trainingRequests.filter(r => r.status === 2);
        break;
      default:
        this.pendingRequests = this.trainingRequests.filter(r => r.status === 0);
        this.approvedRequests = this.trainingRequests.filter(r => r.status === 1);
        this.rejectedRequests = this.trainingRequests.filter(r => r.status === 2);
        break;
    }
  }

  loadTrainingRequests() {
      this.trainingRequestService.getRequests().subscribe({
        next: (requests) => {
          console.log(requests);
          this.trainingRequests = requests;
          this.updateRequestsByTab();
        },
        error: (error) => {
          console.error('Error fetching training requests:', error);
        },
      });
  }

  viewRequestDetails(request: any) {
    this.selectedRequest = request;
    const modalElement = document.getElementById('viewRequestModal');
    if (modalElement) {
      const modal = new Modal(modalElement);
      modal.show();
    }
  }

  acceptRequest(request: any) {
    if (confirm('Are you sure you want to accept this request?')) {
      const requestUpdate = { status: "Accepted", adminFeedback:"Accepted" }; // Accepted status
      this.updateRequestStatus(requestUpdate, request.id);
    }
  }
  
  
  rejectRequest(request: any) {
    const reason = prompt('Please provide a reason for rejection:');
    if (reason && confirm('Are you sure you want to reject this request?')) {
      const requestUpdate = { status: "Rejected", adminFeedback: reason }; // Rejected status with reason
      this.updateRequestStatus(requestUpdate, request.id);
    } else {
      console.log('Rejection canceled or no reason provided');
    }
  }

  updateRequestStatus(requestUpdate: {status: string, adminFeedback?: string}, id: number) {
    this.trainingRequestService.updateRequestStatus(requestUpdate, id).subscribe({
      next: (updatedRequest) => {
        console.log('Request updated successfully:', updatedRequest);
  
        // Update the request in the frontend list
        const index = this.trainingRequests.findIndex(r => r.id === id);
        if (index !== -1) {
          this.trainingRequests[index] = updatedRequest;
        }
  
        // Update the requests in the correct tabs
        this.updateRequestsByTab();
      },
      error: (error) => {
        console.error('Error updating request:', error);
      }
    });
    
  }

  setActiveTab(tab: string) {
    this.activeTab = tab;
    this.updateRequestsByTab(); // Update the requests based on the active tab
  }
}
