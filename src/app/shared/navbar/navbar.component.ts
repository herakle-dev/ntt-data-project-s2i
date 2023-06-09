import { Component } from '@angular/core';
import { TokenAuthServiceService } from 'src/app/core/shared/token-auth-service.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
constructor(public tokenAuthService:TokenAuthServiceService){}
userLogout(){
this.tokenAuthService.deleteToken()
}
}
