import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BaseCalComponent } from './base-cal.component';

describe('BaseCalComponent', () => {
  let component: BaseCalComponent;
  let fixture: ComponentFixture<BaseCalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BaseCalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BaseCalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
