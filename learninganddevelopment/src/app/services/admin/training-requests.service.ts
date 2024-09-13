import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TrainingRequestsService {

  private apiUrl = 'http://localhost:5001/';  // Set your API base URL

  constructor(private http: HttpClient, private router: Router) { }

  public getRequests():Observable<any>{
    console.log('Getting Request:');
    return this.http.get<any>(`${this.apiUrl}training-requests`);
  }

  public updateRequestStatus(requestUpdate: {status: string, adminFeedback?: string}, id: number): Observable<any> {
    console.log('Updating request status:', requestUpdate);
    return this.http.put<any>(`${this.apiUrl}update-status/${id}`, requestUpdate);
  }
  
}
