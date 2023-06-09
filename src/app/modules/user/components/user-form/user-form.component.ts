import { Component } from '@angular/core';
import { UserFormService } from '../../services/user-form.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent {
  formData: any = {
    name: '',
    email: '',
    gender: '',
    status: ''
  };

  constructor(private userFormService: UserFormService) { }

  showSidebarForm = false;
  status = false;

  toggleSidebarForm() {
    this.showSidebarForm = !this.showSidebarForm;
  }

  submitForm(form: NgForm) {
    this.formData.status = this.status ? 'active' : 'inactive';
    this.userFormService.createUser(this.formData)
      .subscribe(
        response => {
          console.log('Dati inviati con successo!', response);
          this.resetForm();
          location.reload()
        },
        error => {
          console.error('Errore durante l\'invio dei dati:', error);
        }
      );
  }

  resetForm(): void {
    this.formData = {
      name: '',
      email: '',
      gender: '',
      status: ''
    };
  }

  changeStatus() {
this.status

  }
}
