import { AppointmentStore } from './appointments.component.store'
import { AttorneyBaseComponent } from '../attorney-base.component'
import { WebAppointmentFeatureStore } from '@case-clinical/web/appointment/shared'
import { Component, OnDestroy } from '@angular/core'

@Component({
  selector: 'case-clinical-appointments',
  providers: [
    AppointmentStore,
    WebAppointmentFeatureStore,
    {
      provide: 'calendarAppointmentStore',
      useClass: WebAppointmentFeatureStore,
    },
    {
      provide: 'listAppointmentStore',
      useClass: WebAppointmentFeatureStore,
    },
  ],
  templateUrl: './appointments.component.html',
  styleUrls: ['./appointments.component.scss'],
})
export class AppointmentsComponent extends AttorneyBaseComponent implements OnDestroy {
  pageName = 'Appointments'
  portalName = 'Attorney'
  subscriber: any

  model: any = {}

  constructor(public store: AppointmentStore) {
    super()
    this.subscriber = this.store.selectedAttorneyId$.subscribe((attorneyId) => {
      this.model['attorneyId'] = attorneyId
    })
  }
  ngOnDestroy(): void {
    this.subscriber?.unsubscribe();
  }

  vm$ = this.store.vm$
  getFormData(data: any) {
    return {
      ...data,
      portalName: this.portalName,
      pageName: this.pageName,
      attorneys: this.store.attorneyOptions$,
      paging: this.store.paging$,
    }
  }
}
