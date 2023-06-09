import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ElementRef } from '@angular/core';
import { TokenAuthServiceService } from 'src/app/core/shared/token-auth-service.service';
import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let verifyTokenService: TokenAuthServiceService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      providers: [TokenAuthServiceService, FormBuilder],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    verifyTokenService = TestBed.inject(TokenAuthServiceService);

    // Stubbing ViewChild
    component.tokenInput = { nativeElement: {} } as ElementRef<any>;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form', () => {
    expect(component.myForm).toBeInstanceOf(FormGroup);
    expect(component.myForm.get('theTokenInput')).toBeTruthy();
  });

  it('should call verifyBearerToken method on token submission', () => {
    const token = 'testToken';
    spyOn(verifyTokenService, 'verifyBearerToken');

    component.onTokenSubmit(token);

    expect(verifyTokenService.verifyBearerToken).toHaveBeenCalledWith(token);
  });
});
