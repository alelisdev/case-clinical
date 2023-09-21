
import { ComponentStore,tapResponse } from '@ngrx/component-store'
import { EMPTY } from 'rxjs'
import { FormService } from '@case-clinical/web/ui/form'
import { Injectable } from '@angular/core'
import { CaseAccountPaymentService } from './case-account-payment.service'
import { Router, ActivatedRoute } from '@angular/router'
import { switchMap, tap, withLatestFrom, map, catchError } from 'rxjs/operators'
import { UserCreateCaseAccountPaymentInput, UserUpdateCaseAccountPaymentInput, WebCoreDataAccessService, CorePaging, CaseAccountPayment, Payment,CaseAccount } from '@case-clinical/web/core/data-access'
import { WebUiToastService } from '@case-clinical/web/ui/toast'


export interface CaseAccountPaymentFeatureState {
  errors?: any
  loading?: boolean
  item?: CaseAccountPayment
  done: boolean,
  formName?: string
paymentId?: string,caseAccountId?: string,
  caseAccountPayments: CaseAccountPayment[]
 payments?: Payment[],
 caseAccounts?: CaseAccount[]
  searchQuery?: string
  paging?: CorePaging
}

@Injectable()
export class WebCaseAccountPaymentFeatureStore extends ComponentStore<CaseAccountPaymentFeatureState> {
  constructor(
    private readonly data: WebCoreDataAccessService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly toast: WebUiToastService,
    private readonly formService: FormService,
    private readonly caseAccountPaymentService: CaseAccountPaymentService
) {
    super({ 
      loading: false,
      caseAccountPayments: [],
      done: false,
      searchQuery: '',
      formName: undefined,
paymentId: undefined,
caseAccountId: undefined,
      paging: {
        limit: 10000,
        skip: 0,
      },
    })

    if (this.route.snapshot.paramMap.has('caseAccountPaymentId')) {
      var caseAccountPaymentId = this.route.snapshot.paramMap.get('caseAccountPaymentId')
      this.setFormName('caseAccountPayment_edit')
    } else {
      this.setFormName('caseAccountPayment_create')
    }


    if(this.route.snapshot.paramMap.has("paymentId")) {
      var paymentId = this.route.snapshot.paramMap.get("paymentId")
      this.setPaymentId(paymentId)
    }


    if(this.route.snapshot.paramMap.has("caseAccountId")) {
      var caseAccountId = this.route.snapshot.paramMap.get("caseAccountId")
      this.setCaseAccountId(caseAccountId)
    }



  }

  readonly errors$ = this.select((s) => s.errors)
  readonly loading$ = this.select((s) => s.loading)
  readonly done$ = this.select((s) => s.done)
  readonly item$ = this.select((s) => s.item)
  readonly caseAccountPayments$ = this.select((s) => s.caseAccountPayments)
  readonly payments$ = this.select((s) => s.payments || [])
  readonly caseAccounts$ = this.select((s) => s.caseAccounts || [])

readonly paymentId$ = this.select((s) => s.paymentId)

readonly caseAccountId$ = this.select((s) => s.caseAccountId)

  readonly paging$ = this.select((s) => s.paging)
  readonly searchQuery$ = this.select((s) => s.searchQuery)
  readonly formName$ = this.select((s) => s.formName)

  readonly actionResult$ = this.select(this.item$, this.done$,
    (item, done ) => ({item,done,
    }),
    {debounce: true })


  readonly vm$ = this.select(this.errors$, this.loading$, this.item$, this.formName$, this.caseAccountPayments$,
this.payments$,this.caseAccounts$,
    (errors, loading, item, formName, caseAccountPayments, payments,caseAccounts ) => ({
    errors,
    loading,
    item,
    formName,
    caseAccountPayments,

            payments,caseAccounts
  }),
{debounce: true})

  readonly input$ = this.select(this.paging$, this.paymentId$,
this.caseAccountId$, this.searchQuery$, (paging, paymentId,
caseAccountId,searchQuery) => ({
    limit: paging.limit,
    skip: paging.skip,
    name: searchQuery,
    paymentId: paymentId,caseAccountId: caseAccountId,
    total: paging.total
  }))

  readonly setFormName = this.updater((state, formName: string) => ({
    ...state,
    formName,
  }))



            readonly setPaymentId = this.updater((state, paymentId: string) => ({
                ...state,
    paymentId,
  }))


            readonly setCaseAccountId = this.updater((state, caseAccountId: string) => ({
                ...state,
    caseAccountId,
  }))



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

    

  readonly setItem = this.updater((state, item: CaseAccountPayment) => ({...state, item}))

  addNewCaseAccountPayment = this.updater((state, caseAccountPayment: CaseAccountPayment) => ({ ...state, caseAccountPayments: [...state.caseAccountPayments, caseAccountPayment] }))

  updateCaseAccountPayment = this.updater((state, caseAccountPayment: CaseAccountPayment) => {
    return {
      ...state,
      caseAccountPayments: state.caseAccountPayments.map((el) => {
        if (el.id === caseAccountPayment.id) {
          return caseAccountPayment
        } else {
          return el
        }
      }),
    }
  })

  addCaseAccountPayments = this.updater((state, newCaseAccountPayments: any[]) => ({...state, caseAccountPayments: state.caseAccountPayments.concat(newCaseAccountPayments) }))
  updateCaseAccountPayments = this.updater((state, updatedCaseAccountPayments: any[]) => {
    return {
      ...state,
      caseAccountPayments: state.caseAccountPayments.map((caseAccountPayment) => {
        const updated = updatedCaseAccountPayments.find((el) => el.id === caseAccountPayment.id);
        return updated ? updated : caseAccountPayment;
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
        return this.caseAccountPaymentService.validateCaseAccountPaymentExcelData(excelData, vm.payments,vm.caseAccounts);
      })
    )
  }


  readonly loadCaseAccountPaymentEffect = this.effect<string>((caseAccountPaymentId$) =>
    caseAccountPaymentId$.pipe(
      tap(() => this.patchState({ loading: true })),
      switchMap((caseAccountPaymentId) =>
        this.data.userCaseAccountPayment({ caseAccountPaymentId }).pipe(
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



  readonly loadCaseAccountPaymentsEffect = this.effect(($) =>
    $.pipe(
      tap(() => this.patchState({ loading: true })),
      withLatestFrom(this.input$),
      switchMap(([_, input]) =>
        this.data.userCaseAccountPayments({input}).pipe(
          tapResponse(
            (res) =>
              this.patchState({
                paging: {limit: input.limit, skip: input.skip, total: res.data.count.total},
                caseAccountPayments: res.data.items,
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

  readonly createCaseAccountPaymentEffect = this.effect<UserCreateCaseAccountPaymentInput>((input$) =>
    input$.pipe(
      tap(() => this.patchState({loading: true })),
      switchMap((input) =>
        this.caseAccountPaymentService.createCaseAccountPayment({...input }).pipe(
          tapResponse(
            (caseAccountPayment: CaseAccountPayment) => {
              this.addNewCaseAccountPayment(caseAccountPayment)
              this.toast.success('Created Successfully!');
              setTimeout(() => this.patchState({ item: caseAccountPayment, loading: false, done: true }), 300);
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

    readonly updateCaseAccountPaymentEffect = this.effect<UserUpdateCaseAccountPaymentInput>((input$) =>
        input$.pipe(
          tap(() => this.patchState({ loading: true })),
          withLatestFrom(this.item$),
          switchMap(([input, item]) =>
            this.caseAccountPaymentService.updateCaseAccountPayment(input, input.id).pipe(
              tapResponse(
                (caseAccountPayment) => {
                  this.updateCaseAccountPayment(caseAccountPayment)
                  this.toast.success('Updated Successfully!')
                  setTimeout(() => this.patchState({item: caseAccountPayment, loading: false, done: true }), 300);
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
  
    readonly deleteCaseAccountPaymentEffect = this.effect(
    ($) =>
      $.pipe(
        tap(() => this.patchState({ loading: true })),
        withLatestFrom(this.item$),
        switchMap(([_, caseAccountPayment]) => {
          return this.data.userDeleteCaseAccountPayment({caseAccountPaymentId: caseAccountPayment.id})
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

  readonly importExcelEffect = this.effect<UserUpdateCaseAccountPaymentInput[]>(($data) =>
    $data.pipe(
      tap(() => this.patchState({loading: true })),
      switchMap((data) => this.caseAccountPaymentService.importCaseAccountPayments(data).pipe(
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

            this.addCaseAccountPayments(created);
            this.updateCaseAccountPayments(updated);

            this.toast.success(`${created.length} created, ${updated.length} updated, ${failed.length} failed of total ${total}`, { duration: 3000 })
          }
        )
      ))
    )
  )

}
