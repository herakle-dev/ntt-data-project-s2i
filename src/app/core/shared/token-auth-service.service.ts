import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpResponse,
  HttpErrorResponse,
} from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class TokenAuthServiceService {
  public isUserLogged = false; // Indicates whether the user is logged in or not
  public url = 'https://gorest.co.in/public/v2/users'; // Base URL to check bearer token

  constructor(private http: HttpClient, private route: Router) {
    const token = this.getTokenFromLocalStorage();
    if (token) {
      this.isUserLogged = true; // Check if token already exists in local storage
    }
  }

  /**
   * Verifies the bearer token based on the HTTP response code
   * @param token The bearer token to be verified
   * @returns A boolean indicating if the token is valid or not
   */
  verifyBearerToken(token: string): boolean {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    this.http
      .get<boolean>(this.url, { headers, observe: 'response' })
      .subscribe(
        (response: HttpResponse<any>) => {
          const statusCode = response.status;
          if (statusCode === 200) {
            this.saveToken(token, statusCode);
            this.route.navigate(['/user']);
            this.isUserLogged = true;
          } else {
            this.handleAuthenticationError(statusCode);
          }
        },
        (error: HttpErrorResponse) => {
          this.handleAuthenticationError(error.status);
        }
      );

    return this.isUserLogged;
  }

  /**
   * Handles authentication errors and performs necessary actions
   * @param statusCode The HTTP status code of the error
   */
  private handleAuthenticationError(statusCode: number): void {
    this.deleteToken();
    this.route.navigate(['/login']);
    this.isUserLogged = false;
    console.log('Authentication error. Code:', statusCode);
  }

  /**
   * Saves the token to the local storage
   * @param token The bearer token to be saved
   * @param statusCode The HTTP status code indicating the success of the token saving operation
   */
  private saveToken(token: string, statusCode: number): void {
    if (statusCode === 200) {
      localStorage.setItem('access_token', token);
    } else {
      console.error('Error while saving the token:', statusCode);
    }
  }

  /**
   * Retrieves the token from the local storage
   * @returns The bearer token if it exists, otherwise null
   */
  getToken(): string | null {
    return localStorage.getItem('access_token');
  }

  /**
   * Deletes the token from the local storage
   */
  deleteToken(): void {
    localStorage.removeItem('access_token');
    this.isUserLogged = false;
  }

  /**
   * Retrieves the token from the local storage
   * @returns The bearer token if it exists, otherwise null
   */
  public getTokenFromLocalStorage(): string | null {
    return localStorage.getItem('access_token');
  }
}
