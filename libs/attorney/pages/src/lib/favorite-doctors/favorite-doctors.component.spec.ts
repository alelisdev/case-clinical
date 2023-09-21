import { ComponentFixture, TestBed } from '@angular/core/testing'

import { FavoriteDoctorsComponent } from './favorite-doctors.component'

describe('FavoriteDoctorsComponent', () => {
  let component: FavoriteDoctorsComponent
  let fixture: ComponentFixture<FavoriteDoctorsComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FavoriteDoctorsComponent],
    }).compileComponents()

    fixture = TestBed.createComponent(FavoriteDoctorsComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
