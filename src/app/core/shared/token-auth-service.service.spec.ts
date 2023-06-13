import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { TokenAuthServiceService } from './token-auth-service.service';
import {  HttpResponse } from '@angular/common/http';
import { UserComponent } from 'src/app/modules/user/components/user/user.component';

describe('TokenAuthServiceService', () => {
  let service: TokenAuthServiceService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([{path:'user', component:UserComponent}] )],
      providers: [TokenAuthServiceService],
    });
    service = TestBed.inject(TokenAuthServiceService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should verify bearer token and navigate to user page if token is valid', () => {
    const mockToken = 'mockToken';
    const mockResponse = new HttpResponse<boolean>({ status: 200, body: true });

    service.verifyBearerToken(mockToken);

    const req = httpMock.expectOne(service.url);
    expect(req.request.method).toBe('GET');
    expect(req.request.headers.get('Authorization')).toBe(`Bearer ${mockToken}`);
    req.flush(mockResponse);

    expect(service.isUserLogged).toBeTruthy();
    // Add additional expectations for navigation if needed
  });

  it('should save the token to local storage if the status code is 200', () => {
    const mockToken = 'mockToken';
    const statusCode = 200;
expect(location.pathname==='/user');
    spyOn(localStorage, 'setItem');

    service['saveToken'](mockToken, statusCode);

    expect(localStorage.setItem).toHaveBeenCalledWith('access_token', mockToken);


  });

  it('should not save the token to local storage if the status code is not 200', () => {
    const mockToken = 'mockToken';
    const statusCode = 401;

    spyOn(console, 'error');
    spyOn(localStorage, 'setItem');

    service['saveToken'](mockToken, statusCode);

    expect(localStorage.setItem).not.toHaveBeenCalled();
    expect(console.error).toHaveBeenCalledWith('Error while saving the token:', statusCode);
  });

  it('should delete the token from local storage', () => {
    spyOn(localStorage, 'removeItem');
    service.isUserLogged = true;

    service.deleteToken();

    expect(localStorage.removeItem).toHaveBeenCalledWith('access_token');
    expect(service.isUserLogged).toBeFalsy();
  });

  it('should retrieve the token from local storage', () => {
    const mockToken = 'mockToken';

    spyOn(localStorage, 'getItem').and.returnValue(mockToken);

    const token = service.getToken();

    expect(localStorage.getItem).toHaveBeenCalledWith('access_token');
    expect(token).toBe(mockToken);
  });

  it('should retrieve the token from local storage', () => {
    const mockToken = 'mockToken';

    spyOn(localStorage, 'getItem').and.returnValue(mockToken);

    const token = service.getTokenFromLocalStorage();

    expect(localStorage.getItem).toHaveBeenCalledWith('access_token');
    expect(token).toBe(mockToken);
  });

});
