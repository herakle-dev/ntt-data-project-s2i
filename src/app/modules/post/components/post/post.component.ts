import { Component,  OnDestroy, OnInit } from '@angular/core';
import { PostService } from '../../services/post.service';
import { GetAllService } from 'src/app/shared/services/get-all.service';
import { Subject, takeUntil } from 'rxjs';
import { PaginatorService } from 'src/app/shared/services/paginator.service';
import { DataSharingService } from 'src/app/shared/services/data-sharing.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css'],
})
export class PostComponent implements OnInit, OnDestroy {
  allPostsFull!: any[];
  posts: any[] = [];
  originalUsers: any[] = [];
  sliderValue = 100;
  currentPage = 1;
  totalPages = 1;
  visiblePages: number[] = [];
  searchValue: string = '';
  private unsubscribe$ = new Subject<void>();


  selectedPostId: number | null = null;
  sharedPosts!: any[];

  constructor(
    private postService: PostService,
    private dataSharingService: DataSharingService,
    public recursiveGetService: GetAllService,
    private paginationService: PaginatorService
  ) {}
  ngOnInit(): void {
    this.retriveAllPosts();
    this.sharedPosts = this.dataSharingService.getAllPostsFull(); // Ottieni i dati dei post condivisi dal servizio

  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
    this.recursiveGetService.cancelRequests();
    this.recursiveGetService.resetCache();
  }

  retriveAllPosts() {
    this.postService
      .getAllPosts()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        (pages: any[][]) => {
          this.allPostsFull = this.recursiveGetService.flattenResponseInPages(pages);

            this.dataSharingService.setAllPostsFull(this.allPostsFull); // Condividi i dati con il servizio

          this.posts.forEach((post) => {
            const postId = post.id;
            //console.log(postId);
            });
          this.searchPosts();
          this.updatePostsToDisplay();
        },
        (error: any) => {
          console.error(error);
        }
      );
  }
  searchPosts(): void {
    if (this.allPostsFull && this.searchValue.trim() === '') {
      this.posts = this.allPostsFull.slice();
    } else if (this.allPostsFull) {
      this.posts = this.allPostsFull.filter((post) => {
        const lowerCaseBody = post.body?.toLowerCase() ?? '';
        const lowerCaseTitle = post.title?.toLowerCase() ?? '';

        return (
          lowerCaseBody.includes(this.searchValue.toLowerCase()) ||
          lowerCaseTitle.includes(this.searchValue.toLowerCase())
        );
      });
    }


    this.updatePostsToDisplay();
  }


  updatePostsToDisplay(): void {
    const allPostsToDisplay =
      this.searchValue.trim() === '' ? this.allPostsFull : this.posts;
    this.posts = this.paginationService.updateItemsToDisplay(
      allPostsToDisplay,
      this.currentPage,
      this.sliderValue
    );
    this.totalPages = Math.ceil(allPostsToDisplay.length / this.sliderValue);
    this.updateVisiblePages();
  }

  goToNextPage(): void {
    this.currentPage = this.paginationService.getNextPage(
      this.currentPage,
      this.totalPages
    );
    this.updatePostsToDisplay();
  }

  goToPage(page: number): void {
    if (page === this.currentPage) {
      return;
    }
    this.currentPage = this.paginationService.getPageInRange(
      page,
      this.totalPages
    );
    this.updatePostsToDisplay();
  }

  goToPreviousPage(): void {
    this.currentPage = this.paginationService.getPreviousPage(this.currentPage);
    this.updatePostsToDisplay();
  }

  changePostsToDisplay(perPage: number): void {
    this.sliderValue = perPage;
    this.updatePostsToDisplay();
  }

  updateVisiblePages(): void {
    this.visiblePages = this.paginationService.updateVisiblePages(
      this.currentPage,
      this.totalPages
    );
  }


}
