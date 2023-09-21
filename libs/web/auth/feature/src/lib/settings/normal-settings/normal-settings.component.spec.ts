import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NormalSettingsComponent } from './normal-settings.component';

describe('NormalSettingsComponent', () => {
  let component: NormalSettingsComponent;
  let fixture: ComponentFixture<NormalSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NormalSettingsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NormalSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
