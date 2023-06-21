import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TokenAuthServiceService } from 'src/app/core/shared/token-auth-service.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  constructor(
    public tokenAuthService: TokenAuthServiceService,
    private router: Router
  ) {}
  userLogout() {
    this.tokenAuthService.deleteToken();
    location.href='login'  }
}
