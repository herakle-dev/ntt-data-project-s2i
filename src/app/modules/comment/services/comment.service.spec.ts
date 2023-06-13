import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { CommentService } from './comment.service';
import { GetAllService } from 'src/app/shared/services/get-all.service';

describe('CommentService', () => {
  let commentService: CommentService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CommentService, GetAllService],
    });

    commentService = TestBed.inject(CommentService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should retrieve all comments for a post or empty array if no commments to display', () => {
    const postId = 1;
    const commentsUrl = `https://gorest.co.in/public/v2/posts/${postId}/comments?page=1&per_page=100`;
    const mockResponse = [];

    commentService.getEveryPostComments(postId).subscribe((comments) => {
      expect(comments).toEqual(mockResponse);
    });

    const req = httpTestingController.expectOne(commentsUrl);
    expect(req.request.method).toEqual('GET');
    req.flush(mockResponse);
  });

  it('should return an empty array if postId is null', () => {
    const postId = null;

    commentService.getEveryPostComments(postId).subscribe((comments) => {
      expect(comments).toEqual([]);
    });

    const req = httpTestingController.match(() => true);
    expect(req.length).toBe(0);
  });

  it('should send a comment to a post', () => {
    const postId = 1;
    const commentsUrl = `https://gorest.co.in/public/v2/posts/${postId}/comments`;
    const comment = { id: 1, postId: 1, name: 'New Comment' };
    const mockResponse = { id: 1, postId: 1, name: 'New Comment' };

    commentService.sendCommentAtPost(postId, comment).subscribe((response) => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpTestingController.expectOne(commentsUrl);
    expect(req.request.method).toEqual('POST');
    expect(req.request.body).toEqual(comment);
    req.flush(mockResponse);
  });
});
