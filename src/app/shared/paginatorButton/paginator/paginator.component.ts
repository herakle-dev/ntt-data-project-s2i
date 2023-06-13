import { Component, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { PaginatorService } from 'src/app/shared/services/paginator.service';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.css'],
})
export class PaginatorComponent implements OnChanges {
  @Input() currentPage = 1;
  @Input() totalPages = 1;
  @Output() pageChange: EventEmitter<number> = new EventEmitter<number>();

  visiblePages: number[] = [];
sliderValue!:number;
users!:any[]
  constructor(private paginationService: PaginatorService) {}

  ngOnChanges(): void {
    this.updateVisiblePages();
  }

  goToNextPage(): void {
    const nextPage = this.paginationService.getNextPage(
      this.currentPage,
      this.totalPages
    );
    this.changePage(nextPage);
  }

  goToPage(page: number): void {
    if (page === this.currentPage) {
      return;
    }
    const validPage = this.paginationService.getPageInRange(
      page,
      this.totalPages
    );
    this.changePage(validPage);
  }

  goToPreviousPage(): void {
    const previousPage = this.paginationService.getPreviousPage(this.currentPage);
    this.changePage(previousPage);
  }

  private changePage(page: number): void {
    this.pageChange.emit(page);
  }

  private updateVisiblePages(): void {
    this.visiblePages = this.paginationService.updateVisiblePages(
      this.currentPage,
      this.totalPages
    );
  }
}
