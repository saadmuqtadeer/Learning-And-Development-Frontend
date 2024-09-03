import { Injectable } from '@angular/core';
import { registerUser } from '../../../models/authentication/registerUser';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  // userList:registerUser[]=[];
  constructor(private http: HttpClient) { }

  private apiUrl = 'http://localhost:5000/api/auth/register'
  register(user: registerUser): Observable<any> {
    return this.http.post<any>(this.apiUrl, user);
  }
  // getUsers():registerUser[]{
  //   return this.userList;
  // }
}

