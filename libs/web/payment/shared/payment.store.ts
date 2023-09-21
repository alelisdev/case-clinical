
import { ComponentStore,tapResponse } from '@ngrx/component-store'
import { EMPTY } from 'rxjs'
import { FormService } from '@case-clinical/web/ui/form'
import { Injectable } from '@angular/core'
import { PaymentService } from './payment.service'
import { Router, ActivatedRoute } from '@angular/router'
import { switchMap, tap, withLatestFrom, map, catchError } from 'rxjs/operators'
import { UserCreatePaymentInput, UserUpdatePaymentInput, WebCoreDataAccessService, CorePaging, Payment, BatchControl,Bank,PayorType,PaymentType,PaymentApplicationMethod } from '@case-clinical/web/core/data-access'
import { WebUiToastService } from '@case-clinical/web/ui/toast'


export interface PaymentFeatureState {
  errors?: any
  loading?: boolean
  item?: Payment
  done: boolean,
  formName?: string
batchControlId?: string,bankId?: string,payorTypeId?: string,paymentTypeId?: string,paymentApplicationMethodId?: string,
  payments: Payment[]
 batchControls?: BatchControl[],
 banks?: Bank[],
 payorTypes?: PayorType[],
 paymentTypes?: PaymentType[],
 paymentApplicationMethods?: PaymentApplicationMethod[]
  searchQuery?: string
  paging?: CorePaging
}

@Injectable()
export class WebPaymentFeatureStore extends ComponentStore<PaymentFeatureState> {
  constructor(
    private readonly data: WebCoreDataAccessService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly toast: WebUiToastService,
    private readonly formService: FormService,
    private readonly paymentService: PaymentService
) {
    super({ 
      loading: false,
      payments: [],
      done: false,
      searchQuery: '',
      formName: undefined,
batchControlId: undefined,
bankId: undefined,
payorTypeId: undefined,
paymentTypeId: undefined,
paymentApplicationMethodId: undefined,
      paging: {
        limit: 10000,
        skip: 0,
      },
    })

    if (this.route.snapshot.paramMap.has('paymentId')) {
      var paymentId = this.route.snapshot.paramMap.get('paymentId')
      this.setFormName('payment_edit')
    } else {
      this.setFormName('payment_create')
    }


    if(this.route.snapshot.paramMap.has("batchControlId")) {
      var batchControlId = this.route.snapshot.paramMap.get("batchControlId")
      this.setBatchControlId(batchControlId)
    }


    if(this.route.snapshot.paramMap.has("bankId")) {
      var bankId = this.route.snapshot.paramMap.get("bankId")
      this.setBankId(bankId)
    }


    if(this.route.snapshot.paramMap.has("payorTypeId")) {
      var payorTypeId = this.route.snapshot.paramMap.get("payorTypeId")
      this.setPayorTypeId(payorTypeId)
    }


    if(this.route.snapshot.paramMap.has("paymentTypeId")) {
      var paymentTypeId = this.route.snapshot.paramMap.get("paymentTypeId")
      this.setPaymentTypeId(paymentTypeId)
    }


    if(this.route.snapshot.paramMap.has("paymentApplicationMethodId")) {
      var paymentApplicationMethodId = this.route.snapshot.paramMap.get("paymentApplicationMethodId")
      this.setPaymentApplicationMethodId(paymentApplicationMethodId)
    }



  }

  readonly errors$ = this.select((s) => s.errors)
  readonly loading$ = this.select((s) => s.loading)
  readonly done$ = this.select((s) => s.done)
  readonly item$ = this.select((s) => s.item)
  readonly payments$ = this.select((s) => s.payments)
  readonly batchControls$ = this.select((s) => s.batchControls || [])
  readonly banks$ = this.select((s) => s.banks || [])
  readonly payorTypes$ = this.select((s) => s.payorTypes || [])
  readonly paymentTypes$ = this.select((s) => s.paymentTypes || [])
  readonly paymentApplicationMethods$ = this.select((s) => s.paymentApplicationMethods || [])

readonly batchControlId$ = this.select((s) => s.batchControlId)

readonly bankId$ = this.select((s) => s.bankId)

readonly payorTypeId$ = this.select((s) => s.payorTypeId)

readonly paymentTypeId$ = this.select((s) => s.paymentTypeId)

readonly paymentApplicationMethodId$ = this.select((s) => s.paymentApplicationMethodId)

  readonly paging$ = this.select((s) => s.paging)
  readonly searchQuery$ = this.select((s) => s.searchQuery)
  readonly formName$ = this.select((s) => s.formName)

  readonly actionResult$ = this.select(this.item$, this.done$,
    (item, done ) => ({item,done,
    }),
    {debounce: true })


  readonly vm$ = this.select(this.errors$, this.loading$, this.item$, this.formName$, this.payments$,
this.batchControls$,this.banks$,this.payorTypes$,this.paymentTypes$,this.paymentApplicationMethods$,
    (errors, loading, item, formName, payments, batchControls,banks,payorTypes,paymentTypes,paymentApplicationMethods ) => ({
    errors,
    loading,
    item,
    formName,
    payments,

            batchControls,banks,payorTypes,paymentTypes,paymentApplicationMethods
  }),
{debounce: true})

  readonly input$ = this.select(this.paging$, this.batchControlId$,
this.bankId$,
this.payorTypeId$,
this.paymentTypeId$,
this.paymentApplicationMethodId$, this.searchQuery$, (paging, batchControlId,
bankId,
payorTypeId,
paymentTypeId,
paymentApplicationMethodId,searchQuery) => ({
    limit: paging.limit,
    skip: paging.skip,
    name: searchQuery,
    batchControlId: batchControlId,bankId: bankId,payorTypeId: payorTypeId,paymentTypeId: paymentTypeId,paymentApplicationMethodId: paymentApplicationMethodId,
    total: paging.total
  }))

  readonly setFormName = this.updater((state, formName: string) => ({
    ...state,
    formName,
  }))



            readonly setBatchControlId = this.updater((state, batchControlId: string) => ({
                ...state,
    batchControlId,
  }))


            readonly setBankId = this.updater((state, bankId: string) => ({
                ...state,
    bankId,
  }))


            readonly setPayorTypeId = this.updater((state, payorTypeId: string) => ({
                ...state,
    payorTypeId,
  }))


            readonly setPaymentTypeId = this.updater((state, paymentTypeId: string) => ({
                ...state,
    paymentTypeId,
  }))


            readonly setPaymentApplicationMethodId = this.updater((state, paymentApplicationMethodId: string) => ({
                ...state,
    paymentApplicationMethodId,
  }))



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

    

  readonly setItem = this.updater((state, item: Payment) => ({...state, item}))

  addNewPayment = this.updater((state, payment: Payment) => ({ ...state, payments: [...state.payments, payment] }))

  updatePayment = this.updater((state, payment: Payment) => {
    return {
      ...state,
      payments: state.payments.map((el) => {
        if (el.id === payment.id) {
          return payment
        } else {
          return el
        }
      }),
    }
  })

  addPayments = this.updater((state, newPayments: any[]) => ({...state, payments: state.payments.concat(newPayments) }))
  updatePayments = this.updater((state, updatedPayments: any[]) => {
    return {
      ...state,
      payments: state.payments.map((payment) => {
        const updated = updatedPayments.find((el) => el.id === payment.id);
        return updated ? updated : payment;
      })
    }
  })

  readonly setSearchQuery = this.updater((state, searchQuery: string) => ({
    ...state,
    searchQuery
  }))

  validateImportData(excelData: any[]) {
    return this.vm$.pipe(
      switchMap((vm) => {
        return this.paymentService.validatePaymentExcelData(excelData, vm.batchControls,vm.banks,vm.payorTypes,vm.paymentTypes,vm.paymentApplicationMethods);
      })
    )
  }


  readonly loadPaymentEffect = this.effect<string>((paymentId$) =>
    paymentId$.pipe(
      tap(() => this.patchState({ loading: true })),
      switchMap((paymentId) =>
        this.data.userPayment({ paymentId }).pipe(
          tapResponse(
            (res) => {
                    this.patchState({ 
                    item: res.data.item, 
                    errors: res.errors, 
                    loading: false 
                })
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



  readonly loadPaymentsEffect = this.effect(($) =>
    $.pipe(
      tap(() => this.patchState({ loading: true })),
      withLatestFrom(this.input$),
      switchMap(([_, input]) =>
        this.data.userPayments({input}).pipe(
          tapResponse(
            (res) =>
              this.patchState({
                paging: {limit: input.limit, skip: input.skip, total: res.data.count.total},
                payments: res.data.items,
                errors: res.errors,
                loading: false,
              }),
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

  readonly createPaymentEffect = this.effect<UserCreatePaymentInput>((input$) =>
    input$.pipe(
      tap(() => this.patchState({loading: true })),
      switchMap((input) =>
        this.paymentService.createPayment({...input }).pipe(
          tapResponse(
            (payment: Payment) => {
              this.addNewPayment(payment)
              this.toast.success('Created Successfully!');
              setTimeout(() => this.patchState({ item: payment, loading: false, done: true }), 300);
              setTimeout(() => this.patchState({ done: false, item: null }), 600);
            },
            (errors: any) => {
              if (errors.graphQLErrors) {
                this.toast.error(errors.graphQLErrors[0].message, { duration: 3000 })
                this.patchState({
                  loading: false,
                  errors: errors.graphQLErrors ? errors.graphQLErrors : errors,
                })
              } else {
                this.toast.error(errors.Message)
                this.formService.setErrors(errors.Data)
              }
            }
          ),
        ),
      ),
    ),
  )

    readonly updatePaymentEffect = this.effect<UserUpdatePaymentInput>((input$) =>
        input$.pipe(
          tap(() => this.patchState({ loading: true })),
          withLatestFrom(this.item$),
          switchMap(([input, item]) =>
            this.paymentService.updatePayment(input, input.id).pipe(
              tapResponse(
                (payment) => {
                  this.updatePayment(payment)
                  this.toast.success('Updated Successfully!')
                  setTimeout(() => this.patchState({item: payment, loading: false, done: true }), 300);
                  setTimeout(() => this.patchState({done: false, item: null }), 600);
                },
                (errors: any) => {
                  if (errors.graphQLErrors) {
                      this.toast.error(errors.graphQLErrors[0].message, { duration: 3000 })
                      this.patchState({
                        loading: false,
                        errors: errors.graphQLErrors ? errors.graphQLErrors : errors,
                      })
                  } else {
                    this.toast.error(errors.Message)
                    this.formService.setErrors(errors.Data)
                  }
                }
              ),
            ),
          ),
        ),
      )
  
    readonly deletePaymentEffect = this.effect(
    ($) =>
      $.pipe(
        tap(() => this.patchState({ loading: true })),
        withLatestFrom(this.item$),
        switchMap(([_, payment]) => {
          return this.data.userDeletePayment({paymentId: payment.id})
            .pipe(
              tapResponse(
                (res) => {
                  this.toast.success("Deleted successfully!", { duration: 3000 })
                  setTimeout(() => this.patchState({ item: res.data.deleted, loading: false, done: true }), 300);
                  setTimeout(() => this.patchState({ done: false, item: null }), 600);
                },
                (errors: any) => {
                  if (errors.graphQLErrors) {
                    this.toast.error(errors.graphQLErrors[0].message, { duration: 3000 })
                    this.patchState({
                      loading: false,
                      errors: errors.graphQLErrors ? errors.graphQLErrors : errors,
                    })
                  } else {
                    this.toast.error(errors.Message)
                    this.formService.setErrors(errors.Data)
                  }
                }),
            )}
        ),
      ),
  )

  readonly importExcelEffect = this.effect<UserUpdatePaymentInput[]>(($data) =>
    $data.pipe(
      tap(() => this.patchState({loading: true })),
      switchMap((data) => this.paymentService.importPayments(data).pipe(
        catchError(error => {
          this.toast.error(error.Message ?? 'Failed to save', { duration: 3000 })
          return EMPTY;
        }),
        tap(
          (updateResult) => {
            const created = JSON.parse(updateResult.created);
            const updated = JSON.parse(updateResult.updated);
            const failed = JSON.parse(updateResult.failed);
            const total = created.length + updated.length + failed.length;

            this.addPayments(created);
            this.updatePayments(updated);

            this.toast.success(`${created.length} created, ${updated.length} updated, ${failed.length} failed of total ${total}`, { duration: 3000 })
          }
        )
      ))
    )
  )

}
