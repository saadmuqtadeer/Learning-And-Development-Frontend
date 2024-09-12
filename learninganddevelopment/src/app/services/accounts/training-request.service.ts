// src/app/services/accounts/training-request.service.ts
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { trainingRequest } from '../../models/Application/trainingRequest';

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
  public sendRequest(form: any) : Observable<any> {
    console.log('Sending Request:', form);
    return this.http.post<any>(`${this.apiUrl}training-request`, form);
  }
  public getRequests():Observable<any>{
    console.log('Getting Request:');
    return this.http.get<any>(`${this.apiUrl}training-request`);
  }
  public updateRequests(form:any):Observable<any>{
    console.log('Updating Requests:',form);
    return this.http.put<any>(`${this.apiUrl}training-request`,form);
  }
  public deleteRequest(id: Number): Observable<any> {
    return this.http.delete<Number>(`${this.apiUrl}training-request/${id}`);
  }
}
