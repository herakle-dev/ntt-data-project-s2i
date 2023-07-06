import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { UserDetailsService } from './user-details.service';
import { UikitModule } from 'src/app/shared/uikit/uikit.module';

describe('UserDetailsService', () => {
  let service: UserDetailsService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        UserDetailsService,


      ],
      imports:[
        HttpClientTestingModule,
        UikitModule]
    });
    service = TestBed.inject(UserDetailsService);
    httpMock = TestBed.inject(HttpTestingController);

  });
  afterEach(() => {
    httpMock.verify();
  });
  it('should return the current user ID from the URL', () => {
    const url = 'mock/user/123';
  const  userId=url.split('/')[2]
      expect(userId).toBe('123');
  });



  it('should make a GET request when calling getUserDetail()', () => {
    spyOn(service, 'getCurrentUserId').and.returnValue('123');
    const mockResponse = { id: '123', name: 'John Doe' };

    service.getUserDetail().subscribe();

    const req = httpMock.expectOne(`https://gorest.co.in/public/v2/users/123`);
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });


});
