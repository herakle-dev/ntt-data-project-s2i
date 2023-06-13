import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { TokenAuthServiceService } from '../shared/token-auth-service.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private tokenAuthService: TokenAuthServiceService,
    private router: Router
  ) {}
//Simple guard check if the token is saved in localstorage if true means user is logged
  canActivate(): boolean {
    if (this.tokenAuthService.getTokenFromLocalStorage()) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
