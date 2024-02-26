import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'https://localhost:7228/api/user';
  private user: any;  // Cache for user details

  constructor(private http: HttpClient) {}

  // Register a new user
  registerUser(userDetails: any): Observable<any> {
    const url = `${this.apiUrl}/register`;
    return this.http.post(url, userDetails, { responseType: 'text' })
      .pipe(
        map((response: any) => {
          console.log('Registration successful:', response);
          return response;
        }),
        catchError(this.handleError)
      );
  }

  // Log in a user
  loginUser(credentials: any): Observable<any> {
    const url = `${this.apiUrl}/login`;
    return this.http.post(url, credentials)
      .pipe(
        map((response: any) => {
          console.log('Login successful:', response);
          this.user = response;  // Cache the user details for future use
          return response;
        }),
        catchError(this.handleError)
      );
  }

  // Logout
  // Logout
logout(): Observable<any> {
  const url = `${this.apiUrl}/logout`;
  return this.http.post(url, {})
    .pipe(
      map(() => {
        console.log('Logout successful');
      }),
      catchError(this.handleError)
    );
}


  // Get user details
  getUserDetails(): Observable<any> {
    // Directly return the user details if available
    if (this.user) {
      return of(this.user);
    }

    // If not available, fetch user details using login endpoint
    const url = `${this.apiUrl}/login`;
    return this.http.post(url, {})
      .pipe(
        map((response: any) => {
          console.log('User details fetched successfully:', response);
          this.user = response;  // Cache the user details for future use
          return response;
        }),
        catchError(this.handleError)
      );
  }

  // Error handling
  private handleError(error: any) {
    console.error('API Error:', error);
    return throwError(error);  // Return the actual error for better debugging
  }
}  
