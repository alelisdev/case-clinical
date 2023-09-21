
import { Injectable } from '@angular/core'
import { ActivatedRoute,Router } from '@angular/router'
import { ComponentStore,tapResponse } from '@ngrx/component-store'
import { WebCoreDataAccessService,ClaimProcedure } from '@case-clinical/web/core/data-access'
import { pluck,switchMap, tap } from 'rxjs/operators'
import { DescriptionListItem } from '@case-clinical/web/ui/description-list'
import { WebUiToastService } from '@case-clinical/web/ui/toast'

export interface ClaimProcedureDetailState {
  errors ?: any
  loading?: boolean
  item?: ClaimProcedure
}

@Injectable()
export class WebClaimProcedureDetailStore extends ComponentStore<ClaimProcedureDetailState> {
  constructor(
    private readonly data: WebCoreDataAccessService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly toast: WebUiToastService
) {
    super({ loading: false })
    this.loadClaimProcedureEffect(route.params.pipe(pluck('claimProcedureId')))
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



{ label: 'From Date of Service', value: item?.fromDateOfService },
{ label: 'To Date of Service', value: item?.toDateOfService },

{ label: 'National Drug Code', value: item?.nationalDrugCode },
{ label: 'Drug Unit', value: item?.drugUnit },
{ label: 'Drug Quantity', value: item?.drugQuantity },
{ label: 'Quantity', value: item?.quantity },
{ label: 'Billed Amount', value: item?.billedAmount },
{ label: 'Approved Amount', value: item?.approvedAmount },
{ label: 'Adjustment Amount', value: item?.adjustmentAmount },
{ label: 'Net Payment Amount', value: item?.netPaymentAmount },
{ label: 'Payment Method', value: item?.paymentMethod },
{ label: 'Internal Memo', value: item?.internalMemo },
{ label: 'Explaination of Benefits Comment', value: item?.explainationOfBenefitsComment },

{ label: 'Reason', value: item?.reason },
{ label: 'Procedure Code', value: item?.procedureCode },
{ label: 'Diagnosis Pointer', value: item?.diagnosisPointer },
{ label: 'Modifier 1', value: item?.modifier1 },
{ label: 'Modifier 2', value: item?.modifier2 },
{ label: 'Modifier 3', value: item?.modifier3 },
{ label: 'Modifier 4', value: item?.modifier4 },


{ label: 'Case Accounts', value: item?.caseAccounts },
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

  readonly loadClaimProcedureEffect = this.effect<string>((claimProcedureId$) =>
    claimProcedureId$.pipe(
      tap(() => this.setState({ loading: true })),
      switchMap((claimProcedureId) =>
        this.data.userClaimProcedure({ claimProcedureId }).pipe(
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

  readonly deleteClaimProcedureEffect = this.effect<ClaimProcedure>(
    (claimProcedure$) =>
      claimProcedure$.pipe(
        switchMap((claimProcedure) =>
          this.data
            .userDeleteClaimProcedure({
              claimProcedureId: claimProcedure.id,
            })
            .pipe(
              tapResponse(
                (res) =>
                {  
                    this.toast.success("Deleted successfully!", {duration: 3000})
                    return this.router.navigate(['/queues/claim-procedures'])
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

