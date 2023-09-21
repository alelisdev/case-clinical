
import { ComponentStore,tapResponse } from '@ngrx/component-store'
import { EMPTY } from 'rxjs'
import { FormService } from '@case-clinical/web/ui/form'
import { Injectable } from '@angular/core'
import { ReconciliationPeriodTypeService } from './reconciliation-period-type.service'
import { Router, ActivatedRoute } from '@angular/router'
import { switchMap, tap, withLatestFrom, map, catchError } from 'rxjs/operators'
import { UserCreateReconciliationPeriodTypeInput, UserUpdateReconciliationPeriodTypeInput, WebCoreDataAccessService, CorePaging, ReconciliationPeriodType,  } from '@case-clinical/web/core/data-access'
import { WebUiToastService } from '@case-clinical/web/ui/toast'


export interface ReconciliationPeriodTypeFeatureState {
  errors?: any
  loading?: boolean
  item?: ReconciliationPeriodType
  done: boolean,
  formName?: string

  reconciliationPeriodTypes: ReconciliationPeriodType[]

  searchQuery?: string
  paging?: CorePaging
}

@Injectable()
export class WebReconciliationPeriodTypeFeatureStore extends ComponentStore<ReconciliationPeriodTypeFeatureState> {
  constructor(
    private readonly data: WebCoreDataAccessService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly toast: WebUiToastService,
    private readonly formService: FormService,
    private readonly reconciliationPeriodTypeService: ReconciliationPeriodTypeService
) {
    super({ 
      loading: false,
      reconciliationPeriodTypes: [],
      done: false,
      searchQuery: '',
      formName: undefined,

      paging: {
        limit: 10000,
        skip: 0,
      },
    })

    if (this.route.snapshot.paramMap.has('reconciliationPeriodTypeId')) {
      var reconciliationPeriodTypeId = this.route.snapshot.paramMap.get('reconciliationPeriodTypeId')
      this.setFormName('reconciliationPeriodType_edit')
    } else {
      this.setFormName('reconciliationPeriodType_create')
    }




  }

  readonly errors$ = this.select((s) => s.errors)
  readonly loading$ = this.select((s) => s.loading)
  readonly done$ = this.select((s) => s.done)
  readonly item$ = this.select((s) => s.item)
  readonly reconciliationPeriodTypes$ = this.select((s) => s.reconciliationPeriodTypes)


  readonly paging$ = this.select((s) => s.paging)
  readonly searchQuery$ = this.select((s) => s.searchQuery)
  readonly formName$ = this.select((s) => s.formName)

  readonly actionResult$ = this.select(this.item$, this.done$,
    (item, done ) => ({item,done,
    }),
    {debounce: true })


  readonly vm$ = this.select(this.errors$, this.loading$, this.item$, this.formName$, this.reconciliationPeriodTypes$,

    (errors, loading, item, formName, reconciliationPeriodTypes,  ) => ({
    errors,
    loading,
    item,
    formName,
    reconciliationPeriodTypes,

            
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







    

  readonly setItem = this.updater((state, item: ReconciliationPeriodType) => ({...state, item}))

  addNewReconciliationPeriodType = this.updater((state, reconciliationPeriodType: ReconciliationPeriodType) => ({ ...state, reconciliationPeriodTypes: [...state.reconciliationPeriodTypes, reconciliationPeriodType] }))

  updateReconciliationPeriodType = this.updater((state, reconciliationPeriodType: ReconciliationPeriodType) => {
    return {
      ...state,
      reconciliationPeriodTypes: state.reconciliationPeriodTypes.map((el) => {
        if (el.id === reconciliationPeriodType.id) {
          return reconciliationPeriodType
        } else {
          return el
        }
      }),
    }
  })

  addReconciliationPeriodTypes = this.updater((state, newReconciliationPeriodTypes: any[]) => ({...state, reconciliationPeriodTypes: state.reconciliationPeriodTypes.concat(newReconciliationPeriodTypes) }))
  updateReconciliationPeriodTypes = this.updater((state, updatedReconciliationPeriodTypes: any[]) => {
    return {
      ...state,
      reconciliationPeriodTypes: state.reconciliationPeriodTypes.map((reconciliationPeriodType) => {
        const updated = updatedReconciliationPeriodTypes.find((el) => el.id === reconciliationPeriodType.id);
        return updated ? updated : reconciliationPeriodType;
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
        return this.reconciliationPeriodTypeService.validateReconciliationPeriodTypeExcelData(excelData);
      })
    )
  }


  readonly loadReconciliationPeriodTypeEffect = this.effect<string>((reconciliationPeriodTypeId$) =>
    reconciliationPeriodTypeId$.pipe(
      tap(() => this.patchState({ loading: true })),
      switchMap((reconciliationPeriodTypeId) =>
        this.data.userReconciliationPeriodType({ reconciliationPeriodTypeId }).pipe(
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



  readonly loadReconciliationPeriodTypesEffect = this.effect(($) =>
    $.pipe(
      tap(() => this.patchState({ loading: true })),
      withLatestFrom(this.input$),
      switchMap(([_, input]) =>
        this.data.userReconciliationPeriodTypes({input}).pipe(
          tapResponse(
            (res) =>
              this.patchState({
                paging: {limit: input.limit, skip: input.skip, total: res.data.count.total},
                reconciliationPeriodTypes: res.data.items,
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

  readonly createReconciliationPeriodTypeEffect = this.effect<UserCreateReconciliationPeriodTypeInput>((input$) =>
    input$.pipe(
      tap(() => this.patchState({loading: true })),
      switchMap((input) =>
        this.reconciliationPeriodTypeService.createReconciliationPeriodType({...input }).pipe(
          tapResponse(
            (reconciliationPeriodType: ReconciliationPeriodType) => {
              this.addNewReconciliationPeriodType(reconciliationPeriodType)
              this.toast.success('Created Successfully!');
              setTimeout(() => this.patchState({ item: reconciliationPeriodType, loading: false, done: true }), 300);
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

    readonly updateReconciliationPeriodTypeEffect = this.effect<UserUpdateReconciliationPeriodTypeInput>((input$) =>
        input$.pipe(
          tap(() => this.patchState({ loading: true })),
          withLatestFrom(this.item$),
          switchMap(([input, item]) =>
            this.reconciliationPeriodTypeService.updateReconciliationPeriodType(input, input.id).pipe(
              tapResponse(
                (reconciliationPeriodType) => {
                  this.updateReconciliationPeriodType(reconciliationPeriodType)
                  this.toast.success('Updated Successfully!')
                  setTimeout(() => this.patchState({item: reconciliationPeriodType, loading: false, done: true }), 300);
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
  
    readonly deleteReconciliationPeriodTypeEffect = this.effect(
    ($) =>
      $.pipe(
        tap(() => this.patchState({ loading: true })),
        withLatestFrom(this.item$),
        switchMap(([_, reconciliationPeriodType]) => {
          return this.data.userDeleteReconciliationPeriodType({reconciliationPeriodTypeId: reconciliationPeriodType.id})
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

  readonly importExcelEffect = this.effect<UserUpdateReconciliationPeriodTypeInput[]>(($data) =>
    $data.pipe(
      tap(() => this.patchState({loading: true })),
      switchMap((data) => this.reconciliationPeriodTypeService.importReconciliationPeriodTypes(data).pipe(
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

            this.addReconciliationPeriodTypes(created);
            this.updateReconciliationPeriodTypes(updated);

            this.toast.success(`${created.length} created, ${updated.length} updated, ${failed.length} failed of total ${total}`, { duration: 3000 })
          }
        )
      ))
    )
  )

}
