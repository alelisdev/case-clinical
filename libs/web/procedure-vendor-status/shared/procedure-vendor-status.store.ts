
import { ComponentStore,tapResponse } from '@ngrx/component-store'
import { EMPTY } from 'rxjs'
import { FormService } from '@case-clinical/web/ui/form'
import { Injectable } from '@angular/core'
import { ProcedureVendorStatusService } from './procedure-vendor-status.service'
import { Router, ActivatedRoute } from '@angular/router'
import { switchMap, tap, withLatestFrom, map, catchError } from 'rxjs/operators'
import { UserCreateProcedureVendorStatusInput, UserUpdateProcedureVendorStatusInput, WebCoreDataAccessService, CorePaging, ProcedureVendorStatus,  } from '@case-clinical/web/core/data-access'
import { WebUiToastService } from '@case-clinical/web/ui/toast'


export interface ProcedureVendorStatusFeatureState {
  errors?: any
  loading?: boolean
  item?: ProcedureVendorStatus
  done: boolean,
  formName?: string

  procedureVendorStatuses: ProcedureVendorStatus[]

  searchQuery?: string
  paging?: CorePaging
}

@Injectable()
export class WebProcedureVendorStatusFeatureStore extends ComponentStore<ProcedureVendorStatusFeatureState> {
  constructor(
    private readonly data: WebCoreDataAccessService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly toast: WebUiToastService,
    private readonly formService: FormService,
    private readonly procedureVendorStatusService: ProcedureVendorStatusService
) {
    super({ 
      loading: false,
      procedureVendorStatuses: [],
      done: false,
      searchQuery: '',
      formName: undefined,

      paging: {
        limit: 10000,
        skip: 0,
      },
    })

    if (this.route.snapshot.paramMap.has('procedureVendorStatusId')) {
      var procedureVendorStatusId = this.route.snapshot.paramMap.get('procedureVendorStatusId')
      this.setFormName('procedureVendorStatus_edit')
    } else {
      this.setFormName('procedureVendorStatus_create')
    }




  }

  readonly errors$ = this.select((s) => s.errors)
  readonly loading$ = this.select((s) => s.loading)
  readonly done$ = this.select((s) => s.done)
  readonly item$ = this.select((s) => s.item)
  readonly procedureVendorStatuses$ = this.select((s) => s.procedureVendorStatuses)


  readonly paging$ = this.select((s) => s.paging)
  readonly searchQuery$ = this.select((s) => s.searchQuery)
  readonly formName$ = this.select((s) => s.formName)

  readonly actionResult$ = this.select(this.item$, this.done$,
    (item, done ) => ({item,done,
    }),
    {debounce: true })


  readonly vm$ = this.select(this.errors$, this.loading$, this.item$, this.formName$, this.procedureVendorStatuses$,

    (errors, loading, item, formName, procedureVendorStatuses,  ) => ({
    errors,
    loading,
    item,
    formName,
    procedureVendorStatuses,

            
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







    

  readonly setItem = this.updater((state, item: ProcedureVendorStatus) => ({...state, item}))

  addNewProcedureVendorStatus = this.updater((state, procedureVendorStatus: ProcedureVendorStatus) => ({ ...state, procedureVendorStatuses: [...state.procedureVendorStatuses, procedureVendorStatus] }))

  updateProcedureVendorStatus = this.updater((state, procedureVendorStatus: ProcedureVendorStatus) => {
    return {
      ...state,
      procedureVendorStatuses: state.procedureVendorStatuses.map((el) => {
        if (el.id === procedureVendorStatus.id) {
          return procedureVendorStatus
        } else {
          return el
        }
      }),
    }
  })

  addProcedureVendorStatuses = this.updater((state, newProcedureVendorStatuses: any[]) => ({...state, procedureVendorStatuses: state.procedureVendorStatuses.concat(newProcedureVendorStatuses) }))
  updateProcedureVendorStatuses = this.updater((state, updatedProcedureVendorStatuses: any[]) => {
    return {
      ...state,
      procedureVendorStatuses: state.procedureVendorStatuses.map((procedureVendorStatus) => {
        const updated = updatedProcedureVendorStatuses.find((el) => el.id === procedureVendorStatus.id);
        return updated ? updated : procedureVendorStatus;
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
        return this.procedureVendorStatusService.validateProcedureVendorStatusExcelData(excelData);
      })
    )
  }


  readonly loadProcedureVendorStatusEffect = this.effect<string>((procedureVendorStatusId$) =>
    procedureVendorStatusId$.pipe(
      tap(() => this.patchState({ loading: true })),
      switchMap((procedureVendorStatusId) =>
        this.data.userProcedureVendorStatus({ procedureVendorStatusId }).pipe(
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



  readonly loadProcedureVendorStatusesEffect = this.effect(($) =>
    $.pipe(
      tap(() => this.patchState({ loading: true })),
      withLatestFrom(this.input$),
      switchMap(([_, input]) =>
        this.data.userProcedureVendorStatuses({input}).pipe(
          tapResponse(
            (res) =>
              this.patchState({
                paging: {limit: input.limit, skip: input.skip, total: res.data.count.total},
                procedureVendorStatuses: res.data.items,
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

  readonly createProcedureVendorStatusEffect = this.effect<UserCreateProcedureVendorStatusInput>((input$) =>
    input$.pipe(
      tap(() => this.patchState({loading: true })),
      switchMap((input) =>
        this.procedureVendorStatusService.createProcedureVendorStatus({...input }).pipe(
          tapResponse(
            (procedureVendorStatus: ProcedureVendorStatus) => {
              this.addNewProcedureVendorStatus(procedureVendorStatus)
              this.toast.success('Created Successfully!');
              setTimeout(() => this.patchState({ item: procedureVendorStatus, loading: false, done: true }), 300);
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

    readonly updateProcedureVendorStatusEffect = this.effect<UserUpdateProcedureVendorStatusInput>((input$) =>
        input$.pipe(
          tap(() => this.patchState({ loading: true })),
          withLatestFrom(this.item$),
          switchMap(([input, item]) =>
            this.procedureVendorStatusService.updateProcedureVendorStatus(input, input.id).pipe(
              tapResponse(
                (procedureVendorStatus) => {
                  this.updateProcedureVendorStatus(procedureVendorStatus)
                  this.toast.success('Updated Successfully!')
                  setTimeout(() => this.patchState({item: procedureVendorStatus, loading: false, done: true }), 300);
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
  
    readonly deleteProcedureVendorStatusEffect = this.effect(
    ($) =>
      $.pipe(
        tap(() => this.patchState({ loading: true })),
        withLatestFrom(this.item$),
        switchMap(([_, procedureVendorStatus]) => {
          return this.data.userDeleteProcedureVendorStatus({procedureVendorStatusId: procedureVendorStatus.id})
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

  readonly importExcelEffect = this.effect<UserUpdateProcedureVendorStatusInput[]>(($data) =>
    $data.pipe(
      tap(() => this.patchState({loading: true })),
      switchMap((data) => this.procedureVendorStatusService.importProcedureVendorStatuses(data).pipe(
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

            this.addProcedureVendorStatuses(created);
            this.updateProcedureVendorStatuses(updated);

            this.toast.success(`${created.length} created, ${updated.length} updated, ${failed.length} failed of total ${total}`, { duration: 3000 })
          }
        )
      ))
    )
  )

}
