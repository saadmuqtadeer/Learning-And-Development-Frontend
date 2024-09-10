import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent {
  constructor(private router:Router){}
  activeMenu: string | null = null;

  // Method to toggle the collapse of the menu items
  toggleMenu(menuId: string): void {
    this.activeMenu = this.activeMenu === menuId ? null : menuId;
  }

  // Method to check if a menu is active
  isMenuActive(menuId: string): boolean {
    return this.activeMenu === menuId;
  }

  logout(){
    localStorage.clear();
    this.router.navigate(['']);
  }
}
