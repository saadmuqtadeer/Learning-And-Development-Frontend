import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RegisterService } from '../register/register.service';

@Injectable({
  providedIn: 'root'
})

export class LoginService {
  constructor(private registerService: RegisterService, private http: HttpClient) {}

  private apiUrl = 'http://localhost:5000/api/auth/login'
  login(Email:string, Password:string): Observable<any> {
    console.log({Email, Password});
    return this.http.post<any>(this.apiUrl, {Email, Password});
  }
}
