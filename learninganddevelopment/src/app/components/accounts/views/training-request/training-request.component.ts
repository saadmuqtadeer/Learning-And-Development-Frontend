import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../../services/authentication/auth.service';
import { Modal } from 'bootstrap';
import { TrainingRequestService } from '../../../../services/accounts/training-request.service';

@Component({
  selector: 'app-training-request',
  templateUrl: './training-request.component.html',
  styleUrls: ['./training-request.component.css'],
})
export class TrainingRequestComponent implements OnInit {
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
    private trainingRequestService: TrainingRequestService
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
    if (this.employeeId !== null) {
      this.trainingRequestService.getRequests(this.employeeId).subscribe({
        next: (requests) => {
          console.log(requests);
          this.trainingRequests = requests;
          this.updateRequestsByTab(); // Filter requests based on the active tab
        },
        error: (error) => {
          console.error('Error fetching training requests:', error);
        },
      });
    } else {
      console.error('Employee ID is not available');
    }
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

  submitRequest() {
    if (this.employeeId === null) {
      console.error('Employee ID is not available');
      return;
    }

    const employeeIdAsNumber = Number(this.employeeId);
    const requestWithId = {
      ...this.request,
      employeeId: employeeIdAsNumber,
    };

    this.trainingRequestService.sendRequest(requestWithId).subscribe({
      next: (response) => {
        console.log('Request sent successfully:', response);
        this.trainingRequests.push(response);
        this.updateRequestsByTab(); // Update the tab data
        this.request = {};
      },
      error: (error) => {
        console.error('Error in sending request:', error);
      },
    });
  }

  loadTrainingRequests() {
    if (this.employeeId !== null) {
      this.trainingRequestService.getRequests(this.employeeId).subscribe({
        next: (requests) => {
          console.log(requests);
          this.trainingRequests = requests;
          this.updateRequestsByTab();
        },
        error: (error) => {
          console.error('Error fetching training requests:', error);
        },
      });
    } else {
      console.error('Employee ID is not available');
    }
  }

  viewRequestDetails(request: any) {
    this.selectedRequest = request;
    const modalElement = document.getElementById('viewRequestModal');
    if (modalElement) {
      const modal = new Modal(modalElement);
      modal.show();
    }
  }

  openEditModal(selectedRequest: any) {
    this.request = { ...selectedRequest };
    const modalElement = document.getElementById('editRequestModal');
    if (modalElement) {
      const modal = new Modal(modalElement);
      modal.show();
    }
  }

  submitEditedRequest() {
    if (!this.request || !this.request.id) {
      console.error('Invalid request for update');
      return;
    }

    this.trainingRequestService.updateRequests(this.request).subscribe({
      next: (updatedRequest) => {
        console.log('Request updated successfully:', updatedRequest);
        const index = this.trainingRequests.findIndex(r => r.id === updatedRequest.id);
        if (index !== -1) {
          this.trainingRequests[index] = updatedRequest;
          this.updateRequestsByTab(); // Update the tab data
        }
        const modalElement = document.getElementById('editRequestModal');
        if (modalElement) {
          const modal = new Modal(modalElement);
          modal.hide();
        }
      },
      error: (error) => {
        console.error('Error updating request:', error);
      }
    });
  }

  deleteRequest(request: any) {
    if (confirm(`Are you sure you want to delete the request from ${request.name}?`)) {
      this.trainingRequestService.deleteRequest(request.id).subscribe({
        next: (response) => {
          console.log('Request deleted successfully:', response);
          this.trainingRequests = this.trainingRequests.filter(r => r.id !== request.id);
          this.updateRequestsByTab(); // Update the tab data
        },
        error: (error) => {
          console.error('Error deleting request:', error);
        },
      });
    }
  }

  setActiveTab(tab: string) {
    this.activeTab = tab;
    this.updateRequestsByTab(); // Update the requests based on the active tab
  }
}
