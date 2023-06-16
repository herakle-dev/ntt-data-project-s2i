import { Component,  OnDestroy, OnInit } from '@angular/core';
import { PostService } from '../../services/post.service';
import { GetAllService } from 'src/app/shared/services/get-all.service';
import { Subject, share, takeUntil } from 'rxjs';
import { PaginatorService } from 'src/app/shared/services/paginator.service';
import { DataSharingService } from 'src/app/shared/services/data-sharing.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css'],
})
export class PostComponent implements OnInit, OnDestroy {
  //new array for that contain all posts in the api
  allPostsFull: any[];
  //then we split the allPostFull array in posts array that is an array with postPerPage items for each page
  posts: any[] = [];
  postPerPage = 100;
  //starting at page 1
  currentPage = 1;
  totalPages = 1;
  //array numbers that show how many pages we have to show
  visiblePages: number[] = [];
  searchValue = '';
  private unsubscribe$ = new Subject<void>();

  selectedPostId: number | null = null;

  constructor(
    private postService: PostService,
    public recursiveGetService: GetAllService,
    private paginationService: PaginatorService
  ) {}
  ngOnInit(): void {
    //oninit we retrive all posts
    this.retriveAllPosts();
    //assign shard post to datasharingservice
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

          // this.posts.forEach((post) => {
          // //  const postId = post.id;
          //   //console.log(postId);
          //   });
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
      this.postPerPage
    );
    this.totalPages = Math.ceil(allPostsToDisplay.length / this.postPerPage);
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
    this.postPerPage = perPage;
    this.updatePostsToDisplay();
  }

  updateVisiblePages(): void {
    this.visiblePages = this.paginationService.updateVisiblePages(
      this.currentPage,
      this.totalPages
    );
  }


}
