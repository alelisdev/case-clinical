/* eslint-disable @nrwl/nx/enforce-module-boundaries */

import { Injectable } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { ComponentStore, tapResponse } from '@ngrx/component-store'
import { WebCoreDataAccessService, LegalCase } from '@case-clinical/web/core/data-access'
import { pluck, switchMap, tap } from 'rxjs/operators'
import { DescriptionListItem } from '@case-clinical/web/ui/description-list'
import { WebUiToastService } from '@case-clinical/web/ui/toast'
import { Ng7DynamicBreadcrumbService } from '@case-clinical/web/ui/breadcrumbs'

export interface LegalCaseDetailState {
  errors?: any
  loading?: boolean
  item?: LegalCase
}

@Injectable()
export class WebLegalCaseDetailStore extends ComponentStore<LegalCaseDetailState> {
  constructor(
    private readonly data: WebCoreDataAccessService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly toast: WebUiToastService,
    private breadcrumbService: Ng7DynamicBreadcrumbService,
  ) {
    super({ loading: false })
    this.loadLegalCaseEffect(route.params.pipe(pluck('legalCaseId')))
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

        { label: 'Medical Record Number', value: item?.medicalRecordNumber },
        { label: 'Pharmacy Control Number', value: item?.pharmacyControlNumber },
        { label: 'Pch Group Number', value: item?.pchGroupNumber },
        { label: 'Date of Loss', value: item?.dateOfLoss },
        { label: 'Case Status Date', value: item?.caseStatusDate },
        { label: 'Case Status Other', value: item?.caseStatusOther },
        { label: 'Paralegal', value: item?.paralegal },
        { label: 'Paralegal Contact', value: item?.paralegalContact },
        { label: 'Case Note Summary', value: item?.caseNoteSummary },
        { label: 'Policy Limit', value: item?.policyLimit },
        { label: 'Attorney Fee', value: item?.attorneyFee },
        { label: 'Referring Physician', value: item?.referringPhysician },
        { label: 'No More Treatment', value: item?.noMoreTreatment },
        { label: 'Medpay', value: item?.medpay },
        { label: 'File Number', value: item?.fileNumber },
        { label: 'Case Number', value: item?.caseNumber },
        { label: 'Accident State', value: item?.accidentState },
        { label: 'Assigned to', value: item?.assignedTo },
        { label: 'Attorney Paid', value: item?.attorneyPaid },
        { label: 'Attorney Sent Date', value: item?.attorneySentDate },
        { label: 'Write off', value: item?.writeOff },
        { label: 'No MRI', value: item?.noMRI },
        { label: 'No PT', value: item?.noPT },
        { label: 'No First Appointment', value: item?.noFirstAppointment },
        { label: 'Hot', value: item?.hot },
        { label: 'Documents Uploaded', value: item?.documentsUploaded },
        { label: 'Attorney Review', value: item?.attorneyReview },
        { label: 'Escalated Review', value: item?.escalatedReview },
        { label: 'In Active', value: item?.inActive },
        { label: 'Criteria 1712', value: item?.criteria1712 },
        { label: 'Document Uploaded Date', value: item?.documentUploadedDate },
        { label: 'Patient Discharged Gathering Records Date', value: item?.patientDischargedGatheringRecordsDate },
        { label: 'Resubmitted', value: item?.resubmitted },

        { label: 'Firm Case Manager', value: item?.firmCaseManager },

        { label: 'Created by', value: item?.createdBy },
        { label: 'Renegotiate Pay off Date', value: item?.renegotiatePayOffDate },
        { label: 'Case Accounts', value: item?.caseAccounts },
        { label: 'Case Pre Accidents', value: item?.casePreAccidents },
        { label: 'Case Pre Injuries', value: item?.casePreInjuries },
        { label: 'Case Pre Problems', value: item?.casePreProblems },
        { label: 'Insurances', value: item?.insurances },
        { label: 'Case Pre Procedures', value: item?.casePreProcedures },
        { label: 'Case Procedures', value: item?.caseProcedures },
        { label: 'Prior Meds to Dates', value: item?.priorMedsToDates },
        { label: 'Appointments', value: item?.appointments },
      ] as DescriptionListItem[],
  )

  readonly tabs$ = this.select(this.item$, (item) => [
    {
      label: 'Details',
      path: 'details',
      data: item,
    },
  ])
  readonly vm$ = this.select(
    this.errors$,
    this.loading$,
    this.item$,
    this.tabs$,
    (errors, loading, item, tabs) =>{
      console.log('item-loading', { ...item,
        caseProcedures: item?.caseProcedures?.map((caseProcedure)=>{
          return {
            ...caseProcedure,
            estimate:caseProcedure.procedureVendors?.map(x => x.estimate)?.reduce((a, b) => a + b, 0)
          }
        })
      })

      return ({
      errors,
      loading,
      item: { ...item},
      tabs,
    })},
    { debounce: true },
  )

  readonly loadLegalCaseEffect = this.effect<string>((legalCaseId$) =>
    legalCaseId$.pipe(
      tap(() => this.setState({ loading: true })),
      switchMap((legalCaseId) =>
        this.data.userLegalCase({ legalCaseId }).pipe(
          tapResponse(
            (res) => {
              return this.patchState({
                item: res.data.item,errors: res.errors, loading: false })
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

  readonly deleteLegalCaseEffect = this.effect<LegalCase>((legalCase$) =>
    legalCase$.pipe(
      switchMap((legalCase) =>
        this.data
          .userDeleteLegalCase({
            legalCaseId: legalCase.id,
          })
          .pipe(
            tapResponse(
              (res) => {
                this.toast.success('Deleted successfully!', { duration: 3000 })
                return this.router.navigate(['/queues/legal-cases'])
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
  updateFundingApproved(contextData, approvedStatus){

    console.log('detail-store',contextData, approvedStatus)
  }
}
