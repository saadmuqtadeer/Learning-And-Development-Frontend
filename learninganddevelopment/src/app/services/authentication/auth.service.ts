import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { user } from '../../models/authentication/user';
import {JwtHelperService} from '@auth0/angular-jwt'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  
  private apiUrl = 'http://localhost:5000/api/auth/';
  private payloadData:any;
  
  constructor(private http: HttpClient, private router:Router) { 
    this.payloadData = this.decodeToken();
  }

  register(user: user): Observable<any> {
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

  decodeToken(){
    const token = this.getToken()!;
    const jwthelper = new JwtHelperService();
    console.log(jwthelper.decodeToken(token));
    return jwthelper.decodeToken(token);
  }

  getRoleFromToken(){
    if(this.payloadData){
      
      return this.payloadData.role;
    }
  }

  getNameFromToken(){
    if(this.payloadData)
    return this.payloadData.unique_name;
  }

  getEmailFromToken(){
    if(this.payloadData)
    return this.payloadData.email;
  }

  deleteUser(userId: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${userId}`);
  }


}
