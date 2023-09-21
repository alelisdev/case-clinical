
import { Injectable } from '@angular/core'
import { Router, ActivatedRoute } from '@angular/router'
import { UserCreateCaseAccountPaymentInput, WebCoreDataAccessService, CaseAccountPayment, Payment,CaseAccount } from '@case-clinical/web/core/data-access'
import { ComponentStore,tapResponse } from '@ngrx/component-store'
import { switchMap, tap, map } from 'rxjs/operators'
import { WebUiToastService } from '@case-clinical/web/ui/toast'
import { FormService } from '@case-clinical/web/ui/form'
import { CaseAccountPaymentService } from '@case-clinical/web/case-account-payment/shared'

export interface CaseAccountPaymentCreateState {
  errors?: any
  loading?: boolean
  item?: CaseAccountPayment,
 payments?: Payment[],
 caseAccounts?: CaseAccount[]
  searchTerm?: string
}

@Injectable()
export class WebCaseAccountPaymentCreateStore extends ComponentStore<CaseAccountPaymentCreateState> {
  constructor(
    private readonly data: WebCoreDataAccessService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly toast: WebUiToastService,
    private readonly formService: FormService,
    private readonly caseAccountPaymentService: CaseAccountPaymentService
) {
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
        this.data.userSelectCaseAccounts({input: { name: term}}).pipe(
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



  readonly addPayment = this.updater((state, payment: Payment) => ({
    ...state, payments: state.payments.concat(payment)
  }))


  readonly addCaseAccount = this.updater((state, caseAccount: CaseAccount) => ({
    ...state, caseAccounts: state.caseAccounts.concat(caseAccount)
  }))

    

  readonly createCaseAccountPaymentEffect = this.effect<UserCreateCaseAccountPaymentInput>((input$) =>
    input$.pipe(
      tap(() => this.patchState({ loading: true })),
      switchMap((input) =>
         this.caseAccountPaymentService.createCaseAccountPayment({...input}).pipe(
          tapResponse(
            (caseAccountPayment: CaseAccountPayment) => {
              this.patchState({ item: caseAccountPayment, loading: false })
              return this.router.navigate(['..', caseAccountPayment?.id], {relativeTo: this.route})
            },
            (errors: any) => {
              this.toast.error(errors.Message)
              this.formService.setErrors(errors.Data)
              this.patchState({
                loading: false,
                errors: errors.graphQLErrors ? errors.graphQLErrors : errors,
              })
            }
          ),
        ),
      ),
    ),
  )
}
