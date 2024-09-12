import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { user } from '../../models/authentication/user';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:5000/api/auth/';
  private payloadData: any;
  private Id: number | null  = null;

  constructor(private http: HttpClient, private router: Router) {
    const token = this.getToken();
    if(token != null){
      this.payloadData = this.decodeToken();
      this.Id = this.payloadData?.Id || null;
      
    }
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
    return this.http.delete<any>(`${this.apiUrl}${userId}`);
  }

  getUserById(userId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}${userId}`);
  }

  updateUser(userId: number, userData: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}${userId}`, userData);
  }

  storeToken(token: string) {
    localStorage.setItem('token', token);
    this.payloadData = this.decodeToken();
    this.Id = this.payloadData?.Id || null;
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
    this.Id = null;
    this.router.navigate(['login']);
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

  setId(id: number){
    this.Id = id;
  }

  getId(id: number){
    return this.Id;
  }
  // New method to get user details from token
  getUserDetails(): any {
    const decodedToken = this.decodeToken();
    return {
      name: decodedToken.unique_name,
      email: decodedToken.email,
      department: decodedToken.department || '', // Ensure this field exists in your token
      role: decodedToken.role
    };
  }
}
