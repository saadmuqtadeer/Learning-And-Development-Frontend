import { Component } from '@angular/core';

@Component({
  selector: 'app-e-learning',
  templateUrl: './e-learning.component.html',
  styleUrls: ['./e-learning.component.css']
})
export class ELearningComponent {
  activeTab: string = 'ongoing'; // Default to 'ongoing'

  // Sample data for courses
  ongoingCourses = [
    {
      imageUrl:'https://fresheropenings.com/wp-content/uploads/2020/08/selection-064-500x500-java.png',
      title: 'Java Course & E-books',
      enrolledDate: 'May 2, 2024',
      expiryDate: 'May 2, 2025'
    },
    {
      imageUrl:'https://tse3.mm.bing.net/th?id=OIP.ZM7gdj5y5kOr7oI_b5Sj0wHaEc&pid=Api&P=0&h=180',
      title: '.Net Course & E-books',
      enrolledDate: 'June 10, 2024',
      expiryDate: 'June 10, 2025'
    }
  ];

  upcomingCourses = [
    {
      imageUrl:'https://tse4.mm.bing.net/th?id=OIP.amRUMdXSNbOyEDWg-ZdLJwFUC3&pid=Api&P=0&h=180',
      title: 'Python Course & E-books',
      expiryDate: 'May 2, 2025'
    },
    {
      imageUrl:'https://tse2.mm.bing.net/th?id=OIP.HEQCOjH6prR2uoVCwbs__gHaEK&pid=Api&P=0&w=300&h=300',
      title: 'React Course & E-books',
      expiryDate: 'June 10, 2025'
    }
  ];

  // Method to change active tab
  setActiveTab(tab: string) {
    this.activeTab = tab;
  }
}
