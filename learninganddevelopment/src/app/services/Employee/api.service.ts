import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private getAllCoursesUrl = 'https://udemy-paid-courses-for-free-api.p.rapidapi.com/rapidapi/courses/';
  private searchCourseUrl = 'https://udemy-paid-courses-for-free-api.p.rapidapi.com/rapidapi/courses/search';

  private headers = new HttpHeaders({
    'x-rapidapi-key': '163718ce6dmshaf429629c5e99fcp11a6f1jsn051d6c5e42dc',
    'x-rapidapi-host': 'udemy-paid-courses-for-free-api.p.rapidapi.com'
  });

  constructor(private http: HttpClient) { }

  
  getAllCourses(page: number = 1, pageSize: number = 10): Observable<any> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('page_size', pageSize.toString());

    return this.http.get<any>(this.getAllCoursesUrl, { headers: this.headers, params });
  }

  getSearchedCourses(query: string, page: number, pageSize: number): Observable<any> {
    const params = new HttpParams()
      .set('query', query)
      .set('page', page.toString())
      .set('page_size', pageSize.toString());

    return this.http.get<any>(this.searchCourseUrl, { headers: this.headers, params });
  }
}
