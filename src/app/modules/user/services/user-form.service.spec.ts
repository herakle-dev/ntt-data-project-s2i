import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { GetAllService } from 'src/app/shared/services/get-all.service';
import { UserFormService } from './user-form.service';

describe('UserFormService', () => {
  let service: UserFormService;
  let httpMock: HttpTestingController;
  let getAllService: GetAllService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UserFormService, GetAllService],
    });
    service = TestBed.inject(UserFormService);

    httpMock = TestBed.inject(HttpTestingController);
    getAllService = TestBed.inject(GetAllService);

    // Modifica l'header del service utilizzando il valore da GetAllService
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should create a new user', () => {
    const user = { name: 'John Doe', email: 'john@example.com' };

    service.createUser(user).subscribe((response) => {
      expect(response).toBeDefined();
      // Effettua ulteriori asserzioni sulla risposta del servizio se necessario
    });

    const req = httpMock.expectOne(service.newUserUrl);
    expect(req.request.method).toBe('POST');
    expect(req.request.headers.get('Authorization')).toBe(getAllService.headers.get('Authorization')); // Verifica l'header

    req.flush({}); // Simula una risposta vuota dal server
  });
});
