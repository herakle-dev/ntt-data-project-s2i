import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { GetAllService } from './get-all.service';

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

  it('should make GET request with the correct URL and headers', () => {
    const perPage = 10;
    const url = 'https://gorest.co.in/public/v2/users';
    const authorizationHeader = 'mockToken';

    spyOn(service['tokenService'], 'getTokenFromLocalStorage').and.returnValues(null, authorizationHeader);

    service.getAllInApi(perPage, url).subscribe((response) => {
      expect(response).toBeTruthy();
    });

    const request = httpMock.expectOne(`${url}?page=1&per_page=${perPage}`);
    expect(request.request.method).toBe('GET');
    expect(request.request.headers.get('Authorization')).toContain('Bearer');

    request.flush([]);
  });




  it('should flatten pages into a single array', () => {
    const pages = [[1, 2, 3], [4, 5, 6], [7, 8, 9], [10]];
    const expectedArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

    const result = service.flattenResponseInPages(pages);

    expect(result).toEqual(expectedArray);
  });

});
