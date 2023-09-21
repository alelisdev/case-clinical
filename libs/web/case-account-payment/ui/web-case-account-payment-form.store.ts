
import { Injectable } from '@angular/core'
import { WebCoreDataAccessService, CaseAccountPayment, UserCreateCaseAccountPaymentInput, Payment,CaseAccount } from '@case-clinical/web/core/data-access'
import { ComponentStore,tapResponse } from '@ngrx/component-store'
import { switchMap, tap, map } from 'rxjs/operators'

export interface CaseAccountPaymentFormState {
  errors?: any
  loading?: boolean
  item?: CaseAccountPayment,
 payments?: Payment[],
 caseAccounts?: CaseAccount[]
  searchTerm?: string
}

@Injectable()
export class WebCaseAccountPaymentFormStore extends ComponentStore<CaseAccountPaymentFormState> {
  constructor(private readonly data: WebCoreDataAccessService) {
    super({ loading: false })
  }

  readonly errors$ = this.select((s) => s.errors)
  readonly loading$ = this.select((s) => s.loading)
  readonly item$ = this.select((s) => s.item)
  readonly payments$ = this.select((s) => s.payments || [])
  readonly caseAccounts$ = this.select((s) => s.caseAccounts || [])
  readonly vm$ = this.select(this.errors$, this.loading$, this.item$, 
this.payments$,this.caseAccounts$,
    (errors, loading, item, payments,caseAccounts ) => ({
    errors,
    loading,
    item,
payments,caseAccounts
  }),
{debounce: true})



  readonly filterPayments = (term) => 
        this.data.userSelectPayments({input: { name: term}}).pipe(
          tapResponse(
            (res: any) => {
              let payments = res.data.items;
              this.patchState({payments})
              return payments
            },
            (errors: any) =>
              this.patchState({
                errors: errors.graphQLErrors ? errors.graphQLErrors : errors,
              }),
          ),
        map(result => {
          return result.data.items;
        })
  )


  readonly filterCaseAccounts = (term) => 
        this.data.userCaseAccounts({input: { name: term}}).pipe(
          tapResponse(
            (res: any) => {
              let caseAccounts = res.data.items;
              this.patchState({caseAccounts})
              return caseAccounts
            },
            (errors: any) =>
              this.patchState({
                errors: errors.graphQLErrors ? errors.graphQLErrors : errors,
              }),
          ),
        map(result => {
          return result.data.items;
        })
  )



  readonly createCaseAccountPaymentEffect = this.effect<UserCreateCaseAccountPaymentInput>((input$) =>
    input$.pipe(
      tap(() => this.patchState({ loading: true })),
      switchMap((input) =>
        this.data.userCreateCaseAccountPayment({ input }).pipe(
          tapResponse(
            (res) => {
              this.patchState({ item: res.data.created, errors: res.errors, loading: false })
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


  readonly addPayment = this.updater((state, payment: Payment) => ({
    ...state, payments: state.payments.concat(payment)
  }))


  readonly addCaseAccount = this.updater((state, caseAccount: CaseAccount) => ({
    ...state, caseAccounts: state.caseAccounts.concat(caseAccount)
  }))

}
