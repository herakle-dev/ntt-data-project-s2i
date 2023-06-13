import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserComponent } from './user.component';
import { UserService } from '../../services/user.service';
import { DataSharingService } from 'src/app/shared/services/data-sharing.service';
import { GetAllService } from 'src/app/shared/services/get-all.service';
import { PaginatorService } from 'src/app/shared/services/paginator.service';
import { takeUntil } from 'rxjs/operators';
import { Subject, of } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { UikitModule } from 'src/app/shared/uikit/uikit.module';
import { BigmoduleModule } from 'src/app/modules/bigmodule.module';
import { PaginatorModule } from 'src/app/shared/paginatorButton/paginator/paginator.module';
import { UserFormModule } from '../user-form/user-form.module';

describe('UserComponent', () => {
  let component: UserComponent;
  let fixture: ComponentFixture<UserComponent>;
  let userService: UserService;
  let dataSharingService: DataSharingService;
  let recursiveGetService: GetAllService;
  let paginationService: PaginatorService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserComponent],
      imports:[HttpClientTestingModule,UikitModule,PaginatorModule,UserFormModule],
      providers: [
        UserService,
        DataSharingService,
        GetAllService,
        PaginatorService,
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserComponent);
    component = fixture.componentInstance;
    userService = TestBed.inject(UserService);
    dataSharingService = TestBed.inject(DataSharingService);
    recursiveGetService = TestBed.inject(GetAllService);
    paginationService = TestBed.inject(PaginatorService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call onSliderChange method on slider value change', () => {
    spyOn(component, 'onSliderChange');
    component.sliderValue = 10;
    fixture.detectChanges();

    const sliderInput = fixture.nativeElement.querySelector('#sliderInput');
    sliderInput.dispatchEvent(new Event('input')); // Change 'change' to 'input'
    fixture.detectChanges();

    expect(component.onSliderChange).toHaveBeenCalled();
  });


  it('should update users array when searchValue is empty', () => {
    component.searchValue = '';
    component.originalUsers = [{ name: 'User 1' }, { name: 'User 2' }];
    component.searchUsers();

    expect(component.users).toEqual(component.originalUsers);
  });

  it('should update users array when searchValue is not empty', () => {
    component.searchValue = 'User';
    component.originalUsers = [{ name: 'User 1' }, { name: 'User 2' }];
    component.searchUsers();

    expect(component.users).toEqual([{ name: 'User 1' }, { name: 'User 2' }]);
  });

  it('should call paginationService.updateItemsToDisplay and updateVisiblePages when updateUsersToDisplay is called', () => {
    spyOn(paginationService, 'updateItemsToDisplay');
    spyOn(paginationService, 'updateVisiblePages');
    component.currentPage = 1;
    component.sliderValue = 10;
    component.originalUsers = [{ name: 'User 1' }, { name: 'User 2' }];
    component.updateUsersToDisplay();

    expect(paginationService.updateItemsToDisplay).toHaveBeenCalledWith(
      component.originalUsers,
      component.currentPage,
      component.sliderValue
    );
    expect(paginationService.updateVisiblePages).toHaveBeenCalled();
  });

  it('should call paginationService.getNextPage and updateUsersToDisplay when goToNextPage is called', () => {
    spyOn(paginationService, 'getNextPage');
    spyOn(component, 'updateUsersToDisplay');
    component.currentPage = 1;
    component.totalPages = 5;
    component.goToNextPage();

    expect(paginationService.getNextPage).toHaveBeenCalledWith(
      component.currentPage,
      component.totalPages
    );
    expect(component.updateUsersToDisplay).toHaveBeenCalled();
  });

  it('should call paginationService.getPageInRange and updateUsersToDisplay when goToPage is called', () => {
    spyOn(paginationService, 'getPageInRange');
    spyOn(component, 'updateUsersToDisplay');
    component.currentPage = 1;
    component.totalPages = 5;
    const page = 3;
    component.goToPage(page);

    expect(paginationService.getPageInRange).toHaveBeenCalledWith(
      page,
      component.totalPages
    );
    expect(component.updateUsersToDisplay).toHaveBeenCalled();
  });

  it('should call paginationService.getPreviousPage and updateUsersToDisplay when goToPreviousPage is called', () => {
    spyOn(paginationService, 'getPreviousPage');
    spyOn(component, 'updateUsersToDisplay');
    component.currentPage = 2;
    component.goToPreviousPage();

    expect(paginationService.getPreviousPage).toHaveBeenCalledWith(
      component.currentPage
    );
    expect(component.updateUsersToDisplay).toHaveBeenCalled();
  });

  it('should update sliderValue and call updateUsersToDisplay when changeUsersToDisplay is called', () => {
    spyOn(component, 'updateUsersToDisplay');
    const perPage = 20;
    component.changeUsersToDisplay(perPage);

    expect(component.sliderValue).toBe(perPage);
    expect(component.updateUsersToDisplay).toHaveBeenCalled();
  });

  it('should call userService.deleteThisUser and update user.hide when askForConsent is called and question is confirmed', () => {
    spyOn(window, 'confirm').and.returnValue(true);
    spyOn(userService, 'deleteThisUser').and.returnValue(of({}));

    component.users = [
      { id: 1, hide: false },
      { id: 2, hide: false },
    ];
    component.askForConsent(1);

    expect(userService.deleteThisUser).toHaveBeenCalledWith(1);
    expect(component.users[0].hide).toBe(true);
  });

  it('should show alert when askForConsent is called and question is not confirmed', () => {
    spyOn(window, 'confirm').and.returnValue(false);
    spyOn(window, 'alert');

    component.askForConsent(1);
    expect(window.alert).toHaveBeenCalledTimes(0);
  });


  it('should call unsubscribe methods and reset cache on ngOnDestroy', () => {
    spyOn(recursiveGetService, 'cancelRequests');
    spyOn(recursiveGetService, 'resetCache');
    spyOn(component.unsubscribe$, 'next');
    spyOn(component.unsubscribe$, 'complete');

    component.ngOnDestroy();

    expect(recursiveGetService.cancelRequests).toHaveBeenCalled();
    expect(recursiveGetService.resetCache).toHaveBeenCalled();
    expect(component.unsubscribe$.next).toHaveBeenCalled();
    expect(component.unsubscribe$.complete).toHaveBeenCalled();
  });
});
