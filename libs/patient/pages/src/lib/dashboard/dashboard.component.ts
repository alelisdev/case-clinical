/* eslint-disable @typescript-eslint/no-unused-vars */
import { Component, OnDestroy } from '@angular/core'
import { DashboardStore } from './dashboard.component.store'
import { WebAppointmentFeatureStore } from '@case-clinical/web/appointment/shared'
import { WebPrescriptionFeatureStore } from '@case-clinical/web/prescription/shared'
import { WebMedicalRecordFeatureStore } from '@case-clinical/web/medical-record/shared'
import { WebClaimFeatureStore } from '@case-clinical/web/claim/shared'
import { WebDocumentFeatureStore } from '@case-clinical/web/document/shared'
import { PatientBaseComponent } from '../patient-base.component'
import { WebReferralRequestFeatureStore } from '@case-clinical/web/referral-request/shared'

@Component({
  selector: 'patient-dashboard',
  templateUrl: './dashboard.component.html',
  providers: [
    DashboardStore,
    WebAppointmentFeatureStore,
    WebPrescriptionFeatureStore,
    WebMedicalRecordFeatureStore,
    WebClaimFeatureStore,
    WebDocumentFeatureStore,
    WebReferralRequestFeatureStore,
    {
      provide: 'priorAppointmentStore',
      useClass: WebAppointmentFeatureStore,
    },
    {
      provide: 'upcomingAppointmentStore',
      useClass: WebAppointmentFeatureStore,
    },
    {
      provide: 'calendarAppointmentStore',
      useClass: WebAppointmentFeatureStore,
    },
  ],
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent extends PatientBaseComponent implements OnDestroy {
  pageName = 'Dashboard'
  portalName = 'Patient'

  vm$ = this.store.vm$

  selectedLegalCaseId$ = this.store.selectedLegalCaseId$
  model: any = {}
  subscriber: any

  constructor(public store: DashboardStore) {
    super()
    this.subscriber = this.store.selectedLegalCaseId$.subscribe((legalCaseId) => {
      this.model['legalCaseId'] = legalCaseId
    })
  }
  ngOnDestroy(): void {
    this.subscriber?.unsubscribe()
  }
  getFormData(data: any) {
    return {
      ...data,
      pageName: this.pageName,
      portalName: this.portalName,
      attachment: this.store.attachment$,
      memberships: this.store.memberships$,
      upcomingAppointmentsPaging: this.store.upcomingAppointmentsPaging$,
      priorAppointmentsPaging: this.store.priorAppointmentsPaging$,
      prescriptionsPaging: this.store.prescriptionsPaging$,
      medicalRecordsPaging: this.store.medicalRecordsPaging$,
      imagingPaging: this.store.imagingPaging$,
    }
  }
}
