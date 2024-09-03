import { Injectable } from '@angular/core';
import { RegisterService } from '../register/register.service';

@Injectable({
  providedIn: 'root'
})

export class LoginService {
  constructor(private registerService: RegisterService) {}

  login(id: number, password: string) {

  }
}
