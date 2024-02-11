import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private baseUrl = 'http://localhost:3000'; // Base URL of your backend API

  constructor(private http: HttpClient) { }

  // Method to fetch data from the backend /budget endpoint
  fetchBudgetData(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/budget`);
  }
}
