import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { AuthGuard } from '../auth/guard.guard';
import { TokenAuthServiceService } from '../shared/token-auth-service.service';

describe('AuthGuard', () => {
  let guard: AuthGuard;
  let tokenAuthService: TokenAuthServiceService;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule],
      providers: [AuthGuard, TokenAuthServiceService],
    });

    guard = TestBed.inject(AuthGuard);
    tokenAuthService = TestBed.inject(TokenAuthServiceService);
    router = TestBed.inject(Router);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('should return true and allow access if token is saved in local storage', () => {
    spyOn(tokenAuthService, 'getTokenFromLocalStorage').and.returnValue('mockToken');

    const canActivate = guard.canActivate();

    expect(tokenAuthService.getTokenFromLocalStorage).toHaveBeenCalled();
    expect(canActivate).toBe(true);
  });
  it('should return false and navigate to login page if token is not saved in local storage', () => {
    spyOn(tokenAuthService, 'getTokenFromLocalStorage').and.returnValue(null);
    spyOn(router, 'navigateByUrl');

    const canActivate = guard.canActivate();

    expect(tokenAuthService.getTokenFromLocalStorage).toHaveBeenCalled();
    expect(canActivate).toBe(false);
    expect(location.pathname==='/login');
  });
});
