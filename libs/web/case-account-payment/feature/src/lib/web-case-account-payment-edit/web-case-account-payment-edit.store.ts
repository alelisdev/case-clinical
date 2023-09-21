
import { Injectable } from '@angular/core'
import { Router, ActivatedRoute } from '@angular/router'
import { UserUpdateCaseAccountPaymentInput, WebCoreDataAccessService, CaseAccountPayment, Payment,CaseAccount } from '@case-clinical/web/core/data-access'
import { ComponentStore,tapResponse } from '@ngrx/component-store'
import { switchMap, tap, map, withLatestFrom } from 'rxjs/operators'
import { WebUiToastService } from '@case-clinical/web/ui/toast'
import { FormService } from '@case-clinical/web/ui/form'
import { CaseAccountPaymentService } from '@case-clinical/web/case-account-payment/shared'

export interface CaseAccountPaymentEditState {
  errors?: any
  loading?: boolean
  item?: CaseAccountPayment,
 payments?: Payment[],
 caseAccounts?: CaseAccount[]
  searchTerm?: string
}

@Injectable()
export class WebCaseAccountPaymentEditStore extends ComponentStore<CaseAccountPaymentEditState> {
  constructor(
    private readonly data: WebCoreDataAccessService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly toast: WebUiToastService,
    private readonly formService: FormService,
    private readonly caseAccountPaymentService: CaseAccountPaymentService
) {
    super({ loading: false })
    
    this.loadCaseAccountPaymentEffect(route.params.pipe(map((route) => route?.caseAccountPaymentId)))
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

  
  readonly loadCaseAccountPaymentEffect = this.effect<string>((caseAccountPaymentId$) =>
     caseAccountPaymentId$.pipe(
      tap(() => this.setState({loading: true })),
      switchMap((caseAccountPaymentId) =>
        this.data.userCaseAccountPayment({caseAccountPaymentId}).pipe(
          tapResponse(
            (res) => {
              this.patchState({ item: res.data.item, errors: res.errors, loading: false })
            },
            (errors: any) =>
              this.patchState({loading: false,
                errors: errors.graphQLErrors ? errors.graphQLErrors : errors,
              }),
          ),
        ),
      ),
    ),
  )

  readonly updateCaseAccountPaymentEffect = this.effect<UserUpdateCaseAccountPaymentInput>((input$) =>
    input$.pipe(
      tap(() => this.patchState({ loading: true })),
      withLatestFrom(this.item$),
      switchMap(([input, item]) =>
         this.caseAccountPaymentService.updateCaseAccountPayment(input, item?.id).pipe(
          tapResponse(
            (response: any) => {
              this.toast.success('Changed Successfully')
              this.router.navigate(['..'], { relativeTo: this.route })
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
