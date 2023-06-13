import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from '../../services/user.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

import { GetAllService } from 'src/app/shared/services/get-all.service';
import { PaginatorService } from 'src/app/shared/services/paginator.service';
import { DataSharingService } from 'src/app/shared/services/data-sharing.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent implements OnInit, OnDestroy {
  users: any[] = [];
  originalUsers: any[] = [];
  visiblePages: number[] = [];

  sliderValue!: number;
  currentPage = 1;
  totalPages = 1;

  searchValue = '';
  isVisible = true;
  public unsubscribe$ = new Subject<void>();
  sharedUsers!:any[]
  constructor(
    private userService: UserService,
    private dataSharingService: DataSharingService,
    public recursiveGetService: GetAllService,
    private paginationService: PaginatorService,

  ) {}

  ngOnInit() {
    this.sliderValue = 10;
    this.onSliderChange()
    this.originalUsers = this.dataSharingService.getOriginalUsers();
console.log(this)
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
    this.recursiveGetService.cancelRequests();
    this.recursiveGetService.resetCache();
    console.log(this)

  }
   fullUsers(perPage: number) {
    this.recursiveGetService
      .getAllInApi(perPage, this.userService.allUsersUrl)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        (pages: any[][]) => {
          this.originalUsers = this.recursiveGetService.flattenResponseInPages(pages);
            this.dataSharingService.setOriginalUsers(this.originalUsers);
          this.searchUsers();
          this.updateUsersToDisplay();
        },
        (error: any) => {
          console.error(error);
        }
      );
  }
  onSliderChange(): void {
    this.recursiveGetService.cancelRequests();
    this.recursiveGetService.resetCache();
    this.originalUsers=[]
    this.fullUsers(this.sliderValue);
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
        (response) => {
          console.log(response);
          this.users.forEach((user) => {
            if (user.id === userId) {
              user.hide = true;
            }
          });
        },
        (error) => {
          alert(
            `Errore : ${error.status}, utente non trovato. Ricarica la pagina.`
          );
          console.log(error);
        }
      );
    }
  }
}
