import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PostFormService } from '../../services/post-form.service';
import { GetAllService } from 'src/app/shared/services/get-all.service';
import { UserService } from 'src/app/modules/user/services/user.service';
import { Router } from '@angular/router';
import { MatSelect } from '@angular/material/select';

@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.css'],
})
export class PostFormComponent implements OnInit {
  constructor(
    private postFormService: PostFormService,
    public getAllService: GetAllService,
    public userService: UserService,
    private router: Router
  ) {}

  selectedUserId!: number;
  showSidebarForm = false;
  errorCode: number | null = null;

  clicked = false;
  currentUrl: string;

  user: any;
  users: any[] = [];

  usersFetched=false
  @Input() userId?: number;
  @Input() userName: string;
  formData: any = {
    userId: this.userId,
    title: '',
    body: '',
  };

  ngOnInit(): void {
    this.currentUrl = this.router.url;



  }

  getUsersForPost() {
    this.clicked = true;
    this.usersFetched = true;
    if (this.users.length === 0 && location.pathname == '/post') {

      this.getAllService
        .getAllInApi(100, this.userService.allUsersUrl)
        .subscribe(
          (pages: any[][]) => {

            this.users = this.getAllService.flattenResponseInPages(pages);
            this.users = this.users.filter((user) => user.name);
            this.users.sort((a, b) => a.name.localeCompare(b.name))


          },
          (error: any) => {
            this.errorCode = error.status;
          }
        );

    }
  }


  submitForm(form: NgForm) {
    if (form.invalid) {
      return;
    }
    const post = {
      userId: this.selectedUserId,
      title: this.formData.title,
      body: this.formData.body,
    };
    if (this.userId) {
      this.selectedUserId = this.userId;
    }
    this.postFormService.newPostUrl = `https://gorest.co.in/public/v2/users/${this.selectedUserId}/posts`;
    this.postFormService.createPost(post).subscribe(
      () => {
        alert(`Post creato con successo !`);
        location.reload();
      },
      (error) => {
        // Handle error response
        this.errorCode = error.status;
      }
    );
  }
  toggleSidebarForm() {
    this.showSidebarForm = !this.showSidebarForm;
  }
}
