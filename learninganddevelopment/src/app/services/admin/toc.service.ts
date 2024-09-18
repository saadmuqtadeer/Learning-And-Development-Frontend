import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TocService {
  private apiKey = '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';
  private apiUrl = 'https://api.openai.com/v1/chat/completions';

  constructor(private http: HttpClient) { }

  generateToc(prompt: string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.apiKey}`,
      'Content-Type': 'application/json'
    });

    return this.http.post<any>(this.apiUrl, {
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: 'You are a helpful assistant.' },
        { role: 'user', content: prompt }
      ]
    }, { headers });
  }
}
