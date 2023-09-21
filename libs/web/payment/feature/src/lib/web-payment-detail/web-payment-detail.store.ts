
import { Injectable } from '@angular/core'
import { ActivatedRoute,Router } from '@angular/router'
import { ComponentStore,tapResponse } from '@ngrx/component-store'
import { WebCoreDataAccessService,Payment } from '@case-clinical/web/core/data-access'
import { pluck,switchMap, tap } from 'rxjs/operators'
import { DescriptionListItem } from '@case-clinical/web/ui/description-list'
import { WebUiToastService } from '@case-clinical/web/ui/toast'

export interface PaymentDetailState {
  errors ?: any
  loading?: boolean
  item?: Payment
}

@Injectable()
export class WebPaymentDetailStore extends ComponentStore<PaymentDetailState> {
  constructor(
    private readonly data: WebCoreDataAccessService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly toast: WebUiToastService
) {
    super({ loading: false })
    this.loadPaymentEffect(route.params.pipe(pluck('paymentId')))
  }

  readonly errors$ = this.select((s) => s.errors)
  readonly loading$ = this.select((s) => s.loading)
  readonly item$ = this.select((s) => s.item)

readonly displayItems$ = this.select(
    this.item$,
    (item) =>
      [
{ label: 'Id', value: item?.id },
{ label: 'Paid on', value: item?.paidOn },
{ label: 'Name', value: item?.name },




{ label: 'Amount', value: item?.amount },
{ label: 'Collected', value: item?.collected },
{ label: 'Dac', value: item?.dac },
{ label: 'Is Partial', value: item?.isPartial },
{ label: 'Date Received', value: item?.dateReceived },
{ label: 'Memo', value: item?.memo },
{ label: 'Created by', value: item?.createdBy },
{ label: 'Date Created', value: item?.dateCreated },
{ label: 'Securitization Group', value: item?.securitizationGroup },

{ label: 'Case Account Payments', value: item?.caseAccountPayments },
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

  readonly loadPaymentEffect = this.effect<string>((paymentId$) =>
    paymentId$.pipe(
      tap(() => this.setState({ loading: true })),
      switchMap((paymentId) =>
        this.data.userPayment({ paymentId }).pipe(
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

  readonly deletePaymentEffect = this.effect<Payment>(
    (payment$) =>
      payment$.pipe(
        switchMap((payment) =>
          this.data
            .userDeletePayment({
              paymentId: payment.id,
            })
            .pipe(
              tapResponse(
                (res) =>
                {  
                    this.toast.success("Deleted successfully!", {duration: 3000})
                    return this.router.navigate(['/queues/payments'])
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

