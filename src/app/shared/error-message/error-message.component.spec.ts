import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ErrorMessageComponent } from './error-message.component';

describe('ErrorMessageComponent', () => {
  let component: ErrorMessageComponent;
  let fixture: ComponentFixture<ErrorMessageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ErrorMessageComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ErrorMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize errorCode and hideError properties', () => {
    expect(component.errorCode).toBeNull();
    expect(component.hideError).toBeFalse();
  });

  it('should toggle hideError property when dismissError is called', () => {
    component.hideError = false;

    component.dismissError();

    expect(component.hideError).toBeTrue();

    component.dismissError();

    expect(component.hideError).toBeFalse();
  });
});
