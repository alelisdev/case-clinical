
import { ComponentStore,tapResponse } from '@ngrx/component-store'
import { EMPTY } from 'rxjs'
import { FormService } from '@case-clinical/web/ui/form'
import { Injectable } from '@angular/core'
import { PaymentTypeService } from './payment-type.service'
import { Router, ActivatedRoute } from '@angular/router'
import { switchMap, tap, withLatestFrom, map, catchError } from 'rxjs/operators'
import { UserCreatePaymentTypeInput, UserUpdatePaymentTypeInput, WebCoreDataAccessService, CorePaging, PaymentType,  } from '@case-clinical/web/core/data-access'
import { WebUiToastService } from '@case-clinical/web/ui/toast'


export interface PaymentTypeFeatureState {
  errors?: any
  loading?: boolean
  item?: PaymentType
  done: boolean,
  formName?: string

  paymentTypes: PaymentType[]

  searchQuery?: string
  paging?: CorePaging
}

@Injectable()
export class WebPaymentTypeFeatureStore extends ComponentStore<PaymentTypeFeatureState> {
  constructor(
    private readonly data: WebCoreDataAccessService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly toast: WebUiToastService,
    private readonly formService: FormService,
    private readonly paymentTypeService: PaymentTypeService
) {
    super({ 
      loading: false,
      paymentTypes: [],
      done: false,
      searchQuery: '',
      formName: undefined,

      paging: {
        limit: 10000,
        skip: 0,
      },
    })

    if (this.route.snapshot.paramMap.has('paymentTypeId')) {
      var paymentTypeId = this.route.snapshot.paramMap.get('paymentTypeId')
      this.setFormName('paymentType_edit')
    } else {
      this.setFormName('paymentType_create')
    }




  }

  readonly errors$ = this.select((s) => s.errors)
  readonly loading$ = this.select((s) => s.loading)
  readonly done$ = this.select((s) => s.done)
  readonly item$ = this.select((s) => s.item)
  readonly paymentTypes$ = this.select((s) => s.paymentTypes)


  readonly paging$ = this.select((s) => s.paging)
  readonly searchQuery$ = this.select((s) => s.searchQuery)
  readonly formName$ = this.select((s) => s.formName)

  readonly actionResult$ = this.select(this.item$, this.done$,
    (item, done ) => ({item,done,
    }),
    {debounce: true })


  readonly vm$ = this.select(this.errors$, this.loading$, this.item$, this.formName$, this.paymentTypes$,

    (errors, loading, item, formName, paymentTypes,  ) => ({
    errors,
    loading,
    item,
    formName,
    paymentTypes,

            
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







    

  readonly setItem = this.updater((state, item: PaymentType) => ({...state, item}))

  addNewPaymentType = this.updater((state, paymentType: PaymentType) => ({ ...state, paymentTypes: [...state.paymentTypes, paymentType] }))

  updatePaymentType = this.updater((state, paymentType: PaymentType) => {
    return {
      ...state,
      paymentTypes: state.paymentTypes.map((el) => {
        if (el.id === paymentType.id) {
          return paymentType
        } else {
          return el
        }
      }),
    }
  })

  addPaymentTypes = this.updater((state, newPaymentTypes: any[]) => ({...state, paymentTypes: state.paymentTypes.concat(newPaymentTypes) }))
  updatePaymentTypes = this.updater((state, updatedPaymentTypes: any[]) => {
    return {
      ...state,
      paymentTypes: state.paymentTypes.map((paymentType) => {
        const updated = updatedPaymentTypes.find((el) => el.id === paymentType.id);
        return updated ? updated : paymentType;
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
        return this.paymentTypeService.validatePaymentTypeExcelData(excelData);
      })
    )
  }


  readonly loadPaymentTypeEffect = this.effect<string>((paymentTypeId$) =>
    paymentTypeId$.pipe(
      tap(() => this.patchState({ loading: true })),
      switchMap((paymentTypeId) =>
        this.data.userPaymentType({ paymentTypeId }).pipe(
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



  readonly loadPaymentTypesEffect = this.effect(($) =>
    $.pipe(
      tap(() => this.patchState({ loading: true })),
      withLatestFrom(this.input$),
      switchMap(([_, input]) =>
        this.data.userPaymentTypes({input}).pipe(
          tapResponse(
            (res) =>
              this.patchState({
                paging: {limit: input.limit, skip: input.skip, total: res.data.count.total},
                paymentTypes: res.data.items,
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

  readonly createPaymentTypeEffect = this.effect<UserCreatePaymentTypeInput>((input$) =>
    input$.pipe(
      tap(() => this.patchState({loading: true })),
      switchMap((input) =>
        this.paymentTypeService.createPaymentType({...input }).pipe(
          tapResponse(
            (paymentType: PaymentType) => {
              this.addNewPaymentType(paymentType)
              this.toast.success('Created Successfully!');
              setTimeout(() => this.patchState({ item: paymentType, loading: false, done: true }), 300);
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

    readonly updatePaymentTypeEffect = this.effect<UserUpdatePaymentTypeInput>((input$) =>
        input$.pipe(
          tap(() => this.patchState({ loading: true })),
          withLatestFrom(this.item$),
          switchMap(([input, item]) =>
            this.paymentTypeService.updatePaymentType(input, input.id).pipe(
              tapResponse(
                (paymentType) => {
                  this.updatePaymentType(paymentType)
                  this.toast.success('Updated Successfully!')
                  setTimeout(() => this.patchState({item: paymentType, loading: false, done: true }), 300);
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
  
    readonly deletePaymentTypeEffect = this.effect(
    ($) =>
      $.pipe(
        tap(() => this.patchState({ loading: true })),
        withLatestFrom(this.item$),
        switchMap(([_, paymentType]) => {
          return this.data.userDeletePaymentType({paymentTypeId: paymentType.id})
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

  readonly importExcelEffect = this.effect<UserUpdatePaymentTypeInput[]>(($data) =>
    $data.pipe(
      tap(() => this.patchState({loading: true })),
      switchMap((data) => this.paymentTypeService.importPaymentTypes(data).pipe(
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

            this.addPaymentTypes(created);
            this.updatePaymentTypes(updated);

            this.toast.success(`${created.length} created, ${updated.length} updated, ${failed.length} failed of total ${total}`, { duration: 3000 })
          }
        )
      ))
    )
  )

}
