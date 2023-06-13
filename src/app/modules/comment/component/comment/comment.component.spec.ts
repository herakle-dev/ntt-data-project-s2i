import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CommentComponent } from './comment.component';
import { CommentService } from '../../services/comment.service';
import { of } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CommentFormComponent } from '../../comment-form/comment-form/comment-form.component';

describe('CommentComponent', () => {
  let component: CommentComponent;
  let fixture: ComponentFixture<CommentComponent>;
  let commentService: CommentService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CommentComponent, CommentFormComponent],
      imports:[HttpClientTestingModule],
      providers: [CommentService],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CommentComponent);
    component = fixture.componentInstance;
    commentService = TestBed.inject(CommentService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle commentShown and newCommentShow properties', () => {
    component.commentShown = false;
    component.newCommentShow = false;

    component.toggleComments();

    expect(component.commentShown).toBeTrue();
    expect(component.newCommentShow).toBeTrue();

    component.toggleComments();

    expect(component.commentShown).toBeFalse();
    expect(component.newCommentShow).toBeFalse();
  });

  it('should toggle newCommentShow property', () => {
    component.newCommentShow = false;

    component.newComment();

    expect(component.newCommentShow).toBeTrue();

    component.newComment();

    expect(component.newCommentShow).toBeFalse();
  });

  it('should get comments when getComments is called with a valid postId', () => {
    const postId = 1;
    const comments = [
      { id: 1, post_id: 1, body: 'Comment 1' },
      { id: 2, post_id: 1, body: 'Comment 2' },
    ];

    const getEveryPostCommentsSpy = spyOn(commentService, 'getEveryPostComments').and.returnValue(of(comments));

    component.getComments(postId);

    expect(getEveryPostCommentsSpy).toHaveBeenCalledTimes(1);
    expect(component.comments).toEqual(comments);
    expect(component.commentShown).toBeTrue();
    expect(component.selectedPostId).toBe(postId);
  });

  it('should toggle commentShown property when getComments is called with the same postId', () => {
    const postId = 1;
    const comments = [
      { id: 1, post_id: 1, body: 'Comment 1' },
      { id: 2, post_id: 1, body: 'Comment 2' },
    ];

    const getEveryPostCommentsSpy = spyOn(commentService, 'getEveryPostComments').and.returnValue(of(comments));

    component.selectedPostId = postId;
    component.commentShown = true;

    component.getComments(postId);

    expect(getEveryPostCommentsSpy).not.toHaveBeenCalled();
    expect(component.comments).toEqual([]);
    expect(component.commentShown).toBeFalse();
  });
});
