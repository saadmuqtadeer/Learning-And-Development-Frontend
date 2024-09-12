// src/app/services/accounts/training-request.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TrainingRequestService {
  private apiUrl = 'http://localhost:5001/'; // Adjust as necessary

  constructor(private http: HttpClient) { }

  sendRequest(request: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}training-request`, request);
  }

  getAllRequests(employeeId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}training-requests/employee/${employeeId}`);
  }
}
