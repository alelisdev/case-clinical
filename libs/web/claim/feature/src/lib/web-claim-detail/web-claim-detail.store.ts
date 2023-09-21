
import { Injectable } from '@angular/core'
import { ActivatedRoute,Router } from '@angular/router'
import { ComponentStore,tapResponse } from '@ngrx/component-store'
import { WebCoreDataAccessService,Claim } from '@case-clinical/web/core/data-access'
import { pluck,switchMap, tap } from 'rxjs/operators'
import { DescriptionListItem } from '@case-clinical/web/ui/description-list'
import { WebUiToastService } from '@case-clinical/web/ui/toast'

export interface ClaimDetailState {
  errors ?: any
  loading?: boolean
  item?: Claim
}

@Injectable()
export class WebClaimDetailStore extends ComponentStore<ClaimDetailState> {
  constructor(
    private readonly data: WebCoreDataAccessService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly toast: WebUiToastService
) {
    super({ loading: false })
    this.loadClaimEffect(route.params.pipe(pluck('claimId')))
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
{ label: 'Original Record Date', value: item?.originalRecordDate },
{ label: 'Received Date', value: item?.receivedDate },
{ label: 'Due Date', value: item?.dueDate },
{ label: 'Patient Name', value: item?.patientName },
{ label: 'Patient Phone Number', value: item?.patientPhoneNumber },
{ label: 'Patient Dob', value: item?.patientDob },
{ label: 'Patient Address Line 1', value: item?.patientAddressLine1 },
{ label: 'Patient Address City', value: item?.patientAddressCity },
{ label: 'Patient Address State', value: item?.patientAddressState },
{ label: 'Patient Address Postal Code', value: item?.patientAddressPostalCode },
{ label: 'Carrier Name', value: item?.carrierName },
{ label: 'Carrier Line 1', value: item?.carrierLine1 },
{ label: 'Carrier Line 2', value: item?.carrierLine2 },
{ label: 'Carrier City', value: item?.carrierCity },
{ label: 'Carrier State', value: item?.carrierState },
{ label: 'Carrier Postal Code', value: item?.carrierPostalCode },
{ label: 'Insured Name', value: item?.insuredName },
{ label: 'Insured Line 1', value: item?.insuredLine1 },
{ label: 'Insured City', value: item?.insuredCity },
{ label: 'Insured State', value: item?.insuredState },
{ label: 'Insured Postal Code', value: item?.insuredPostalCode },
{ label: 'Patient Signature', value: item?.patientSignature },
{ label: 'Diagnosis Code 1', value: item?.diagnosisCode1 },
{ label: 'Diagnosis Code 2', value: item?.diagnosisCode2 },
{ label: 'Diagnosis Code 3', value: item?.diagnosisCode3 },
{ label: 'Diagnosis Code 4', value: item?.diagnosisCode4 },
{ label: 'Diagnosis Code 5', value: item?.diagnosisCode5 },
{ label: 'Diagnosis Code 6', value: item?.diagnosisCode6 },
{ label: 'Diagnosis Code 7', value: item?.diagnosisCode7 },
{ label: 'Diagnosis Code 8', value: item?.diagnosisCode8 },

{ label: 'Total Charges', value: item?.totalCharges },
{ label: 'Amount Paid', value: item?.amountPaid },
{ label: 'Physician Signature', value: item?.physicianSignature },
{ label: 'Physician Signed on', value: item?.physicianSignedOn },
{ label: 'Service Facility', value: item?.serviceFacility },
{ label: 'Service Facility Line 1', value: item?.serviceFacilityLine1 },
{ label: 'Service Facility City', value: item?.serviceFacilityCity },
{ label: 'Service Facility State', value: item?.serviceFacilityState },
{ label: 'Service Facility Postal Code', value: item?.serviceFacilityPostalCode },
{ label: 'Service Facility Npi', value: item?.serviceFacilityNpi },
{ label: 'Billing Facility', value: item?.billingFacility },
{ label: 'Billing Line 1', value: item?.billingLine1 },
{ label: 'Billing City', value: item?.billingCity },
{ label: 'Billing State', value: item?.billingState },
{ label: 'Billing Postal Code', value: item?.billingPostalCode },
{ label: 'Billing Npi', value: item?.billingNpi },
{ label: 'Billing Phone Number', value: item?.billingPhoneNumber },
{ label: 'Billing Other', value: item?.billingOther },
{ label: 'Session Notes', value: item?.sessionNotes },
{ label: 'Referring Provider', value: item?.referringProvider },
{ label: 'Referring Provider Npi', value: item?.referringProviderNpi },
{ label: 'Additional Claim Info', value: item?.additionalClaimInfo },
{ label: 'Account Number', value: item?.accountNumber },
{ label: 'Reference Number', value: item?.referenceNumber },
{ label: 'Facility', value: item?.facility },
{ label: 'Prior Authorization Number', value: item?.priorAuthorizationNumber },

{ label: 'Provider Name', value: item?.providerName },
{ label: 'Provider Number', value: item?.providerNumber },
{ label: 'Vendor', value: item?.vendor },
{ label: 'Vendor Line 1', value: item?.vendorLine1 },
{ label: 'Vendor CSZ', value: item?.vendorCSZ },

{ label: 'Total Approved Amount', value: item?.totalApprovedAmount },
{ label: 'Total Billed Amount', value: item?.totalBilledAmount },
{ label: 'Total Net Pay Amount', value: item?.totalNetPayAmount },
{ label: 'Notes', value: item?.notes },



{ label: 'Procedures', value: item?.procedures },
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

  readonly loadClaimEffect = this.effect<string>((claimId$) =>
    claimId$.pipe(
      tap(() => this.setState({ loading: true })),
      switchMap((claimId) =>
        this.data.userClaim({ claimId }).pipe(
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

  readonly deleteClaimEffect = this.effect<Claim>(
    (claim$) =>
      claim$.pipe(
        switchMap((claim) =>
          this.data
            .userDeleteClaim({
              claimId: claim.id,
            })
            .pipe(
              tapResponse(
                (res) =>
                {  
                    this.toast.success("Deleted successfully!", {duration: 3000})
                    return this.router.navigate(['/queues/claims'])
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

