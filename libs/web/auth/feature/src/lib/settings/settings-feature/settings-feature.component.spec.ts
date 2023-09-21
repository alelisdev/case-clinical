import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsFeatureComponent } from './settings-feature.component';

describe('SettingsFeatureComponent', () => {
  let component: SettingsFeatureComponent;
  let fixture: ComponentFixture<SettingsFeatureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SettingsFeatureComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingsFeatureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
