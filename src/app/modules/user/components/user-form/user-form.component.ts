import { Component } from '@angular/core';
import { UserFormService } from '../../services/user-form.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css'],
})
export class UserFormComponent {
  formData: any = {
    name: '',
    email: '',
    gender: '',
    status: '',
  };

  constructor(
    private userFormService: UserFormService,
    private router: Router
  ) {}
  errorCode: number | null = null;

  showSidebarForm = false;
  status = false;

  toggleSidebarForm() {
    this.showSidebarForm = !this.showSidebarForm;
  }

  submitForm(form: NgForm) {
    this.formData.status = this.status ? 'active' : 'inactive';
    this.userFormService.createUser(this.formData).subscribe(
      () => {
        alert(`Utente creato con successo!`);
        location.href='user'
      },
      (error) => {
        this.errorCode = error.status;
      }
    );
  }

  changeStatus() {
    this.status;
  }
}
