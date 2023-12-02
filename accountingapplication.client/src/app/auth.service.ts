import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

export interface User {
  Id: number;
  Username: string;
  Password: string;
  Income: number
  Expenses: number
  Tax: number
  Deductions: number
  NetIncome: number
  Savings: number

}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticated: boolean = false;
  private apiUrl: string = "https://localhost:7124/api/User"; // Adjust URL structure and protocol
  public userDetails!: User;
  constructor(private http: HttpClient, private router: Router) {
    this.isAuthenticated = !!localStorage.getItem('token');
  }

  login(username: string, password: string): Observable<boolean> {
    return this.http.post<any>(this.apiUrl + "/login", { username, password })
      .pipe(
        map(response => {
          const { userDetails, token } = response;
          console.log('User:', userDetails);

          console.log('Token:', token);
          console.log('Response:', response);
          if (response && response.token) {
            localStorage.setItem('token', response.token);
            this.isAuthenticated = true;
            this.router.navigate(['/dashboard']);
            this.userDetails = userDetails;
            return true; // Resolve the Observable with true for successful login
          } else {
            return false; // Resolve as false if the response or token is missing
          }
        })
      );
  }

  signup(user: { username: string; password: string }): Observable<boolean> {
    return this.http.post<any>(this.apiUrl + "/register", user)
      .pipe(
        map(response => {
          console.log("Success", response);
          this.router.navigate(['/dashboard']);
          return true; // Resolve the Observable with true for successful signup
        })
      );
  }

  logout(): void {
    this.isAuthenticated = false;
    localStorage.removeItem('token');
  }

  getUserDetails(): Observable<User> {
    return this.http.get<User>(this.apiUrl + "/"  + this.userDetails.Id);
  }

  isAuthenticatedUser(): boolean {
    return this.getIsAuthenticated();
  }

  private getIsAuthenticated(): boolean {
    return this.isAuthenticated;
  }
}
