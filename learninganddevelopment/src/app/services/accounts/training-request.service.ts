import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class TrainingRequestService {
  private apiUrl = 'http://localhost:5001/';  // Set your API base URL

  constructor(private http: HttpClient, private router: Router) { }

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
