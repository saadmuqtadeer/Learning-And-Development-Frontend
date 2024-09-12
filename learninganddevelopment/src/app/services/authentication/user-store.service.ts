import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserStoreService {

  private role$ = new BehaviorSubject<string>("");
  private fullName$ = new BehaviorSubject<string>("");
  private email$ = new BehaviorSubject<string>("");
  private id$ = new BehaviorSubject<number>(0);

  constructor() { }

  public getRole() { return this.role$.asObservable(); }
  public setRole(role: string) { this.role$.next(role); }

  public getName() { return this.fullName$.asObservable(); }
  public setName(unique_name: string) { this.fullName$.next(unique_name); }

  public getEmail() { return this.email$.asObservable(); }
  public setEmail(email: string) { this.email$.next(email); }

}
