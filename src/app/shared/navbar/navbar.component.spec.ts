import { TestBed, ComponentFixture } from '@angular/core/testing';
import { NavbarComponent } from './navbar.component';
import { TokenAuthServiceService } from 'src/app/core/shared/token-auth-service.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { UikitModule } from '../uikit/uikit.module';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;
  let tokenAuthService: TokenAuthServiceService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NavbarComponent],
      imports:[HttpClientTestingModule,UikitModule],
      providers: [TokenAuthServiceService],
    }).compileComponents();

    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    tokenAuthService = TestBed.inject(TokenAuthServiceService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call deleteToken when userLogout is called', () => {
    // Mock tokenAuthService.deleteToken
    spyOn(tokenAuthService, 'deleteToken');
    component.userLogout();
    expect(tokenAuthService.deleteToken).toHaveBeenCalled();
  });
});
