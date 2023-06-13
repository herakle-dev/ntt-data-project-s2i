import { TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { PostService } from './post.service';
import { GetAllService } from 'src/app/shared/services/get-all.service';

describe('PostService', () => {
  let service: PostService;
  let getAllServiceMock: Partial<GetAllService>;

  beforeEach(() => {
    getAllServiceMock = {
      getAllInApi: (perPage: number, url: string) => {
        // Simulate the response of getAllInApi method
        // Return a mock data for testing purposes
        const mockPages: any[][] = [[{ id: 1, title: 'Post 1' }], [{ id: 2, title: 'Post 2' }]];
        return of(mockPages);
      }
    };

    TestBed.configureTestingModule({
      providers: [
        PostService,
        { provide: GetAllService, useValue: getAllServiceMock }
      ]
    });
    service = TestBed.inject(PostService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get all posts', () => {
    const expectedPosts = [
      { id: 1, title: 'Post 1' },
      { id: 2, title: 'Post 2' }
    ];

    let posts: any[] = [];
    service.getAllPosts().subscribe((result) => {
      posts = result;
    });

    expect(posts).toEqual(expectedPosts);
  });
});
