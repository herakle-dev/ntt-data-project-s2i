import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class TokenAuthServiceService {
  public isUserLogged = false;
  private url = 'https://gorest.co.in/public/v2/users';

  constructor(private http: HttpClient, private route: Router) {
    const token = this.getTokenFromLocalStorage();
    if (token) {
      this.isUserLogged = true;
    }
  }

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

  private handleAuthenticationError(statusCode: number): void {
    this.deleteToken();
    this.route.navigate(['/login']);
    this.isUserLogged = false;
    console.log('Errore di autenticazione. Codice:', statusCode);
  }

  private saveToken(token: string, statusCode: number): void {
    if (statusCode === 200) {
      localStorage.setItem('access_token', token);
    } else {
      console.error('Errore durante il salvataggio del token:', statusCode);
    }
  }


  getToken(): string | null {
    return localStorage.getItem('access_token');
  }

  deleteToken(): void {
    localStorage.removeItem('access_token');
    this.isUserLogged = false;
  }

  public getTokenFromLocalStorage(): string | null {
    return localStorage.getItem('access_token');
  }
}
