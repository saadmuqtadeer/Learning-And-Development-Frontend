import { Injectable } from '@angular/core';
import { RegisterService } from '../register/register.service';

@Injectable({
  providedIn: 'root'
})

export class LoginService {
  constructor(private registerService: RegisterService) {}

  login(id: number, password: string): boolean {
    const user = this.registerService.userList.find(
      (user) => user.id === id && user.password === password
    );
    
    if (user) {
      console.log('Login successful');
      return true;
    } else {
      console.log('Login failed: Invalid ID or Password');
      return false;
    }
  }
}
