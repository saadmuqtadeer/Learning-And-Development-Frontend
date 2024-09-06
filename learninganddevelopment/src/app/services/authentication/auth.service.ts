import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { user } from '../../models/authentication/user';
import { JwtHelperService } from '@auth0/angular-jwt'

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  private apiUrl = 'http://localhost:5000/api/auth/';
  private payloadData: any;

  constructor(private http: HttpClient, private router: Router) {
    const token = this.getToken();
    this.payloadData = this.decodeToken();
  }

  register(user: user): Observable<any> {
    console.log(user);
    return this.http.post<any>(`${this.apiUrl}register`, user);
  }

  login(Email: string, Password: string): Observable<any> {
    console.log({ Email, Password });
    return this.http.post<any>(`${this.apiUrl}login`, { Email, Password });
  }

  getAll(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}`);
  }
  
  deleteUser(userId: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${userId}`);
  }

  storeToken(token: string) {
    localStorage.setItem('token', token);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  logout() {
    localStorage.clear();
    this.payloadData = null;
    this.router.navigate(['login']);
    // localStorage.removeItem('token');, private route:Router
  }

  decodeToken() {
    const token = this.getToken()!;
    const jwthelper = new JwtHelperService();
    console.log(jwthelper.decodeToken(token));
    return jwthelper.decodeToken(token);
  }


  getRoleFromToken() {
    return this.decodeToken().role;
  }

  getNameFromToken() {
    return this.decodeToken().unique_name;
  }

  getEmailFromToken() {
    return this.decodeToken().email;
  }

  isAdmin(): boolean {
    console.log(this.payloadData.role);
    const temp: string = this.decodeToken().role;
    return temp === 'Admin';
  }

  isEmployee(): boolean {
    const temp: string = this.decodeToken().role;
    return temp === 'Employee';
  }

  isAccounts(): boolean {
    const temp: string = this.decodeToken().role;
    return temp === 'Accounts';
  }

}
