import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { UserDetailsComponent } from './user-details.component';
import { UserDetailsService } from '../../services/user-details.service';
import { CommentService } from 'src/app/modules/comment/services/comment.service';
import { HttpErrorResponse } from '@angular/common/http';
import { of, throwError } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('UserDetailsComponent', () => {
  let component: UserDetailsComponent;
  let fixture: ComponentFixture<UserDetailsComponent>;
  let userDetailsService: UserDetailsService;
  let commentService: CommentService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserDetailsComponent],
      imports:[HttpClientTestingModule],
      providers: [
        UserDetailsService,
        CommentService
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserDetailsComponent);
    component = fixture.componentInstance;
    userDetailsService = TestBed.inject(UserDetailsService);
    commentService = TestBed.inject(CommentService);
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('should get user detail and set title', () => {
      const user = { id: 1, name: 'John Doe' };
      const getUserDetailSpy = spyOn(userDetailsService, 'getUserDetail').and.returnValue(of(user));
      const setTitleSpy = spyOn(component.title, 'setTitle');

      component.ngOnInit();

      expect(getUserDetailSpy).toHaveBeenCalled();
      expect(setTitleSpy).toHaveBeenCalledWith('Profilo di John Doe');
      expect(component.user).toEqual(user);
      expect(component.userId).toEqual(1);
      expect(component.errorCode).toBeNull();
    });

    it('should handle error', () => {
      const errorResponse = new HttpErrorResponse({ status: 500 });
      spyOn(userDetailsService, 'getUserDetail').and.returnValue(throwError(errorResponse));

      component.ngOnInit();

      expect(component.errorCode).toBe(500);
    });
  });

  describe('showPosts', () => {
    beforeEach(() => {
      component.user = { id: 1 };
    });

    it('should retrieve user posts and comments', () => {
      const allPosts = [{ id: 1 }, { id: 2 }, { id: 3 }];
      const getAllUserPostSpy = spyOn(userDetailsService, 'getAllUserPost').and.returnValue(of(allPosts));
      const getEveryPostCommentsSpy = spyOn(commentService, 'getEveryPostComments').and.stub();

      component.showPosts();

      expect(getAllUserPostSpy).toHaveBeenCalledWith();
      expect(getEveryPostCommentsSpy).toHaveBeenCalledTimes(allPosts.length);
      expect(component.userPosts).toEqual(allPosts);
      expect(component.postShown).toBe(true);
      expect(component.errorCode).toBeNull();
    });

    it('should handle error', () => {
      const errorResponse = new HttpErrorResponse({ status: 500 });
      spyOn(userDetailsService, 'getAllUserPost').and.returnValue(throwError(errorResponse));

      component.showPosts();

      expect(component.errorCode).toBe(500);
    });
  });
});
