import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { UserService } from '../../services/user.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

import { GetAllService } from 'src/app/shared/services/get-all.service';
import { PaginatorService } from 'src/app/shared/services/paginator.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent implements OnInit, OnDestroy {
  users: any[] = [];
  originalUsers: any[] = [];
  visiblePages: number[] = [];
@Input() userId:number
  sliderValue!: number;
  currentPage = 1;
  totalPages = 1;

  searchValue = '';
  isVisible = true;
  public unsubscribe$ = new Subject<void>();
  sharedUsers!:any[]
  errorCode: number | null = null;

  constructor(
    private userService: UserService,
    public recursiveGetService: GetAllService,
    private paginationService: PaginatorService,
    private title:Title


  ) {}

  ngOnInit() {
    const title= `Pagina utenti`
    this.title.setTitle(title)
    this.sliderValue = 10;
    this.onSliderChange()
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
    this.recursiveGetService.cancelRequests();
    this.recursiveGetService.resetCache();
  }
   getUsers(perPage: number) {
    this.recursiveGetService
      .getAllInApi(perPage, this.userService.allUsersUrl)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        (pages: any[][]) => {
          this.originalUsers = this.recursiveGetService.flattenResponseInPages(pages);
          this.searchUsers();
          this.updateUsersToDisplay();
        },
        (error: any) => {
          this.errorCode = error.status;
        }
      );
  }
  onSliderChange(): void {
    this.recursiveGetService.cancelRequests();
    this.recursiveGetService.resetCache();
    this.originalUsers=[]
    this.getUsers(this.sliderValue);
  }
  searchUsers(): void {
    if (this.searchValue.trim() === '') {
      this.users = this.originalUsers.slice();
    } else {
      this.users = this.originalUsers.filter((user) =>
        user.name.toLowerCase().includes(this.searchValue.toLowerCase())
      );
    }
    this.updateUsersToDisplay();
  }
  updateUsersToDisplay(): void {
    const allUsersToDisplay =
      this.searchValue.trim() === '' ? this.originalUsers : this.users;
    this.users = this.paginationService.updateItemsToDisplay(
      allUsersToDisplay,
      this.currentPage,
      this.sliderValue

    );
    this.totalPages = Math.ceil(allUsersToDisplay.length / this.sliderValue);
    this.updateVisiblePages();
  }
  // Switch pages logic
  goToNextPage(): void {
    this.currentPage = this.paginationService.getNextPage(
      this.currentPage,
      this.totalPages
    );
    this.updateUsersToDisplay();
  }
  goToPage(page: number): void {
    if (page === this.currentPage) {
      return;
    }
    this.currentPage = this.paginationService.getPageInRange(
      page,
      this.totalPages
    );
    this.updateUsersToDisplay();
  }

  goToPreviousPage(): void {
    this.currentPage = this.paginationService.getPreviousPage(this.currentPage);
    this.updateUsersToDisplay();
  }

  changeUsersToDisplay(perPage: number): void {
    this.sliderValue = perPage;
    this.updateUsersToDisplay();
  }

  updateVisiblePages(): void {
    this.visiblePages = this.paginationService.updateVisiblePages(
      this.currentPage,
      this.totalPages
    );
  }

  askForConsent(userId: number) {
    const question = confirm('Vuoi davvero eliminare questo utente?');
    if (question) {
      this.userService.deleteThisUser(userId).subscribe(
        () => {
          this.users.forEach((user) => {
            if (user.id === userId) {
              user.hide = true;
            }
          });
        },
        (error) => {
          this.errorCode = error.status;

        }
      );
    }
  }
}
