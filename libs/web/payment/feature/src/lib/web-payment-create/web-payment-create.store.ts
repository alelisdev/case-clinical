
import { Injectable } from '@angular/core'
import { Router, ActivatedRoute } from '@angular/router'
import { UserCreatePaymentInput, WebCoreDataAccessService, Payment, BatchControl,Bank,PayorType,PaymentType,PaymentApplicationMethod } from '@case-clinical/web/core/data-access'
import { ComponentStore,tapResponse } from '@ngrx/component-store'
import { switchMap, tap, map } from 'rxjs/operators'
import { WebUiToastService } from '@case-clinical/web/ui/toast'
import { FormService } from '@case-clinical/web/ui/form'
import { PaymentService } from '@case-clinical/web/payment/shared'

export interface PaymentCreateState {
  errors?: any
  loading?: boolean
  item?: Payment,
 batchControls?: BatchControl[],
 banks?: Bank[],
 payorTypes?: PayorType[],
 paymentTypes?: PaymentType[],
 paymentApplicationMethods?: PaymentApplicationMethod[]
  searchTerm?: string
}

@Injectable()
export class WebPaymentCreateStore extends ComponentStore<PaymentCreateState> {
  constructor(
    private readonly data: WebCoreDataAccessService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly toast: WebUiToastService,
    private readonly formService: FormService,
    private readonly paymentService: PaymentService
) {
    super({ loading: false })
  }

  readonly errors$ = this.select((s) => s.errors)
  readonly loading$ = this.select((s) => s.loading)
  readonly item$ = this.select((s) => s.item)
  readonly batchControls$ = this.select((s) => s.batchControls || [])
  readonly banks$ = this.select((s) => s.banks || [])
  readonly payorTypes$ = this.select((s) => s.payorTypes || [])
  readonly paymentTypes$ = this.select((s) => s.paymentTypes || [])
  readonly paymentApplicationMethods$ = this.select((s) => s.paymentApplicationMethods || [])
  readonly vm$ = this.select(this.errors$, this.loading$, this.item$, 
this.batchControls$,this.banks$,this.payorTypes$,this.paymentTypes$,this.paymentApplicationMethods$,
    (errors, loading, item, batchControls,banks,payorTypes,paymentTypes,paymentApplicationMethods ) => ({
    errors,
    loading,
    item,
batchControls,banks,payorTypes,paymentTypes,paymentApplicationMethods
  }),
{debounce: true})



  readonly filterBatchControls = (term) => 
        this.data.userSelectBatchControls({input: { name: term}}).pipe(
          tapResponse(
            (res: any) => {
              let batchControls = res.data.items;
              this.patchState({batchControls})
              return batchControls
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


  readonly filterBanks = (term) => 
        this.data.userSelectBanks({input: { name: term}}).pipe(
          tapResponse(
            (res: any) => {
              let banks = res.data.items;
              this.patchState({banks})
              return banks
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


  readonly filterPayorTypes = (term) => 
        this.data.userSelectPayorTypes({input: { name: term}}).pipe(
          tapResponse(
            (res: any) => {
              let payorTypes = res.data.items;
              this.patchState({payorTypes})
              return payorTypes
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


  readonly filterPaymentTypes = (term) => 
        this.data.userSelectPaymentTypes({input: { name: term}}).pipe(
          tapResponse(
            (res: any) => {
              let paymentTypes = res.data.items;
              this.patchState({paymentTypes})
              return paymentTypes
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


  readonly filterPaymentApplicationMethods = (term) => 
        this.data.userSelectPaymentApplicationMethods({input: { name: term}}).pipe(
          tapResponse(
            (res: any) => {
              let paymentApplicationMethods = res.data.items;
              this.patchState({paymentApplicationMethods})
              return paymentApplicationMethods
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



  readonly addBatchControl = this.updater((state, batchControl: BatchControl) => ({
    ...state, batchControls: state.batchControls.concat(batchControl)
  }))


  readonly addBank = this.updater((state, bank: Bank) => ({
    ...state, banks: state.banks.concat(bank)
  }))


  readonly addPayorType = this.updater((state, payorType: PayorType) => ({
    ...state, payorTypes: state.payorTypes.concat(payorType)
  }))


  readonly addPaymentType = this.updater((state, paymentType: PaymentType) => ({
    ...state, paymentTypes: state.paymentTypes.concat(paymentType)
  }))


  readonly addPaymentApplicationMethod = this.updater((state, paymentApplicationMethod: PaymentApplicationMethod) => ({
    ...state, paymentApplicationMethods: state.paymentApplicationMethods.concat(paymentApplicationMethod)
  }))

    

  readonly createPaymentEffect = this.effect<UserCreatePaymentInput>((input$) =>
    input$.pipe(
      tap(() => this.patchState({ loading: true })),
      switchMap((input) =>
         this.paymentService.createPayment({...input}).pipe(
          tapResponse(
            (payment: Payment) => {
              this.patchState({ item: payment, loading: false })
              return this.router.navigate(['..', payment?.id], {relativeTo: this.route})
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
