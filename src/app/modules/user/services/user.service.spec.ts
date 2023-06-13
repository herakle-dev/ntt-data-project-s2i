import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { UserService } from './user.service';
import { GetAllService } from 'src/app/shared/services/get-all.service';

describe('UserService', () => {
  let service: UserService;
  let httpMock: HttpTestingController;
  let getAllService: GetAllService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UserService, GetAllService],
    });
    service = TestBed.inject(UserService);
    httpMock = TestBed.inject(HttpTestingController);
    getAllService = TestBed.inject(GetAllService);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should delete a user', () => {
    const userId = 123;

    service.deleteThisUser(userId).subscribe((response) => {
      expect(response).toBeDefined();
      // Effettua ulteriori asserzioni sulla risposta del servizio se necessario
    });

    const deleteUrl = `${service.allUsersUrl}/${userId}`;
    const req = httpMock.expectOne(deleteUrl);
    expect(req.request.method).toBe('DELETE');
    expect(req.request.headers.get('Authorization')).toBe(getAllService.headers.get('Authorization')); // Verifica l'header

    req.flush({}); // Simula una risposta vuota dal server
  });
});
