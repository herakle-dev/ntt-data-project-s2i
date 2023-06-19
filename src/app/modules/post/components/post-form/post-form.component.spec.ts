import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PostFormComponent } from './post-form.component';
import { RouterTestingModule } from '@angular/router/testing';
import { GetAllService } from 'src/app/shared/services/get-all.service';
import { UserService } from 'src/app/modules/user/services/user.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { UikitModule } from 'src/app/shared/uikit/uikit.module';

describe('PostFormComponent', () => {
  let component: PostFormComponent;
  let fixture: ComponentFixture<PostFormComponent>;
  let getAllService: jasmine.SpyObj<GetAllService>;
  let userService: jasmine.SpyObj<UserService>;

  beforeEach(async () => {
    const getAllServiceSpy = jasmine.createSpyObj('GetAllService', ['getAllInApi', 'flattenResponseInPages']);
    const userServiceSpy = jasmine.createSpyObj('UserService', ['allUsersUrl']);

    await TestBed.configureTestingModule({
      declarations: [PostFormComponent],
      imports: [RouterTestingModule, HttpClientTestingModule,UikitModule  ],
      providers: [
        { provide: GetAllService, useValue: getAllServiceSpy },
        { provide: UserService, useValue: userServiceSpy }
      ]
    }).compileComponents();

    getAllService = TestBed.inject(GetAllService) as jasmine.SpyObj<GetAllService>;
    userService = TestBed.inject(UserService) as jasmine.SpyObj<UserService>;

    fixture = TestBed.createComponent(PostFormComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get users for a new post', () => {
    component.users = []; // Simulate empty users array
    userService.allUsersUrl = 'mock/allUsersUrl';
    getAllService.flattenResponseInPages.and.returnValue(['user1', 'user2']); // Mock flattened user array

    component.getUsersForPost();

    expect(component.clicked).toBeTrue();
    expect(getAllService.getAllInApi).toHaveBeenCalledWith(100, 'mock/allUsersUrl');
    expect(component.users).toEqual(['user1', 'user2']);
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

