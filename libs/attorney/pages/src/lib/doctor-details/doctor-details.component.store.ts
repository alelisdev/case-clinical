import { ActivatedRoute } from '@angular/router'
import { AttorneyBaseState, AttorneyBaseStore } from '../attorney-page.base.store'
import { FormlyModalController } from '@case-clinical/web/ui/formly-designer'
import { Injectable, Injector } from "@angular/core";
import { of, switchMap, tap, withLatestFrom } from 'rxjs';
import { WebClinicalProviderLocationFeatureStore } from '@case-clinical/web/clinical-provider-location/shared';
import { WebDocumentFeatureStore } from '@case-clinical/web/document/shared'
import { WebLegalCaseFeatureStore } from '@case-clinical/web/legal-case/shared'

import { WebUiToastService } from '@case-clinical/web/ui/toast';
import { WebAppointmentFeatureStore } from '@case-clinical/web/appointment/shared';

export interface DoctorDetailsState extends AttorneyBaseState {
  loading: boolean
  query: string
}

@Injectable()
export class DoctorDetailsStore extends AttorneyBaseStore<DoctorDetailsState> {
  private addAppointmentModalController?: FormlyModalController
  constructor(
    private appointmentstore: WebAppointmentFeatureStore,
    private documentStore: WebDocumentFeatureStore,
    private readonly route: ActivatedRoute,
    private toast: WebUiToastService,
    private legalCaseStore: WebLegalCaseFeatureStore,
    private providerLocationStore: WebClinicalProviderLocationFeatureStore,
    injector: Injector
  ) {
    super(injector)
    this.patchState({
      query: "",
      loading: false,
    })
    if (this.route.snapshot.paramMap.has("clinicalProviderLocationId")) {
      const clinicalProviderLocationId = this.route.snapshot.paramMap.get("clinicalProviderLocationId") ?? '';

      this.providerLocationStore.loadClinicalProviderLocationEffect(clinicalProviderLocationId);
    }
    this.loadLegalCasesEffect()
  }

  loading$ = this.select(s => s.loading)
  legalCases$ = this.legalCaseStore.legalCases$
  providerLocation$ = this.providerLocationStore.formattedItem$.pipe(tap(item => console.log(item)));

  attachment$ = this.documentStore.item$.pipe(
    tap((document) => {
      if (document && !document.attachment) {
        this.toast.error('Cannot find attachment file!', { duration: 2000 })
      }
    }),
  )

  vm$ = this.select(
    this.loading$,
    this.user$,
    this.providerLocation$,
    (
      loading,
      user,
      providerLocation,
    ) => {
      return {
        loading,
        user,
        providerLocation,
        clinicalProvider: providerLocation?.clinicalProvider,
        businessHours: providerLocation?.clinicalProvider?.businessHours
      };
    }
  )

  loadLegalCasesEffect = this.effect<void>(($) =>
    $.pipe(
      tap(() => {
        this.patchState({ loading: true })
      }),
      withLatestFrom(this.attorneyId$),
      switchMap(([, attorneyId]) => {
        this.legalCaseStore.setAttorneyId(attorneyId as string)
        this.legalCaseStore.loadLegalCasesEffect()
        return of(true)
      }),
    ),
  )
  loadImageDetail(documentId: string) {
    this.documentStore.loadDocumentEffect(documentId)
  }

  /** Begin Appointment **/
  setAddAppointmentModalController(controller: FormlyModalController) {
    this.addAppointmentModalController = controller
  }

  openAddAppointmentDialog(providerLocation: any) {
    this.addAppointmentModalController?.open(
      {
        clinicalProviderId: providerLocation?.clinicalProviderId,
        locationId: providerLocation.location?.id,
        provider: providerLocation.clinicalProvider,
        location: providerLocation.location,
      }, {
      legalCases: this.legalCases$,
      } , this)
  }

  saveAppointment(data: any) {
    const createListener = this.appointmentstore.actionResult$.subscribe((result) => {
      if (result) {
        const { done } = result
        if (done) {
          this.addAppointmentModalController?.close()
          createListener.unsubscribe()
        }
      }
    })
    const {appointmentDateAndTime, clinicalProviderId, legalCaseId, locationId, name, patientId, start} = data;
    this.appointmentstore.createAppointmentEffect({appointmentDateAndTime, clinicalProviderId, legalCaseId, locationId, name, patientId, start})
  }
  /** End Appointment **/
  override getInitialState(): DoctorDetailsState {
    return {
      query: "",
      loading: false,
    }
  }
}
