import { Component, OnDestroy } from '@angular/core'
import { ConfirmAppointmentStore } from './confirm-appointment.store';
import { PatientBaseComponent } from '../patient-base.component';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'patient-confirm-appointment',
  templateUrl: './confirm-appointment.component.html',
  styleUrls: ['./confirm-appointment.component.scss'],
  providers: [ConfirmAppointmentStore]
})
export class ConfirmAppointmentComponent extends PatientBaseComponent implements OnDestroy {
  pageName = 'Confirm-Appointment';
  portalName = "Patient";

  private _unsubscribeAll: Subject<any> = new Subject<any>();
  appointment$ = this.store.appointment$;
  subscriber: any;
  model: any = {};

  constructor(public store: ConfirmAppointmentStore) {
    super();

  }

  ngOnDestroy(): void {
    this._unsubscribeAll.complete();
  }

  formIsReady() {
    this.onResize();
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
