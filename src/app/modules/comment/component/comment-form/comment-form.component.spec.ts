import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormsModule, NgForm } from '@angular/forms';
import { CommentFormComponent } from './comment-form.component';
import { CommentService } from '../../services/comment.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

describe('CommentFormComponent', () => {
  let component: CommentFormComponent;
  let fixture: ComponentFixture<CommentFormComponent>;
  let commentService: CommentService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, FormsModule, HttpClientTestingModule],
      declarations: [CommentFormComponent],
      providers: [CommentService],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CommentFormComponent);
    component = fixture.componentInstance;
    commentService = TestBed.inject(CommentService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('should not submit form if invalid', () => {
    const form: NgForm = {
      invalid: true,
      resetForm: jasmine.createSpy('resetForm'),
    } as any;

    const sendCommentAtPostSpy = spyOn(commentService, 'sendCommentAtPost').and.returnValue(of({}));

    component.submitForm(form);

    expect(form.invalid).toBeTrue();
    expect(sendCommentAtPostSpy).not.toHaveBeenCalled();
    expect(form.resetForm).not.toHaveBeenCalled();
  });
});
