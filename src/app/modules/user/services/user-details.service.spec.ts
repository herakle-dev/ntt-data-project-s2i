import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { UserDetailsService } from './user-details.service';
import { UikitModule } from 'src/app/shared/uikit/uikit.module';

describe('UserDetailsService', () => {
  let service: UserDetailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule,UikitModule   ],
      providers: [UserDetailsService],
    });
    service = TestBed.inject(UserDetailsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should retrieve user details', () => {
    const userId = 1; // ID utente di prova
    service.getUserDetail().subscribe((response) => {
      expect(response).toBeDefined();
    });
  });

  it('should retrieve all user posts', () => {
    const userId = 1;
    service.getAllUserPost(userId).subscribe((posts) => {
      expect(posts).toBeDefined();
      expect(posts.length).toBeGreaterThan(0);
    });
  });

  it('should retrieve all comments for a post', () => {
    const postId = 1;
    service.getAllUserComments(postId).subscribe((comments) => {
      expect(comments).toBeDefined();
      expect(comments.length).toBeGreaterThan(0);
    });
  });
});
