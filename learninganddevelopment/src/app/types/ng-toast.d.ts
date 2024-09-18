// types/ng-toast.d.ts
declare module 'ng-toast' {
    import { Injectable } from '@angular/core';
  
    @Injectable({
      providedIn: 'root',
    })
    export class NgToastService {
      success(message: string): void;
      error(message: string): void;
      info(message: string): void;
      // Add other methods if needed
    }
  }
  