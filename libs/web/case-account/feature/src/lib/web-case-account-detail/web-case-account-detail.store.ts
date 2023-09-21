
import { Injectable } from '@angular/core'
import { ActivatedRoute,Router } from '@angular/router'
import { ComponentStore,tapResponse } from '@ngrx/component-store'
import { WebCoreDataAccessService,CaseAccount } from '@case-clinical/web/core/data-access'
import { pluck,switchMap, tap } from 'rxjs/operators'
import { DescriptionListItem } from '@case-clinical/web/ui/description-list'
import { WebUiToastService } from '@case-clinical/web/ui/toast'

export interface CaseAccountDetailState {
  errors ?: any
  loading?: boolean
  item?: CaseAccount
}

@Injectable()
export class WebCaseAccountDetailStore extends ComponentStore<CaseAccountDetailState> {
  constructor(
    private readonly data: WebCoreDataAccessService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly toast: WebUiToastService
) {
    super({ loading: false })
    this.loadCaseAccountEffect(route.params.pipe(pluck('caseAccountId')))
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











{ label: 'Third Party Funder Name', value: item?.thirdPartyFunderName },
{ label: 'Original Due Date', value: item?.originalDueDate },
{ label: 'Account Term', value: item?.accountTerm },
{ label: 'Service Date', value: item?.serviceDate },
{ label: 'Quantity', value: item?.quantity },
{ label: 'Original Debt', value: item?.originalDebt },
{ label: 'Cost', value: item?.cost },
{ label: 'Balance', value: item?.balance },
{ label: 'Last Balance', value: item?.lastBalance },
{ label: 'Reduction', value: item?.reduction },
{ label: 'Treatment State', value: item?.treatmentState },
{ label: 'Account Number', value: item?.accountNumber },
{ label: 'Services Performed', value: item?.servicesPerformed },
{ label: 'Cpt Codes', value: item?.cptCodes },
{ label: 'Treating Physician', value: item?.treatingPhysician },
{ label: 'Referring Physician', value: item?.referringPhysician },
{ label: 'Collections Date', value: item?.collectionsDate },
{ label: 'Deemed Write off Date', value: item?.deemedWriteOffDate },
{ label: 'Expensed Bad Debt Date', value: item?.expensedBadDebtDate },
{ label: 'Paid Date', value: item?.paidDate },
{ label: 'Ghost Account', value: item?.ghostAccount },
{ label: 'Ghosted Date', value: item?.ghostedDate },
{ label: 'Ghosted by', value: item?.ghostedBy },
{ label: 'Un Ghosted Date', value: item?.unGhostedDate },
{ label: 'Un Ghosted by', value: item?.unGhostedBy },
{ label: 'Additional Payment', value: item?.additionalPayment },
{ label: 'Missing Bill', value: item?.missingBill },
{ label: 'Missing Lien', value: item?.missingLien },
{ label: 'Missing Medical Records', value: item?.missingMedicalRecords },
{ label: 'Assigned to', value: item?.assignedTo },
{ label: 'Resubmitted', value: item?.resubmitted },
{ label: 'Treatment City', value: item?.treatmentCity },
{ label: 'Origination', value: item?.origination },
{ label: 'Threshold Provider Rate', value: item?.thresholdProviderRate },
{ label: 'Threshold Location Rate', value: item?.thresholdLocationRate },
{ label: 'Team Leader Rate Source', value: item?.teamLeaderRateSource },
{ label: 'Check Number', value: item?.checkNumber },
{ label: 'Account Date Received', value: item?.accountDateReceived },
{ label: 'Date Applied', value: item?.dateApplied },
{ label: 'Amount Applied', value: item?.amountApplied },
{ label: 'Description', value: item?.description },
{ label: 'Note', value: item?.note },
{ label: 'Medicare Rate', value: item?.medicareRate },
{ label: 'Provider Percent of Medicare', value: item?.providerPercentOfMedicare },
{ label: 'Contracted Amount', value: item?.contractedAmount },
{ label: 'Markup Percent', value: item?.markupPercent },
{ label: 'Reimbursed Total', value: item?.reimbursedTotal },
{ label: 'Initial Revenue', value: item?.initialRevenue },
{ label: 'Factor', value: item?.factor },
{ label: 'Retail Bill', value: item?.retailBill },
{ label: 'Est Margin', value: item?.estMargin },
{ label: 'Roi', value: item?.roi },
{ label: 'Attorney Paid', value: item?.attorneyPaid },
{ label: 'Percent of Retail', value: item?.percentOfRetail },
{ label: 'Reimbursed From PCR', value: item?.reimbursedFromPCR },
{ label: 'Ingredient Cost', value: item?.ingredientCost },
{ label: 'Dispensing Cost', value: item?.dispensingCost },
{ label: 'Administrative Cost', value: item?.administrativeCost },
{ label: 'Co Pay', value: item?.coPay },
{ label: 'Total Cost', value: item?.totalCost },
{ label: 'Average Wholesale Price', value: item?.averageWholesalePrice },
{ label: 'Weighted Average Cost', value: item?.weightedAverageCost },
{ label: 'Average Sale Price', value: item?.averageSalePrice },
{ label: 'Invoice Cost', value: item?.invoiceCost },
{ label: 'Usual and Customary', value: item?.usualAndCustomary },
{ label: 'National Drug Code', value: item?.nationalDrugCode },

{ label: 'Write Offs', value: item?.writeOffs },
{ label: 'Case Account Payments', value: item?.caseAccountPayments },
{ label: 'Journal Entries', value: item?.journalEntries },
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

  readonly loadCaseAccountEffect = this.effect<string>((caseAccountId$) =>
    caseAccountId$.pipe(
      tap(() => this.setState({ loading: true })),
      switchMap((caseAccountId) =>
        this.data.userCaseAccount({ caseAccountId }).pipe(
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

  readonly deleteCaseAccountEffect = this.effect<CaseAccount>(
    (caseAccount$) =>
      caseAccount$.pipe(
        switchMap((caseAccount) =>
          this.data
            .userDeleteCaseAccount({
              caseAccountId: caseAccount.id,
            })
            .pipe(
              tapResponse(
                (res) =>
                {  
                    this.toast.success("Deleted successfully!", {duration: 3000})
                    return this.router.navigate(['/queues/case-accounts'])
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

