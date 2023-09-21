import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsTenantComponent } from './settings-tenant.component';

describe('SettingsTenantComponent', () => {
  let component: SettingsTenantComponent;
  let fixture: ComponentFixture<SettingsTenantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SettingsTenantComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingsTenantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
