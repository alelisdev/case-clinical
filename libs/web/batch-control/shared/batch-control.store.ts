
import { ComponentStore,tapResponse } from '@ngrx/component-store'
import { EMPTY } from 'rxjs'
import { FormService } from '@case-clinical/web/ui/form'
import { Injectable } from '@angular/core'
import { BatchControlService } from './batch-control.service'
import { Router, ActivatedRoute } from '@angular/router'
import { switchMap, tap, withLatestFrom, map, catchError } from 'rxjs/operators'
import { UserCreateBatchControlInput, UserUpdateBatchControlInput, WebCoreDataAccessService, CorePaging, BatchControl,  } from '@case-clinical/web/core/data-access'
import { WebUiToastService } from '@case-clinical/web/ui/toast'


export interface BatchControlFeatureState {
  errors?: any
  loading?: boolean
  item?: BatchControl
  done: boolean,
  formName?: string

  batchControls: BatchControl[]

  searchQuery?: string
  paging?: CorePaging
}

@Injectable()
export class WebBatchControlFeatureStore extends ComponentStore<BatchControlFeatureState> {
  constructor(
    private readonly data: WebCoreDataAccessService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly toast: WebUiToastService,
    private readonly formService: FormService,
    private readonly batchControlService: BatchControlService
) {
    super({ 
      loading: false,
      batchControls: [],
      done: false,
      searchQuery: '',
      formName: undefined,

      paging: {
        limit: 10000,
        skip: 0,
      },
    })

    if (this.route.snapshot.paramMap.has('batchControlId')) {
      var batchControlId = this.route.snapshot.paramMap.get('batchControlId')
      this.setFormName('batchControl_edit')
    } else {
      this.setFormName('batchControl_create')
    }




  }

  readonly errors$ = this.select((s) => s.errors)
  readonly loading$ = this.select((s) => s.loading)
  readonly done$ = this.select((s) => s.done)
  readonly item$ = this.select((s) => s.item)
  readonly batchControls$ = this.select((s) => s.batchControls)


  readonly paging$ = this.select((s) => s.paging)
  readonly searchQuery$ = this.select((s) => s.searchQuery)
  readonly formName$ = this.select((s) => s.formName)

  readonly actionResult$ = this.select(this.item$, this.done$,
    (item, done ) => ({item,done,
    }),
    {debounce: true })


  readonly vm$ = this.select(this.errors$, this.loading$, this.item$, this.formName$, this.batchControls$,

    (errors, loading, item, formName, batchControls,  ) => ({
    errors,
    loading,
    item,
    formName,
    batchControls,

            
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







    

  readonly setItem = this.updater((state, item: BatchControl) => ({...state, item}))

  addNewBatchControl = this.updater((state, batchControl: BatchControl) => ({ ...state, batchControls: [...state.batchControls, batchControl] }))

  updateBatchControl = this.updater((state, batchControl: BatchControl) => {
    return {
      ...state,
      batchControls: state.batchControls.map((el) => {
        if (el.id === batchControl.id) {
          return batchControl
        } else {
          return el
        }
      }),
    }
  })

  addBatchControls = this.updater((state, newBatchControls: any[]) => ({...state, batchControls: state.batchControls.concat(newBatchControls) }))
  updateBatchControls = this.updater((state, updatedBatchControls: any[]) => {
    return {
      ...state,
      batchControls: state.batchControls.map((batchControl) => {
        const updated = updatedBatchControls.find((el) => el.id === batchControl.id);
        return updated ? updated : batchControl;
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
        return this.batchControlService.validateBatchControlExcelData(excelData);
      })
    )
  }


  readonly loadBatchControlEffect = this.effect<string>((batchControlId$) =>
    batchControlId$.pipe(
      tap(() => this.patchState({ loading: true })),
      switchMap((batchControlId) =>
        this.data.userBatchControl({ batchControlId }).pipe(
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



  readonly loadBatchControlsEffect = this.effect(($) =>
    $.pipe(
      tap(() => this.patchState({ loading: true })),
      withLatestFrom(this.input$),
      switchMap(([_, input]) =>
        this.data.userBatchControls({input}).pipe(
          tapResponse(
            (res) =>
              this.patchState({
                paging: {limit: input.limit, skip: input.skip, total: res.data.count.total},
                batchControls: res.data.items,
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

  readonly createBatchControlEffect = this.effect<UserCreateBatchControlInput>((input$) =>
    input$.pipe(
      tap(() => this.patchState({loading: true })),
      switchMap((input) =>
        this.batchControlService.createBatchControl({...input }).pipe(
          tapResponse(
            (batchControl: BatchControl) => {
              this.addNewBatchControl(batchControl)
              this.toast.success('Created Successfully!');
              setTimeout(() => this.patchState({ item: batchControl, loading: false, done: true }), 300);
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

    readonly updateBatchControlEffect = this.effect<UserUpdateBatchControlInput>((input$) =>
        input$.pipe(
          tap(() => this.patchState({ loading: true })),
          withLatestFrom(this.item$),
          switchMap(([input, item]) =>
            this.batchControlService.updateBatchControl(input, input.id).pipe(
              tapResponse(
                (batchControl) => {
                  this.updateBatchControl(batchControl)
                  this.toast.success('Updated Successfully!')
                  setTimeout(() => this.patchState({item: batchControl, loading: false, done: true }), 300);
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
  
    readonly deleteBatchControlEffect = this.effect(
    ($) =>
      $.pipe(
        tap(() => this.patchState({ loading: true })),
        withLatestFrom(this.item$),
        switchMap(([_, batchControl]) => {
          return this.data.userDeleteBatchControl({batchControlId: batchControl.id})
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

  readonly importExcelEffect = this.effect<UserUpdateBatchControlInput[]>(($data) =>
    $data.pipe(
      tap(() => this.patchState({loading: true })),
      switchMap((data) => this.batchControlService.importBatchControls(data).pipe(
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

            this.addBatchControls(created);
            this.updateBatchControls(updated);

            this.toast.success(`${created.length} created, ${updated.length} updated, ${failed.length} failed of total ${total}`, { duration: 3000 })
          }
        )
      ))
    )
  )

}
