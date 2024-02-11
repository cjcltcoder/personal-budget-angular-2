import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private baseUrl = 'http://localhost:3000'; // Base URL of backend API
  private budgetData: any; // Variable to store budget data coming from API

  constructor(private http: HttpClient) { }

  // Method to fetch data from the backend /budget endpoint
  fetchBudgetData(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/budget`);
  }

  // Method to check if budget data is already populated
  hasBudgetData(): boolean {
    return !!this.budgetData;
  }

  // Method to get existing budget data
  getBudgetData(): any {
    return this.budgetData;
  }

  // Method to set budget data
  setBudgetData(data: any): void {
    this.budgetData = data;
  }
}
