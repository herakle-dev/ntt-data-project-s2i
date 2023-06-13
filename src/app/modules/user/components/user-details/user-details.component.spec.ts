import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { UserDetailsService } from '../../services/user-details.service';
import { CommentService } from 'src/app/modules/comment/services/comment.service';
import { UserDetailsComponent } from './user-details.component';

describe('UserDetailsComponent', () => {
  let component: UserDetailsComponent;
  let fixture: ComponentFixture<UserDetailsComponent>;

  beforeEach(() => {
    const userDetailsServiceStub = () => ({
      getUserDetail: () => ({ subscribe: f => f({}) }),
      getAllUserPost: userId => ({ subscribe: f => f({}) })
    });
    const commentServiceStub = () => ({ getEveryPostComments: postId => ({}) });
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [UserDetailsComponent],
      providers: [
        { provide: UserDetailsService, useFactory: userDetailsServiceStub },
        { provide: CommentService, useFactory: commentServiceStub }
      ]
    });
    fixture = TestBed.createComponent(UserDetailsComponent);
    component = fixture.componentInstance;
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });

  it(`userPosts has default value`, () => {
    expect(component.userPosts).toEqual([]);
  });

  it(`userComments has default value`, () => {
    expect(component.userComments).toEqual([]);
  });

  it(`posts has default value`, () => {
    expect(component.posts).toEqual([]);
  });

  it(`postShown has default value`, () => {
    expect(component.postShown).toEqual(false);
  });

  it(`commentShown has default value`, () => {
    expect(component.commentShown).toEqual(false);
  });

  describe('ngOnInit', () => {
    it('makes expected calls', () => {
      const userDetailsServiceStub: UserDetailsService = fixture.debugElement.injector.get(
        UserDetailsService
      );
      spyOn(userDetailsServiceStub, 'getUserDetail').and.callThrough();
      component.ngOnInit();
      expect(userDetailsServiceStub.getUserDetail).toHaveBeenCalled();
    });
  });

  describe('showPosts', () => {
    it('makes expected calls', () => {
      const userDetailsServiceStub: UserDetailsService = fixture.debugElement.injector.get(
        UserDetailsService
      );
      const commentServiceStub: CommentService = fixture.debugElement.injector.get(
        CommentService
      );
      spyOn(userDetailsServiceStub, 'getAllUserPost').and.callThrough();
      spyOn(commentServiceStub, 'getEveryPostComments').and.callThrough();
      component.showPosts();
      expect(userDetailsServiceStub.getAllUserPost).toHaveBeenCalled();
      expect(commentServiceStub.getEveryPostComments).toHaveBeenCalled();
    });
  });
});
