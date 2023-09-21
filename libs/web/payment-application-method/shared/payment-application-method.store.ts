
import { ComponentStore,tapResponse } from '@ngrx/component-store'
import { EMPTY } from 'rxjs'
import { FormService } from '@case-clinical/web/ui/form'
import { Injectable } from '@angular/core'
import { PaymentApplicationMethodService } from './payment-application-method.service'
import { Router, ActivatedRoute } from '@angular/router'
import { switchMap, tap, withLatestFrom, map, catchError } from 'rxjs/operators'
import { UserCreatePaymentApplicationMethodInput, UserUpdatePaymentApplicationMethodInput, WebCoreDataAccessService, CorePaging, PaymentApplicationMethod,  } from '@case-clinical/web/core/data-access'
import { WebUiToastService } from '@case-clinical/web/ui/toast'


export interface PaymentApplicationMethodFeatureState {
  errors?: any
  loading?: boolean
  item?: PaymentApplicationMethod
  done: boolean,
  formName?: string

  paymentApplicationMethods: PaymentApplicationMethod[]

  searchQuery?: string
  paging?: CorePaging
}

@Injectable()
export class WebPaymentApplicationMethodFeatureStore extends ComponentStore<PaymentApplicationMethodFeatureState> {
  constructor(
    private readonly data: WebCoreDataAccessService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly toast: WebUiToastService,
    private readonly formService: FormService,
    private readonly paymentApplicationMethodService: PaymentApplicationMethodService
) {
    super({ 
      loading: false,
      paymentApplicationMethods: [],
      done: false,
      searchQuery: '',
      formName: undefined,

      paging: {
        limit: 10000,
        skip: 0,
      },
    })

    if (this.route.snapshot.paramMap.has('paymentApplicationMethodId')) {
      var paymentApplicationMethodId = this.route.snapshot.paramMap.get('paymentApplicationMethodId')
      this.setFormName('paymentApplicationMethod_edit')
    } else {
      this.setFormName('paymentApplicationMethod_create')
    }




  }

  readonly errors$ = this.select((s) => s.errors)
  readonly loading$ = this.select((s) => s.loading)
  readonly done$ = this.select((s) => s.done)
  readonly item$ = this.select((s) => s.item)
  readonly paymentApplicationMethods$ = this.select((s) => s.paymentApplicationMethods)


  readonly paging$ = this.select((s) => s.paging)
  readonly searchQuery$ = this.select((s) => s.searchQuery)
  readonly formName$ = this.select((s) => s.formName)

  readonly actionResult$ = this.select(this.item$, this.done$,
    (item, done ) => ({item,done,
    }),
    {debounce: true })


  readonly vm$ = this.select(this.errors$, this.loading$, this.item$, this.formName$, this.paymentApplicationMethods$,

    (errors, loading, item, formName, paymentApplicationMethods,  ) => ({
    errors,
    loading,
    item,
    formName,
    paymentApplicationMethods,

            
  }),
{debounce: true})

  readonly input$ = this.select(this.paging$,  this.searchQuery$, (paging, searchQuery) => ({
    limit: paging.limit,
    skip: paging.skip,
    name: searchQuery,
    
    total: paging.total
  }))

  readonly setFormName = this.updater((state, formName: string) => ({
    ...state,
    formName,
  }))







    

  readonly setItem = this.updater((state, item: PaymentApplicationMethod) => ({...state, item}))

  addNewPaymentApplicationMethod = this.updater((state, paymentApplicationMethod: PaymentApplicationMethod) => ({ ...state, paymentApplicationMethods: [...state.paymentApplicationMethods, paymentApplicationMethod] }))

  updatePaymentApplicationMethod = this.updater((state, paymentApplicationMethod: PaymentApplicationMethod) => {
    return {
      ...state,
      paymentApplicationMethods: state.paymentApplicationMethods.map((el) => {
        if (el.id === paymentApplicationMethod.id) {
          return paymentApplicationMethod
        } else {
          return el
        }
      }),
    }
  })

  addPaymentApplicationMethods = this.updater((state, newPaymentApplicationMethods: any[]) => ({...state, paymentApplicationMethods: state.paymentApplicationMethods.concat(newPaymentApplicationMethods) }))
  updatePaymentApplicationMethods = this.updater((state, updatedPaymentApplicationMethods: any[]) => {
    return {
      ...state,
      paymentApplicationMethods: state.paymentApplicationMethods.map((paymentApplicationMethod) => {
        const updated = updatedPaymentApplicationMethods.find((el) => el.id === paymentApplicationMethod.id);
        return updated ? updated : paymentApplicationMethod;
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
        return this.paymentApplicationMethodService.validatePaymentApplicationMethodExcelData(excelData);
      })
    )
  }


  readonly loadPaymentApplicationMethodEffect = this.effect<string>((paymentApplicationMethodId$) =>
    paymentApplicationMethodId$.pipe(
      tap(() => this.patchState({ loading: true })),
      switchMap((paymentApplicationMethodId) =>
        this.data.userPaymentApplicationMethod({ paymentApplicationMethodId }).pipe(
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



  readonly loadPaymentApplicationMethodsEffect = this.effect(($) =>
    $.pipe(
      tap(() => this.patchState({ loading: true })),
      withLatestFrom(this.input$),
      switchMap(([_, input]) =>
        this.data.userPaymentApplicationMethods({input}).pipe(
          tapResponse(
            (res) =>
              this.patchState({
                paging: {limit: input.limit, skip: input.skip, total: res.data.count.total},
                paymentApplicationMethods: res.data.items,
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

  readonly createPaymentApplicationMethodEffect = this.effect<UserCreatePaymentApplicationMethodInput>((input$) =>
    input$.pipe(
      tap(() => this.patchState({loading: true })),
      switchMap((input) =>
        this.paymentApplicationMethodService.createPaymentApplicationMethod({...input }).pipe(
          tapResponse(
            (paymentApplicationMethod: PaymentApplicationMethod) => {
              this.addNewPaymentApplicationMethod(paymentApplicationMethod)
              this.toast.success('Created Successfully!');
              setTimeout(() => this.patchState({ item: paymentApplicationMethod, loading: false, done: true }), 300);
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

    readonly updatePaymentApplicationMethodEffect = this.effect<UserUpdatePaymentApplicationMethodInput>((input$) =>
        input$.pipe(
          tap(() => this.patchState({ loading: true })),
          withLatestFrom(this.item$),
          switchMap(([input, item]) =>
            this.paymentApplicationMethodService.updatePaymentApplicationMethod(input, input.id).pipe(
              tapResponse(
                (paymentApplicationMethod) => {
                  this.updatePaymentApplicationMethod(paymentApplicationMethod)
                  this.toast.success('Updated Successfully!')
                  setTimeout(() => this.patchState({item: paymentApplicationMethod, loading: false, done: true }), 300);
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
  
    readonly deletePaymentApplicationMethodEffect = this.effect(
    ($) =>
      $.pipe(
        tap(() => this.patchState({ loading: true })),
        withLatestFrom(this.item$),
        switchMap(([_, paymentApplicationMethod]) => {
          return this.data.userDeletePaymentApplicationMethod({paymentApplicationMethodId: paymentApplicationMethod.id})
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

  readonly importExcelEffect = this.effect<UserUpdatePaymentApplicationMethodInput[]>(($data) =>
    $data.pipe(
      tap(() => this.patchState({loading: true })),
      switchMap((data) => this.paymentApplicationMethodService.importPaymentApplicationMethods(data).pipe(
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

            this.addPaymentApplicationMethods(created);
            this.updatePaymentApplicationMethods(updated);

            this.toast.success(`${created.length} created, ${updated.length} updated, ${failed.length} failed of total ${total}`, { duration: 3000 })
          }
        )
      ))
    )
  )

}
