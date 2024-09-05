import { Injectable } from '@angular/core';
import { user } from '../../../models/authentication/user';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  constructor(private http: HttpClient) { }

  private apiUrl = 'http://localhost:5000/api/auth/register'
  register(user: user): Observable<any> {
    console.log(user);
    return this.http.post<any>(this.apiUrl, user);
  }
  // getUsers():registerUser[]{
  //   return this.userList;
  // }
}

