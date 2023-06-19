import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { UserFormComponent } from './user-form.component';
import { UikitModule } from 'src/app/shared/uikit/uikit.module';

describe('UserFormComponent', () => {
  let component: UserFormComponent;
  let fixture: ComponentFixture<UserFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserFormComponent],
      imports: [FormsModule, UikitModule]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should toggle sidebar form', () => {
    expect(component.showSidebarForm).toBeFalse();
    component.toggleSidebarForm();
    expect(component.showSidebarForm).toBeTrue();
    component.toggleSidebarForm();
    expect(component.showSidebarForm).toBeFalse();
  });
});
