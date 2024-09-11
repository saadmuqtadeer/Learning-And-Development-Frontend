import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { trainingRequest } from '../../models/Application/trainingRequest';

@Injectable({
  providedIn: 'root'
})
export class TrainingRequestService {
  private apiUrl = 'http://localhost:5001';  // Set your API base URL

  constructor(private http: HttpClient, private router: Router) { }

  public sendRequest(form: any) {
    console.log('Sending Request:', form);
    return this.http.post<any>(`${this.apiUrl}training-request`, form);
  }
}
