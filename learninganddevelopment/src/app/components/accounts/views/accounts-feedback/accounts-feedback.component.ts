import { Component } from '@angular/core';
import { Modal } from 'bootstrap';

@Component({
  selector: 'app-accounts-feedback',
  templateUrl: './accounts-feedback.component.html',
  styleUrl: './accounts-feedback.component.css'
})
export class AccountsFeedbackComponent {
  openModal(id:string) {
    const modalElement = document.getElementById(id);
    if (modalElement) {
      const modal = new Modal(modalElement);
      modal.show();
    }
  }
}

