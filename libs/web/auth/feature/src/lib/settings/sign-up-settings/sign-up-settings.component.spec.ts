import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignUpSettingsComponent } from './sign-up-settings.component';

describe('SignUpSettingsComponent', () => {
  let component: SignUpSettingsComponent;
  let fixture: ComponentFixture<SignUpSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SignUpSettingsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SignUpSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
