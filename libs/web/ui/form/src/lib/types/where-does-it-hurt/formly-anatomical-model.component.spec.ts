import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormlyAnatomicalModelComponent } from './formly-anatomical-model.component';

describe('FormlyAnatomicalModelComponent', () => {
  let component: FormlyAnatomicalModelComponent;
  let fixture: ComponentFixture<FormlyAnatomicalModelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormlyAnatomicalModelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormlyAnatomicalModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
