import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserComponent } from './user.component';
import { UserService } from '../../services/user.service';
import { GetAllService } from 'src/app/shared/services/get-all.service';
import { PaginatorService } from 'src/app/shared/services/paginator.service';
import { Title } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { PaginatorModule } from 'src/app/shared/paginatorButton/paginator/paginator.module';
import { UikitModule } from 'src/app/shared/uikit/uikit.module';
import { UserFormModule } from '../user-form/user-form.module';

describe('UserComponent', () => {
  let component: UserComponent;
  let fixture: ComponentFixture<UserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserComponent],
      imports: [FormsModule, HttpClientTestingModule,PaginatorModule,UikitModule,UserFormModule],
      providers: [
        UserService,
        GetAllService,
        PaginatorService,
        Title
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    fixture.destroy();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should set the title on initialization', () => {
    const titleService = TestBed.inject(Title);
    spyOn(titleService, 'setTitle');
    component.ngOnInit();
    expect(titleService.setTitle).toHaveBeenCalledWith('Pagina utenti');
  });

  it('should call onSliderChange method on slider value change', () => {
    spyOn(component, 'onSliderChange');
    component.sliderValue = 10;
    component.ngOnInit();
    expect(component.onSliderChange).toHaveBeenCalled();
  });



  it('should filter users based on search value', () => {
    component.originalUsers = [{ id: 1, name: 'User 1' }, { id: 2, name: 'User 2' }];
    component.searchValue = 'User 1';
    component.searchUsers();
    expect(component.users.length).toEqual(1);
    expect(component.users[0].name).toEqual('User 1');
  });

  it('should update users to display when currentPage changes', () => {
    component.originalUsers = [
      { id: 1, name: 'User 1' },
      { id: 2, name: 'User 2' },
      { id: 3, name: 'User 3' },
      { id: 4, name: 'User 4' },
      { id: 5, name: 'User 5' }
    ];
    component.sliderValue = 2;
    component.currentPage = 2;
    component.updateUsersToDisplay();
    expect(component.users.length).toEqual(2);
    expect(component.users[0].name).toEqual('User 3');
    expect(component.users[1].name).toEqual('User 4');
  });

  it('should go to the next page when goToNextPage is called', () => {
    component.currentPage = 2;
    component.totalPages = 3;
    component.goToNextPage();
    expect(component.currentPage).toEqual(3);
  });

  it('should go to the previous page when goToPreviousPage is called', () => {
    component.currentPage = 2;
    component.goToPreviousPage();
    expect(component.currentPage).toEqual(1);
  });

  it('should not change the page if goToPage is called with the same page', () => {
    component.currentPage = 2;
    component.totalPages = 5;
    component.goToPage(2);
    expect(component.currentPage).toEqual(2);
  });

  it('should change the page if goToPage is called with a different page', () => {
    component.currentPage = 2;
    component.totalPages = 5;
    component.goToPage(4);
    expect(component.currentPage).toEqual(4);
  });

  it('should change the number of users to display when changeUsersToDisplay is called', () => {
    component.sliderValue = 10;
    component.changeUsersToDisplay(5);
    expect(component.sliderValue).toEqual(5);
  });


});
