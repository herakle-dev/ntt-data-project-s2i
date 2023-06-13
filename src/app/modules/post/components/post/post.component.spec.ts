import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PostComponent } from './post.component';
import { PostService } from '../../services/post.service';
import { GetAllService } from 'src/app/shared/services/get-all.service';
import { DataSharingService } from 'src/app/shared/services/data-sharing.service';
import { PaginatorService } from 'src/app/shared/services/paginator.service';
import { Subject, of } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';
import { PaginatorModule } from 'src/app/shared/paginatorButton/paginator/paginator.module';
import { PostModule } from '../../post.module';

describe('PostComponent', () => {
  let component: PostComponent;
  let fixture: ComponentFixture<PostComponent>;
  let postService: PostService;
  let dataSharingService: DataSharingService;
  let getAllService: GetAllService;
  let paginatorService: PaginatorService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PostComponent],
      imports:[HttpClientTestingModule, FormsModule,PaginatorModule,PostModule],
      providers: [PostService, DataSharingService, GetAllService, PaginatorService],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PostComponent);
    component = fixture.componentInstance;
    postService = TestBed.inject(PostService);
    dataSharingService = TestBed.inject(DataSharingService);
    getAllService = TestBed.inject(GetAllService);
    paginatorService = TestBed.inject(PaginatorService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should retrieve all posts on initialization', () => {
    const allPosts = [
      { id: 1, title: 'Post 1', body: 'This is post 1' },
      { id: 2, title: 'Post 2', body: 'This is post 2' },
      { id: 3, title: 'Post 3', body: 'This is post 3' },
    ];
    const getAllPostsFullSpy = spyOn(dataSharingService, 'getAllPostsFull').and.returnValue(allPosts);
    const getAllPostsSpy = spyOn(postService, 'getAllPosts').and.returnValue(of([allPosts]));

    component.ngOnInit();

    expect(getAllPostsFullSpy).toHaveBeenCalled();
    expect(getAllPostsSpy).toHaveBeenCalled();
    expect(component.allPostsFull).toEqual(allPosts);
  });

  it('should update posts to display when search value changes', () => {
    const allPosts = [
      { id: 1, title: 'Post 1', body: 'This is post 1' },
      { id: 2, title: 'Post 2', body: 'This is post 2' },
      { id: 3, title: 'Post 3', body: 'This is post 3' },
    ];
    const updateItemsToDisplaySpy = spyOn(paginatorService, 'updateItemsToDisplay');
    component.allPostsFull = allPosts;

    component.searchValue = 'post';
    component.searchPosts();

    expect(updateItemsToDisplaySpy).toHaveBeenCalled();
  });

  it('should go to next page', () => {
    const getNextPageSpy = spyOn(paginatorService, 'getNextPage');
    component.goToNextPage();

    expect(getNextPageSpy).toHaveBeenCalled();
  });

  it('should go to previous page', () => {
    const getPreviousPageSpy = spyOn(paginatorService, 'getPreviousPage');

    component.goToPreviousPage();

    expect(getPreviousPageSpy).toHaveBeenCalled();
  });

  it('should change the number of posts to display per page', () => {
    const updatePostsToDisplaySpy = spyOn(component, 'updatePostsToDisplay');
    const perPage = 20;

    component.changePostsToDisplay(perPage);

    expect(updatePostsToDisplaySpy).toHaveBeenCalled();
    expect(component.sliderValue).toEqual(perPage);
  });
});
