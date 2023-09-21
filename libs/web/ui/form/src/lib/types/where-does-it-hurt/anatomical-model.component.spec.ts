import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnatomicalModelComponent } from './anatomical-model.component';

describe('AnatomicalModelComponent', () => {
  let component: AnatomicalModelComponent;
  let fixture: ComponentFixture<AnatomicalModelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnatomicalModelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnatomicalModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
