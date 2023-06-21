import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { TokenAuthServiceService } from 'src/app/core/shared/token-auth-service.service';
import { FormBuilder,  ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { UikitModule } from '../uikit/uikit.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let tokenAuthService: TokenAuthServiceService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      providers: [TokenAuthServiceService, FormBuilder],
      imports: [ReactiveFormsModule, HttpClientTestingModule,UikitModule,BrowserAnimationsModule  ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    tokenAuthService = TestBed.inject(TokenAuthServiceService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize loginForm correctly', () => {
    expect(component.loginForm).toBeDefined();
    expect(component.loginForm.get('theTokenInput')).toBeDefined();
    expect(component.loginForm.valid).toBeFalse();
  });

  it('should call verifyTokenService when onTokenSubmit is called', () => {
    spyOn(tokenAuthService, 'verifyBearerToken');
    const token = 'testToken';
    component.onTokenSubmit(token);
    expect(tokenAuthService.verifyBearerToken).toHaveBeenCalledWith(token);
  });

  it('should set theTokenInput value when token is entered', () => {
    const token = 'testToken';
    const tokenInput = fixture.debugElement.query(By.css('#tokenInput')).nativeElement;
    tokenInput.value = token;
    tokenInput.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    expect(component.loginForm.get('theTokenInput')?.value).toBe(token);
  });

});
