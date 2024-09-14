import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../../services/Employee/api.service';

@Component({
  selector: 'app-e-learning',
  templateUrl: './e-learning.component.html',
  styleUrls: ['./e-learning.component.css']
})
export class ELearningComponent implements OnInit {
  courses: any[] = [];
  totalCourses: number = 0; // To display total number of courses
  searchQuery: string = ''; // Bind to search input
  activeTab: string = 'ongoing'; // Default to 'ongoing'
  page: number = 1; // Current page number for pagination
  pageSize: number = 10; // Number of courses per page
  loadingMore: boolean = false; // To disable the button while loading

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.fetchCourses(); // Fetch initial courses
  }

  // Method to fetch courses based on current page
  fetchCourses(page: number = 1, pageSize: number = 10): void {
    this.apiService.getAllCourses(page, pageSize).subscribe(
      data => {
        console.log(data);
        this.courses = page === 1 ? data.courses : [...this.courses, ...data.courses]; // Append courses
        this.totalCourses = data.total; // Capture the total number of courses
      },
      error => {
        console.error('Error fetching courses', error);
      }
    );
  }

  // Method to search courses
  searchCourses(): void {
    if (this.searchQuery.trim()) {
      this.page = 1; // Reset page number on new search
      this.apiService.getSearchedCourses(this.searchQuery, this.page, this.pageSize).subscribe(
        data => {
          console.log(data);
          this.courses = data.courses; // Update courses with search results
          this.totalCourses = data.total; // Capture the total number of courses
        },
        error => {
          console.error('Error searching courses', error);
        }
      );
    } else {
      this.fetchCourses(); // Fetch all courses if search query is empty
    }
  }

  
  // Method to load more courses
  loadMore(): void {
    if (this.loadingMore) return; // Prevent multiple clicks

    this.loadingMore = true;
    this.page++; // Increment page number
    this.fetchCourses(this.page, this.pageSize); // Fetch next page of courses

    this.loadingMore = false;
  }

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
  setActiveTab(tab: string): void {
    this.activeTab = tab;
  }
}
