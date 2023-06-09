import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PaginatorService {
  perPage!: number;
  constructor() {}

  getNextPage(currentPage: number, totalPages: number): number {
    return Math.min(currentPage + 1, totalPages);
  }

  getPreviousPage(currentPage: number): number {
    return Math.max(currentPage - 1, 1);
  }

  getPageInRange(page: number, totalPages: number): number {
    return Math.max(1, Math.min(page, totalPages));
  }

  updateVisiblePages(currentPage: number, totalPages: number): number[] {
    const visiblePages: number[] = [];
    const startPage = Math.max(1, currentPage - 1);
    const endPage = Math.min(startPage + 2, totalPages);
    for (let i = startPage; i <= endPage; i++) {
      visiblePages.push(i);
    }
    return visiblePages;
  }
  updateItemsToDisplay(
    allItemsToDisplay: any[],
    currentPage: number,
    sliderValue: number
  ): any[] {
    const startIndex = (currentPage - 1) * sliderValue;
    const endIndex = startIndex + sliderValue;
    return allItemsToDisplay.slice(startIndex, endIndex);
  }

}
