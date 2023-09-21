
import { ComponentStore,tapResponse } from '@ngrx/component-store'
import { EMPTY } from 'rxjs'
import { FormService } from '@case-clinical/web/ui/form'
import { Injectable } from '@angular/core'
import { PayorTypeService } from './payor-type.service'
import { Router, ActivatedRoute } from '@angular/router'
import { switchMap, tap, withLatestFrom, map, catchError } from 'rxjs/operators'
import { UserCreatePayorTypeInput, UserUpdatePayorTypeInput, WebCoreDataAccessService, CorePaging, PayorType,  } from '@case-clinical/web/core/data-access'
import { WebUiToastService } from '@case-clinical/web/ui/toast'


export interface PayorTypeFeatureState {
  errors?: any
  loading?: boolean
  item?: PayorType
  done: boolean,
  formName?: string

  payorTypes: PayorType[]

  searchQuery?: string
  paging?: CorePaging
}

@Injectable()
export class WebPayorTypeFeatureStore extends ComponentStore<PayorTypeFeatureState> {
  constructor(
    private readonly data: WebCoreDataAccessService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly toast: WebUiToastService,
    private readonly formService: FormService,
    private readonly payorTypeService: PayorTypeService
) {
    super({ 
      loading: false,
      payorTypes: [],
      done: false,
      searchQuery: '',
      formName: undefined,

      paging: {
        limit: 10000,
        skip: 0,
      },
    })

    if (this.route.snapshot.paramMap.has('payorTypeId')) {
      var payorTypeId = this.route.snapshot.paramMap.get('payorTypeId')
      this.setFormName('payorType_edit')
    } else {
      this.setFormName('payorType_create')
    }




  }

  readonly errors$ = this.select((s) => s.errors)
  readonly loading$ = this.select((s) => s.loading)
  readonly done$ = this.select((s) => s.done)
  readonly item$ = this.select((s) => s.item)
  readonly payorTypes$ = this.select((s) => s.payorTypes)


  readonly paging$ = this.select((s) => s.paging)
  readonly searchQuery$ = this.select((s) => s.searchQuery)
  readonly formName$ = this.select((s) => s.formName)

  readonly actionResult$ = this.select(this.item$, this.done$,
    (item, done ) => ({item,done,
    }),
    {debounce: true })


  readonly vm$ = this.select(this.errors$, this.loading$, this.item$, this.formName$, this.payorTypes$,

    (errors, loading, item, formName, payorTypes,  ) => ({
    errors,
    loading,
    item,
    formName,
    payorTypes,

            
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







    

  readonly setItem = this.updater((state, item: PayorType) => ({...state, item}))

  addNewPayorType = this.updater((state, payorType: PayorType) => ({ ...state, payorTypes: [...state.payorTypes, payorType] }))

  updatePayorType = this.updater((state, payorType: PayorType) => {
    return {
      ...state,
      payorTypes: state.payorTypes.map((el) => {
        if (el.id === payorType.id) {
          return payorType
        } else {
          return el
        }
      }),
    }
  })

  addPayorTypes = this.updater((state, newPayorTypes: any[]) => ({...state, payorTypes: state.payorTypes.concat(newPayorTypes) }))
  updatePayorTypes = this.updater((state, updatedPayorTypes: any[]) => {
    return {
      ...state,
      payorTypes: state.payorTypes.map((payorType) => {
        const updated = updatedPayorTypes.find((el) => el.id === payorType.id);
        return updated ? updated : payorType;
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
        return this.payorTypeService.validatePayorTypeExcelData(excelData);
      })
    )
  }


  readonly loadPayorTypeEffect = this.effect<string>((payorTypeId$) =>
    payorTypeId$.pipe(
      tap(() => this.patchState({ loading: true })),
      switchMap((payorTypeId) =>
        this.data.userPayorType({ payorTypeId }).pipe(
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



  readonly loadPayorTypesEffect = this.effect(($) =>
    $.pipe(
      tap(() => this.patchState({ loading: true })),
      withLatestFrom(this.input$),
      switchMap(([_, input]) =>
        this.data.userPayorTypes({input}).pipe(
          tapResponse(
            (res) =>
              this.patchState({
                paging: {limit: input.limit, skip: input.skip, total: res.data.count.total},
                payorTypes: res.data.items,
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

  readonly createPayorTypeEffect = this.effect<UserCreatePayorTypeInput>((input$) =>
    input$.pipe(
      tap(() => this.patchState({loading: true })),
      switchMap((input) =>
        this.payorTypeService.createPayorType({...input }).pipe(
          tapResponse(
            (payorType: PayorType) => {
              this.addNewPayorType(payorType)
              this.toast.success('Created Successfully!');
              setTimeout(() => this.patchState({ item: payorType, loading: false, done: true }), 300);
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

    readonly updatePayorTypeEffect = this.effect<UserUpdatePayorTypeInput>((input$) =>
        input$.pipe(
          tap(() => this.patchState({ loading: true })),
          withLatestFrom(this.item$),
          switchMap(([input, item]) =>
            this.payorTypeService.updatePayorType(input, input.id).pipe(
              tapResponse(
                (payorType) => {
                  this.updatePayorType(payorType)
                  this.toast.success('Updated Successfully!')
                  setTimeout(() => this.patchState({item: payorType, loading: false, done: true }), 300);
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
  
    readonly deletePayorTypeEffect = this.effect(
    ($) =>
      $.pipe(
        tap(() => this.patchState({ loading: true })),
        withLatestFrom(this.item$),
        switchMap(([_, payorType]) => {
          return this.data.userDeletePayorType({payorTypeId: payorType.id})
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

  readonly importExcelEffect = this.effect<UserUpdatePayorTypeInput[]>(($data) =>
    $data.pipe(
      tap(() => this.patchState({loading: true })),
      switchMap((data) => this.payorTypeService.importPayorTypes(data).pipe(
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

            this.addPayorTypes(created);
            this.updatePayorTypes(updated);

            this.toast.success(`${created.length} created, ${updated.length} updated, ${failed.length} failed of total ${total}`, { duration: 3000 })
          }
        )
      ))
    )
  )

}
