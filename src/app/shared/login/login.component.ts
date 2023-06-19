import {Component,  ElementRef,  OnInit, ViewChild } from '@angular/core';
import { TokenAuthServiceService } from 'src/app/core/shared/token-auth-service.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(
    private verifyTokenService: TokenAuthServiceService,
    private formBuilder: FormBuilder,
    private title:Title
    ) {}

  @ViewChild('tokenInput', { static: false })
  tokenInput!: ElementRef<any>;
  myForm!: FormGroup;
  errorCode: number | null = null;


  onTokenSubmit(token: string) {
    this.verifyTokenService.verifyBearerToken(token)
  }
  ngOnInit(): void {
const title = 'Login Fakebook'
this.title.setTitle(title)
this.myForm=this.formBuilder.group({
  theTokenInput:['', Validators.required]
})

  }
}
