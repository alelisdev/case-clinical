
import { Injectable } from '@angular/core'
import { ActivatedRoute,Router } from '@angular/router'
import { ComponentStore,tapResponse } from '@ngrx/component-store'
import { WebCoreDataAccessService,Patient } from '@case-clinical/web/core/data-access'
import { pluck,switchMap, tap } from 'rxjs/operators'
import { DescriptionListItem } from '@case-clinical/web/ui/description-list'
import { WebUiToastService } from '@case-clinical/web/ui/toast'

export interface PatientDetailState {
  errors ?: any
  loading?: boolean
  item?: Patient
}

@Injectable()
export class WebPatientDetailStore extends ComponentStore<PatientDetailState> {
  constructor(
    private readonly data: WebCoreDataAccessService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly toast: WebUiToastService
) {
    super({ loading: false })
    this.loadPatientEffect(route.params.pipe(pluck('patientId')))
  }

  readonly errors$ = this.select((s) => s.errors)
  readonly loading$ = this.select((s) => s.loading)
  readonly item$ = this.select((s) => s.item)

readonly displayItems$ = this.select(
    this.item$,
    (item) =>
      [
{ label: 'Id', value: item?.id },
{ label: 'Name', value: item?.name },
{ label: 'First Name', value: item?.firstName },
{ label: 'Middle Name', value: item?.middleName },
{ label: 'Last Name', value: item?.lastName },
{ label: 'Suffix', value: item?.suffix },

{ label: 'Nickname', value: item?.nickname },
{ label: 'Height', value: item?.height },
{ label: 'Weight', value: item?.weight },
{ label: 'Date of Birth', value: item?.dateOfBirth },
{ label: 'Primary Phone Number', value: item?.primaryPhoneNumber },
{ label: 'Is Primary Phone Mobile', value: item?.isPrimaryPhoneMobile },
{ label: 'Secondary Phone Number', value: item?.secondaryPhoneNumber },
{ label: 'Is Secondary Phone Mobile', value: item?.isSecondaryPhoneMobile },
{ label: 'Member Registration Number', value: item?.memberRegistrationNumber },


{ label: 'Requires Translator', value: item?.requiresTranslator },
{ label: 'Social Security Number', value: item?.socialSecurityNumber },
{ label: 'Honorific', value: item?.honorific },
{ label: 'Primary Email Address', value: item?.primaryEmailAddress },
{ label: 'Primary Address Line 1', value: item?.primaryAddressLine1 },
{ label: 'Primary Address Line 2', value: item?.primaryAddressLine2 },
{ label: 'Primary Address City', value: item?.primaryAddressCity },
{ label: 'Primary Address State or Province', value: item?.primaryAddressStateOrProvince },
{ label: 'Primary Address Postal Code', value: item?.primaryAddressPostalCode },
{ label: 'Notes', value: item?.notes },
{ label: 'Latitude', value: item?.latitude },
{ label: 'Longitude', value: item?.longitude },

{ label: 'Home Phone Number', value: item?.homePhoneNumber },
{ label: 'Mobile Number', value: item?.mobileNumber },
{ label: 'Bmi', value: item?.bmi },
{ label: 'Occupation', value: item?.occupation },
{ label: 'Debtor Remarks', value: item?.debtorRemarks },

{ label: 'Work Address Line 1', value: item?.workAddressLine1 },
{ label: 'Work Address Line 2', value: item?.workAddressLine2 },
{ label: 'Work Address City', value: item?.workAddressCity },
{ label: 'Work Address State or Province', value: item?.workAddressStateOrProvince },
{ label: 'Work Address Postal Code', value: item?.workAddressPostalCode },
{ label: 'Work Latitude', value: item?.workLatitude },
{ label: 'Work Longitude', value: item?.workLongitude },
{ label: 'Prescriptions', value: item?.prescriptions },
{ label: 'Documents', value: item?.documents },
{ label: 'Patient Studies', value: item?.patientStudies },
{ label: 'Claims', value: item?.claims },
{ label: 'Legal Cases', value: item?.legalCases },
{ label: 'Prior Authorization Requests', value: item?.priorAuthorizationRequests },
{ label: 'Appointments', value: item?.appointments },
{ label: 'User', value: item?.users?.at(0) },
      ] as DescriptionListItem[],
  )

readonly tabs$ = this.select(this.item$, (item) => [
    {
      label: 'Details',
      path: 'details',
      data: item,
    },
  ])
  readonly vm$ = this.select(this.errors$, this.loading$, this.item$, this.tabs$, (errors, loading, item, tabs) => ({
    errors,
    loading,
    item: { ...item },
    tabs
  }),
{debounce: true})

  readonly loadPatientEffect = this.effect<string>((patientId$) =>
    patientId$.pipe(
      tap(() => this.setState({ loading: true })),
      switchMap((patientId) =>
        this.data.userPatient({ patientId }).pipe(
          tapResponse(
            (res) => this.patchState({ item: res.data.item, errors: res.errors, loading: false }),
            (errors: any) =>
              this.patchState({
                loading: false,
                errors: errors.graphQLErrors ? errors.graphQLErrors : errors,
              }),
          ),
        ),
      ),
    ),
  )

  readonly deletePatientEffect = this.effect<Patient>(
    (patient$) =>
      patient$.pipe(
        switchMap((patient) =>
          this.data
            .userDeletePatient({
              patientId: patient.id,
            })
            .pipe(
              tapResponse(
                (res) =>
                {
                    this.toast.success("Deleted successfully!", {duration: 3000})
                    return this.router.navigate(['/queues/patients'])
                },
                (errors: any) =>
                  this.patchState({
                    loading: false,
                    errors: errors.graphQLErrors ? errors.graphQLErrors : errors,
                  }),
              ),
            ),
        ),
      ),
  )
}

