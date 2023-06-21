import { ComponentFixture, TestBed, waitForAsync, fakeAsync, tick } from '@angular/core/testing';
import { CommentComponent } from './comment.component';
import { CommentService } from '../../services/comment.service';
import { of } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CommentFormComponent } from '../comment-form/comment-form.component';

describe('CommentComponent', () => {
  let component: CommentComponent;
  let fixture: ComponentFixture<CommentComponent>;
  let commentService: CommentService;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [CommentComponent, CommentFormComponent],
      imports: [HttpClientTestingModule],
      providers: [CommentService],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommentComponent);
    component = fixture.componentInstance;
    commentService = TestBed.inject(CommentService);
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

  it('should get comments when getComments is called with a valid postId', fakeAsync(() => {
    const postId = 1;
    const comments = [
      { id: 1, post_id: 1, body: 'Comment 1' },
      { id: 2, post_id: 1, body: 'Comment 2' },
    ];

    spyOn(commentService, 'getEveryPostComments').and.returnValue(of(comments));

    component.getComments(postId);

    tick();

    expect(commentService.getEveryPostComments).toHaveBeenCalledWith(postId);
    expect(component.comments).toEqual(comments);
    expect(component.commentShown).toBeTrue();
    expect(component.selectedPostId).toBe(postId);
  }));

});
