import { AfterContentInit, AfterViewChecked, Component, DoCheck, ElementRef, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { TokenAuthServiceService } from 'src/app/core/shared/token-auth-service.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(
    private verifyTokenService: TokenAuthServiceService,
    private formBuilder: FormBuilder,
    ) {}

  @ViewChild('tokenInput', { static: false })
  tokenInput!: ElementRef<any>;
  myForm!: FormGroup;


  onTokenSubmit(token: string) {
    this.verifyTokenService.verifyBearerToken(token)
  }
  ngOnInit(): void {

this.myForm=this.formBuilder.group({
  theTokenInput:['', Validators.required]
})

  }
}
