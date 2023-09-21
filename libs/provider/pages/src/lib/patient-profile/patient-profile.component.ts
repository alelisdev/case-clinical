import { Component, OnInit, OnDestroy } from '@angular/core'
import { PatientProfileStore } from './patient-profile.component.store';
import { ProviderBaseComponent }  from '../provider-base.component'
import { WebAppointmentFeatureStore } from '@case-clinical/web/appointment/shared';
import { WebAuthorizationFeatureStore } from '@case-clinical/web/authorization/shared';
import { WebClinicalProviderLocationFeatureStore } from '@case-clinical/web/clinical-provider-location/shared'
import { WebDocumentFeatureStore } from '@case-clinical/web/document/shared';
import { WebMedicalRecordFeatureStore } from '@case-clinical/web/medical-record/shared';
import { WebPatientFeatureStore } from '@case-clinical/web/patient/shared';
import { WebPrescriptionFeatureStore } from '@case-clinical/web/prescription/shared';
import { WebReferralRequestFeatureStore } from '@case-clinical/web/referral-request/shared'
import { WebAuthorizationTypeFeatureStore } from '@case-clinical/web/authorization-type/shared'
import { ReferralCreateModalStore } from './referral-create.modal.store';
import { WebSpecialtyFeatureStore } from '@case-clinical/web/specialty/shared';
import { WebProcedureOrTreatmentRequestFeatureStore } from '@case-clinical/web/procedure-or-treatment-request/shared';
import { WebRecommendedOrderFeatureStore } from '@case-clinical/web/recommended-order/shared';
import { ProcedureRequestModalStore } from './procedure-request.modal.store';
import { RecommendOrderModalStore } from './recommend-order.modal.store';
import { WebClinicalProviderFeatureStore } from '@case-clinical/web/clinical-provider/shared';

@Component({
  selector: 'provider-patient-profile',
  templateUrl: './patient-profile.component.html',
  providers: [
    PatientProfileStore,
    ReferralCreateModalStore,
    ProcedureRequestModalStore,
    RecommendOrderModalStore,
    WebAuthorizationFeatureStore,
    WebPatientFeatureStore,
    WebPrescriptionFeatureStore,
    WebMedicalRecordFeatureStore,
    WebDocumentFeatureStore,
    WebReferralRequestFeatureStore,
    WebSpecialtyFeatureStore,
    WebAuthorizationTypeFeatureStore,
    WebClinicalProviderLocationFeatureStore,
    WebProcedureOrTreatmentRequestFeatureStore,
    WebRecommendedOrderFeatureStore,
    WebClinicalProviderFeatureStore,
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
  styleUrls: ['./patient-profile.component.scss'],
})
export class PatientProfileComponent extends ProviderBaseComponent implements OnInit, OnDestroy {
  portalName = "Vendor";
  pageName = 'Patient Details';

  vm$ = this.store.vm$;
  model: any = {  }
  subscriber?: any;

  constructor(public store: PatientProfileStore) {
    super();
  }

  ngOnInit(): void {
    this.subscriber = this.store.selectedMrn$.subscribe((selectedMrn) => {
      this.model['selectedMrn'] = selectedMrn;
    });
  }

  ngOnDestroy(): void {
    this.subscriber?.unsubscribe();
  }

  

  getFormData(data: any) {
    return {
      ...data,
      pageName: this.pageName,
      portalName: this.portalName,
      mrns: this.store.mrns$,
      attachment: this.store.attachment$,
      upcomingAppointmentsPaging: this.store.upcomingAppointmentsPaging$,
      priorAppointmentsPaging: this.store.priorAppointmentsPaging$,
      prescriptionsPaging: this.store.prescriptionsPaging$,
      medicalRecordsPaging: this.store.medicalRecordsPaging$,
      providers:this.store.providerOptionsForFilter$
    }
  }
}
