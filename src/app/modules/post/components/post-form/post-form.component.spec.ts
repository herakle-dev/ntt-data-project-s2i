import { TestBed, ComponentFixture } from '@angular/core/testing';
import { FormsModule, NgForm } from '@angular/forms';
import { PostFormComponent } from './post-form.component';
import { PostFormService } from '../../services/post-form.service';
import { DataSharingService } from 'src/app/shared/services/data-sharing.service';
import { GetAllService } from 'src/app/shared/services/get-all.service';
import { UserService } from 'src/app/modules/user/services/user.service';
import { of } from 'rxjs/internal/observable/of';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('PostFormComponent', () => {
  let component: PostFormComponent;
  let fixture: ComponentFixture<PostFormComponent>;
  let postFormService: PostFormService;
  let dataSharingService: DataSharingService;
  let getAllService: GetAllService;
  let userService: UserService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsModule, HttpClientTestingModule],
      declarations: [PostFormComponent],
      providers: [
        PostFormService,
        DataSharingService,
        GetAllService,
        UserService,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(PostFormComponent);
    component = fixture.componentInstance;
    postFormService = TestBed.inject(PostFormService);
    dataSharingService = TestBed.inject(DataSharingService);
    getAllService = TestBed.inject(GetAllService);
    userService = TestBed.inject(UserService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('should toggle sidebar form when calling toggleSidebarForm', () => {
    // Initial value of showSidebarForm
    expect(component.showSidebarForm).toBeFalse();

    // Call toggleSidebarForm method
    component.toggleSidebarForm();

    // Assert
    expect(component.showSidebarForm).toBeTrue();

    // Call toggleSidebarForm method again
    component.toggleSidebarForm();

    // Assert
    expect(component.showSidebarForm).toBeFalse();
  });
});
