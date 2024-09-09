
import { Component } from '@angular/core';
import { Modal } from 'bootstrap';


@Component({
  selector: 'app-employee-feedback',
  templateUrl: './employee-feedback.component.html',
  styleUrl: './employee-feedback.component.css'
})
export class EmployeeFeedbackComponent {
  openModal(id:string) {
    const modalElement = document.getElementById(id);
    if (modalElement) {
      const modal = new Modal(modalElement);
      modal.show();
    }
  }
}
