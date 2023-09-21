import { FuseLoadingService } from '@fuse/services/loading/loading.service'
import { ComponentStore } from '@ngrx/component-store'
import { FormService } from '@case-clinical/web/ui/form'
import { Injectable } from '@angular/core'
import { of, switchMap, tap, withLatestFrom } from 'rxjs'
import { WebUiToastService } from '@case-clinical/web/ui/toast'
import { WebPatientFeatureStore } from '@case-clinical/web/patient/shared'
import { WebAuthStore } from '@case-clinical/web/auth/data-access'
import * as moment from 'moment'
import { getAge } from '@case-clinical/shared/util/helpers'
import { LegalCase } from '@case-clinical/shared/util/sdk'

export interface MemberShip {
  id: string,
  mrn?: string,
  pcn?: string,
  group?: string,
}

export interface PatientPortalState {
  loading: boolean
  query: string
  bookingItem: any
  selectedLegalCaseId?: string,
  clinicalProviderId?: string | undefined
}

@Injectable({ providedIn: 'root' })
export class PatientPortalStore extends ComponentStore<PatientPortalState> {
  constructor(
    private formService: FormService,
    private loading: FuseLoadingService,
    private toast: WebUiToastService,
    private patientStore: WebPatientFeatureStore,
    private authStore: WebAuthStore,
  ) {
    super({
      query: '',
      loading: false,
      bookingItem: {},
    })

    this.authStore.user$.subscribe((user) => {
      if(user?.patientId) {
        console.log('I am going to fetch patient details...')
        this.patientStore.loadPatientEffect(user.patientId);
      }
    });
  }

  readonly patient$ = this.patientStore.item$;

  readonly user$ = this.select(this.authStore.user$, this.patient$, (user:any, patient: any) => {
    console.log(patient)
    let genderAndDob = ''
    let latitude = 0
    let longitude = 0
    if (patient?.gender) genderAndDob = patient.gender.name as string
    if (patient?.latitude) latitude = patient?.latitude
    if(patient?.longitude) longitude = patient?.longitude
    if (user?.dateOfBirth) {
      const age = getAge(user.dateOfBirth)
      if (genderAndDob) genderAndDob += ` - ${age} Years`
      else genderAndDob = `${age} Years`
    }
    const userData: any = {
      ...user,
      latitude:latitude,
      longitude:longitude,
      genderAndDob,
    }
    return userData;
  })

  readonly memberships$ = this.select(this.patient$, (patient) => {
    if((patient?.legalCases?.length || 0) > 0) {
      return patient?.legalCases?.map((legalCase:any) => ({ id: legalCase.id, mrn: legalCase.medicalRecordNumber, pcn: legalCase.pharmacyControlNumber, group: legalCase.pchGroupNumber }))
    } else {
      return [{ id: -1, mrn: 'No membership', pcn: 'No PCN', group: 'No Group' }];
    }
  })

  readonly bookingItem$ = this.select((s) => s.bookingItem)
  readonly clinicalProviderId$ = this.select((s) => s.clinicalProviderId);
  readonly loading$ = this.select((s) => s.loading)
  readonly vm$ = this.select(this.loading$, (loading) => {
    return {
      loading,
    }
  })


  readonly selectedLegalCaseId$ = this.select(this.state$, this.memberships$, (s, memberships) => {
    if(s.selectedLegalCaseId) return s.selectedLegalCaseId;
    return memberships?.at(0)?.id;
  });

  readonly selectedMembership$ = this.select(this.selectedLegalCaseId$, this.memberships$, (membershipId, memberships) => {
    if(!memberships) return null;
    let res_membership:any = null;
    memberships.forEach((membership)=>{
      if(membership.id === membershipId) res_membership = membership;
    })
    return res_membership;
  })

  readonly setBookingItem = this.updater((state, bookingItem: any) => {
    return { ...state, bookingItem }
  })

  readonly setClinicalProviderId = this.updater((state, clinicalProviderId: string | undefined) => {
    return { ...state, clinicalProviderId };
  })

  readonly setSelectedLegalCaseId = this.updater((state, selectedLegalCaseId: string) =>{
    return ({ ...state, selectedLegalCaseId })
  });
}
