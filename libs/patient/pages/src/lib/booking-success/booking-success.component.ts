import { Component, OnDestroy } from '@angular/core'
import { BookingSuccessStore } from './booking-success.store';
import { WebAppointmentFeatureStore } from '@case-clinical/web/appointment/shared';
import { PatientBaseComponent } from '../patient-base.component';

@Component({
  selector: 'patient-booking-success',
  templateUrl: './booking-success.component.html',
  providers: [ BookingSuccessStore, WebAppointmentFeatureStore ],
  styleUrls: ['./booking-success.component.scss'],
})
export class BookingSuccessComponent extends PatientBaseComponent implements OnDestroy {
  pageName = 'Booking Success';
  portalName = "Patient";

  vm$ = this.store.vm$;

  subscriber: any;
  selectedLegalCaseId$ = this.store.selectedLegalCaseId$
  model: any = {};

  constructor(public store: BookingSuccessStore) {
    super();
    this.subscriber = this.store.selectedLegalCaseId$.subscribe((legalCaseId) => {
      this.model['legalCaseId'] = legalCaseId;
    })
  }

  ngOnDestroy(): void {
    this.subscriber?.unsubscribe();
  }

  getFormData(data: any) {
    return {
      ...data,
      pageName: this.pageName,
      portalName: this.portalName,
      memberships: this.store.memberships$,
    }
  }
}
