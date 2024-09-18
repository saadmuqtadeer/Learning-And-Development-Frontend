import { Injectable } from '@angular/core';
import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(private toastr: ToastrService) {}

  showSuccess() {
    this.toastr.success('Logged in successfully!', 'Success');
  }

  showError() {
    this.toastr.error('Wrong password!', 'Error');
  }
}