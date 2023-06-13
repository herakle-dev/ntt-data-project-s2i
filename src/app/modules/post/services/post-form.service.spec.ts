import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { PostFormService } from './post-form.service';
import { GetAllService } from 'src/app/shared/services/get-all.service';

describe('PostFormService', () => {
  let service: PostFormService;
  let httpMock: HttpTestingController;
  let getAllService: GetAllService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [GetAllService, PostFormService],
    });
    service = TestBed.inject(PostFormService);
    httpMock = TestBed.inject(HttpTestingController);
    getAllService = TestBed.inject(GetAllService);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should send a POST request to create a new post', () => {
    const post = { title: 'Test Post', content: 'This is a test post' };
    const mockResponse = { id: 1, title: 'Test Post', content: 'This is a test post' };

    service.createPost(post).subscribe((response) => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(service.newPostUrl);
    expect(req.request.method).toBe('POST');
    expect(req.request.headers.get('Authorization')).toBe(getAllService.headers.get('Authorization'));
    expect(req.request.body).toEqual(post);

    req.flush(mockResponse);
  });
});
