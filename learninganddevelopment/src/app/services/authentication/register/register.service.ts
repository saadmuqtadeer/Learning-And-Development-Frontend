import { Injectable } from '@angular/core';
import { registerUser } from '../../../models/authentication/register';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  userList:registerUser[]=[];
  constructor() {}

  register(user:registerUser){
    this.userList.push(user)
    console.log(this.userList);
  }
  getUsers():registerUser[]{
    return this.userList;
  }
}
