
import { Component } from '@angular/core'
import { AppointmentDetailStore } from './appointment-detail.store'

@Component({
  templateUrl: `./appointment-detail.component.html`,
  providers: [AppointmentDetailStore],
})
export class AppointmentDetailComponent {
  readonly vm$ = this.store.vm$

  constructor(private readonly store: AppointmentDetailStore) {}

  deleteItem(item) {
    if (confirm('Are you sure?')) {
      this.store.deleteAppointmentEffect(item)
    }
  }
}

