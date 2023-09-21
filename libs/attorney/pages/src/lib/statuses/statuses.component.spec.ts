import { ComponentFixture, TestBed } from '@angular/core/testing'
import { SatusesComponent } from './satuses.component'

describe('SatusesComponent', () => {
  let component: SatusesComponent
  let fixture: ComponentFixture<SatusesComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SatusesComponent],
    }).compileComponents()

    fixture = TestBed.createComponent(SatusesComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
