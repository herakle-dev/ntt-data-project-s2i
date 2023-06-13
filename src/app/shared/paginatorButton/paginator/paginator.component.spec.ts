import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PaginatorComponent } from './paginator.component';
import { PaginatorService } from 'src/app/shared/services/paginator.service';

describe('PaginatorComponent', () => {
  let component: PaginatorComponent;
  let fixture: ComponentFixture<PaginatorComponent>;
  let paginatorService: PaginatorService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PaginatorComponent],
      providers: [PaginatorService],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaginatorComponent);
    component = fixture.componentInstance;
    paginatorService = TestBed.inject(PaginatorService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit pageChange event when goToNextPage is called', () => {
    spyOn(component.pageChange, 'emit');
    spyOn(paginatorService, 'getNextPage').and.returnValue(2);

    component.currentPage = 1;
    component.totalPages = 3;
    component.goToNextPage();

    expect(paginatorService.getNextPage).toHaveBeenCalledWith(1, 3);
    expect(component.pageChange.emit).toHaveBeenCalledWith(2);
  });

  it('should emit pageChange event when goToPage is called with a different page', () => {
    spyOn(component.pageChange, 'emit');
    spyOn(paginatorService, 'getPageInRange').and.returnValue(3);

    component.currentPage = 1;
    component.totalPages = 5;
    component.goToPage(3);

    expect(paginatorService.getPageInRange).toHaveBeenCalledWith(3, 5);
    expect(component.pageChange.emit).toHaveBeenCalledWith(3);
  });

  it('should not emit pageChange event when goToPage is called with the current page', () => {
    spyOn(component.pageChange, 'emit');

    component.currentPage = 2;
    component.totalPages = 4;
    component.goToPage(2);

    expect(component.pageChange.emit).not.toHaveBeenCalled();
  });

  it('should emit pageChange event when goToPreviousPage is called', () => {
    spyOn(component.pageChange, 'emit');
    spyOn(paginatorService, 'getPreviousPage').and.returnValue(1);

    component.currentPage = 2;
    component.totalPages = 4;
    component.goToPreviousPage();

    expect(paginatorService.getPreviousPage).toHaveBeenCalledWith(2);
    expect(component.pageChange.emit).toHaveBeenCalledWith(1);
  });
});
