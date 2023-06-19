import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { GetAllService } from './get-all.service';
import { HttpClient } from '@angular/common/http';

describe('GetAllService', () => {
  let service: GetAllService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [GetAllService]
    });
    service = TestBed.inject(GetAllService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should make GET requests with the provided Authorization header', () => {
    const perPage = 10;
    const url = 'https://gorest.co.in/public/v2/users';


    const authorizationHeader = 'mockToken';

    const expectedResponse = [
      // Mock response data here
    ];
    // Spy on the tokenService.getTokenFromLocalStorage() method and return the authorizationHeader value
    spyOn(service['tokenService'], 'getTokenFromLocalStorage').and.returnValue(authorizationHeader);

    service.getAllInApi(perPage, url).subscribe((response) => {
      // Verify response here
      expect(response).toEqual(expectedResponse);
    });

    const request = httpMock.expectOne(`${url}?page=1&per_page=${perPage}`);
  expect(request.request.method).toBe('GET');
    expect(request.request.headers.get('Authorization')).toBe(`Bearer ${authorizationHeader}`);

    request.flush(expectedResponse);
  });

  it('should cancel requests', () => {
    service.cancelRequests();

    // Verify that requests are cancelled
    expect(service.getRequestsComplete).toBe(false);
  });

  // Add more tests as needed for other methods and scenarios

});
