import { Component, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PostFormService } from '../../services/post-form.service';
import { DataSharingService } from 'src/app/shared/services/data-sharing.service';
import { GetAllService } from 'src/app/shared/services/get-all.service';
import { UserService } from 'src/app/modules/user/services/user.service';

@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.css'],
})
export class PostFormComponent {
  constructor(
    private postFormService: PostFormService,
    private dataSharingService: DataSharingService,
    private getAllService:GetAllService,
    private userService:UserService
  ) {}

  selectedUserId!: number;
  showSidebarForm = false;
  user: any;

  users: any[] = [];
  @Input() userId?: number;
  @Input() userName?: string;
  formData: any = {

    userId: this.userId,
    title: '',
    body: '',
  };
  ngOnInit() {
    console.log(this.userId)
    if (this.userId) {
      this.formData.userId = this.userId;
    }
    this.users = this.dataSharingService.getOriginalUsers();
    if(this.users.length===0 && location.pathname=='/post'){
this.getAllService.getAllInApi(100,this.userService.allUsersUrl)
.subscribe(
  (pages: any[][]) => {
    this.users = this.getAllService.flattenResponseInPages(pages);
      this.dataSharingService.setOriginalUsers(this.users);
      this.users=this.users.filter((user)=> user.name )
  },
  (error: any) => {
    console.error(error);
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
      body: this.formData.body
    };
     if (this.userId) {
      this.selectedUserId= this.userId;
    }
    this.postFormService.newPostUrl = `https://gorest.co.in/public/v2/users/${this.selectedUserId}/posts`;
    this.postFormService.createPost(post).subscribe(
      (response) => {
        console.log(response, 'post creato con successo!')
          location.reload()
      },
      (error) => {
        // Handle error response
        console.log('errore',error)
      }
    );
  }
  toggleSidebarForm() {
    this.showSidebarForm = !this.showSidebarForm;
  }
}
