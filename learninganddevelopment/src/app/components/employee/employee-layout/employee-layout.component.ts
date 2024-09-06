import { Component } from '@angular/core';

@Component({
  selector: 'app-employee-layout',
  templateUrl: './employee-layout.component.html',
  styleUrl: './employee-layout.component.css'
})
export class EmployeeLayoutComponent {
  activeMenu: string | null = null;

  // Method to toggle the collapse of the menu items
  toggleMenu(menuId: string): void {
    this.activeMenu = this.activeMenu === menuId ? null : menuId;
  }

  // Method to check if a menu is active
  isMenuActive(menuId: string): boolean {
    return this.activeMenu === menuId;
  }
}
