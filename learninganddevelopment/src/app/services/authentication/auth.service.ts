import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { registerUser } from '../../models/authentication/registerUser';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private router:Router) { }

  private apiUrl = 'http://localhost:5000/api/auth/'
  
  register(user: registerUser): Observable<any> {
    console.log(user);
    return this.http.post<any>(`${this.apiUrl}register`, user);
  }

  login(Email:string, Password:string): Observable<any> {
    console.log({Email, Password});
    return this.http.post<any>(`${this.apiUrl}login`, {Email, Password});
  }

  getAll():Observable<any>{
    return this.http.get<any>(`${this.apiUrl}`);
  }

  storeToken(token:string){
    localStorage.setItem('token', token);
  }


  getToken() {
    return localStorage.getItem('token');
  }

  isLoggedIn():boolean{
    return !!localStorage.getItem('token');
  }

  logout(){
    localStorage.clear();
    this.router.navigate(['login']);
    // localStorage.removeItem('token');, private route:Router
  }

}
