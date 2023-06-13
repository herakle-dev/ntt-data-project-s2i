import { TestBed } from '@angular/core/testing';
import { PaginatorService } from './paginator.service';

describe('PaginatorService', () => {
  let service: PaginatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PaginatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return the next page', () => {
    const currentPage = 2;
    const totalPages = 5;
    const nextPage = service.getNextPage(currentPage, totalPages);
    expect(nextPage).toBe(3);
  });

  it('should return the previous page', () => {
    const currentPage = 3;
    const previousPage = service.getPreviousPage(currentPage);
    expect(previousPage).toBe(2);
  });

  it('should return the page in range', () => {
    const page = 5;
    const totalPages = 7;
    const pageInRange = service.getPageInRange(page, totalPages);
    expect(pageInRange).toBe(5);
  });

  it('should update visible pages', () => {
    const currentPage = 3;
    const totalPages = 7;
    const visiblePages = service.updateVisiblePages(currentPage, totalPages);
    expect(visiblePages).toEqual([2, 3, 4]);
  });

  it('should update items to display', () => {
    const allItemsToDisplay = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const currentPage = 2;
    const sliderValue = 3;
    const itemsToDisplay = service.updateItemsToDisplay(allItemsToDisplay, currentPage, sliderValue);
    expect(itemsToDisplay).toEqual([4, 5, 6]);
  });
});
