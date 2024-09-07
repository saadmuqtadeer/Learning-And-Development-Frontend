import { Component } from '@angular/core';

@Component({
  selector: 'app-e-learning',
  templateUrl: './e-learning.component.html',
  styleUrl: './e-learning.component.css'
})
export class ELearningComponent {
  activeTab: string = 'ongoing'; // Default to 'ongoing'

  // Method to change active tab
  setActiveTab(tab: string) {
    this.activeTab = tab;
  }
}
