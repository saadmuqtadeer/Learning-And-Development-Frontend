import { Component } from '@angular/core';

@Component({
  selector: 'app-live-sessions',
  templateUrl: './live-sessions.component.html',
  styleUrl: './live-sessions.component.css'
})
export class LiveSessionsComponent {
  activeTab: string = 'ongoing'; // Default to 'ongoing'

  // Sample data for courses
  completedSessions = [
    {
      title: 'Session 1',
      date: 'May 2, 2024',
     duration: '2 hours'
    },
    {
      title: 'Session 2',
      date: 'May 4, 2024',
      duration: '2 hours'
    }
  ];

  upcomingSessions = [
    {
      title: 'Session 3',
      date: 'May 6, 2024',
     duration: '2 hours'
    },
    {
      title: 'Session 4',
      date: 'May 8, 2024',
     duration: '2 hours'
    }
  ];

  // Method to change active tab
  setActiveTab(tab: string) {
    this.activeTab = tab;
  }
}
