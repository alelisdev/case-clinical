import { ComponentFixture, TestBed } from '@angular/core/testing'

import { SheduleTimingComponent } from './shedule-timing.component'

describe('SheduleTimingComponent', () => {
  let component: SheduleTimingComponent
  let fixture: ComponentFixture<SheduleTimingComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SheduleTimingComponent],
    }).compileComponents()

    fixture = TestBed.createComponent(SheduleTimingComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
