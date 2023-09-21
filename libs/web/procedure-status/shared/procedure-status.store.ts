
import { ComponentStore,tapResponse } from '@ngrx/component-store'
import { EMPTY } from 'rxjs'
import { FormService } from '@case-clinical/web/ui/form'
import { Injectable } from '@angular/core'
import { ProcedureStatusService } from './procedure-status.service'
import { Router, ActivatedRoute } from '@angular/router'
import { switchMap, tap, withLatestFrom, map, catchError } from 'rxjs/operators'
import { UserCreateProcedureStatusInput, UserUpdateProcedureStatusInput, WebCoreDataAccessService, CorePaging, ProcedureStatus,  } from '@case-clinical/web/core/data-access'
import { WebUiToastService } from '@case-clinical/web/ui/toast'


export interface ProcedureStatusFeatureState {
  errors?: any
  loading?: boolean
  item?: ProcedureStatus
  done: boolean,
  formName?: string

  procedureStatuses: ProcedureStatus[]

  searchQuery?: string
  paging?: CorePaging
}

@Injectable()
export class WebProcedureStatusFeatureStore extends ComponentStore<ProcedureStatusFeatureState> {
  constructor(
    private readonly data: WebCoreDataAccessService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly toast: WebUiToastService,
    private readonly formService: FormService,
    private readonly procedureStatusService: ProcedureStatusService
) {
    super({
      loading: false,
      procedureStatuses: [],
      done: false,
      searchQuery: '',
      formName: undefined,

      paging: {
        limit: 10000,
        skip: 0,
      },
    })

    if (this.route.snapshot.paramMap.has('procedureStatusId')) {
      var procedureStatusId = this.route.snapshot.paramMap.get('procedureStatusId')
      this.setFormName('procedureStatus_edit')
    } else {
      this.setFormName('procedureStatus_create')
    }




  }

  readonly errors$ = this.select((s) => s.errors)
  readonly loading$ = this.select((s) => s.loading)
  readonly done$ = this.select((s) => s.done)
  readonly item$ = this.select((s) => s.item)
  readonly procedureStatuses$ = this.select((s) => s.procedureStatuses)


  readonly paging$ = this.select((s) => s.paging)
  readonly searchQuery$ = this.select((s) => s.searchQuery)
  readonly formName$ = this.select((s) => s.formName)

  readonly actionResult$ = this.select(this.item$, this.done$,
    (item, done ) => ({item,done,
    }),
    {debounce: true })


  readonly vm$ = this.select(this.errors$, this.loading$, this.item$, this.formName$, this.procedureStatuses$,

    (errors, loading, item, formName, procedureStatuses,  ) => ({
    errors,
    loading,
    item,
    formName,
    procedureStatuses,


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









  readonly setItem = this.updater((state, item: ProcedureStatus) => ({...state, item}))

  addNewProcedureStatus = this.updater((state, procedureStatus: ProcedureStatus) => ({ ...state, procedureStatuses: [...state.procedureStatuses, procedureStatus] }))

  updateProcedureStatus = this.updater((state, procedureStatus: ProcedureStatus) => {
    return {
      ...state,
      procedureStatuses: state.procedureStatuses.map((el) => {
        if (el.id === procedureStatus.id) {
          return procedureStatus
        } else {
          return el
        }
      }),
    }
  })

  addProcedureStatuses = this.updater((state, newProcedureStatuses: any[]) => ({...state, procedureStatuses: state.procedureStatuses.concat(newProcedureStatuses) }))
  updateProcedureStatuses = this.updater((state, updatedProcedureStatuses: any[]) => {
    return {
      ...state,
      procedureStatuses: state.procedureStatuses.map((procedureStatus) => {
        const updated = updatedProcedureStatuses.find((el) => el.id === procedureStatus.id);
        return updated ? updated : procedureStatus;
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
        return this.procedureStatusService.validateProcedureStatusExcelData(excelData);
      })
    )
  }


  readonly loadProcedureStatusEffect = this.effect<string>((procedureStatusId$) =>
    procedureStatusId$.pipe(
      tap(() => this.patchState({ loading: true })),
      switchMap((procedureStatusId) =>
        this.data.userProcedureStatus({ procedureStatusId }).pipe(
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



  readonly loadProcedureStatusesEffect = this.effect(($) =>
    $.pipe(
      tap(() => this.patchState({ loading: true })),
      withLatestFrom(this.input$),
      switchMap(([_, input]) =>
        this.data.userProcedureStatuses({input}).pipe(
          tapResponse(
            (res) =>
              this.patchState({
                paging: {limit: input.limit, skip: input.skip, total: res.data.count.total},
                procedureStatuses: res.data.items,
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

  readonly createProcedureStatusEffect = this.effect<UserCreateProcedureStatusInput>((input$) =>
    input$.pipe(
      tap(() => this.patchState({loading: true })),
      switchMap((input) =>
        this.procedureStatusService.createProcedureStatus({...input }).pipe(
          tapResponse(
            (procedureStatus: ProcedureStatus) => {
              this.addNewProcedureStatus(procedureStatus)
              this.toast.success('Created Successfully!');
              setTimeout(() => this.patchState({ item: procedureStatus, loading: false, done: true }), 300);
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

    readonly updateProcedureStatusEffect = this.effect<UserUpdateProcedureStatusInput>((input$) =>
        input$.pipe(
          tap(() => this.patchState({ loading: true })),
          withLatestFrom(this.item$),
          switchMap(([input, item]) =>
            this.procedureStatusService.updateProcedureStatus(input, input.id).pipe(
              tapResponse(
                (procedureStatus) => {
                  this.updateProcedureStatus(procedureStatus)
                  this.toast.success('Updated Successfully!')
                  setTimeout(() => this.patchState({item: procedureStatus, loading: false, done: true }), 300);
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

    readonly deleteProcedureStatusEffect = this.effect(
    ($) =>
      $.pipe(
        tap(() => this.patchState({ loading: true })),
        withLatestFrom(this.item$),
        switchMap(([_, procedureStatus]) => {
          return this.data.userDeleteProcedureStatus({procedureStatusId: procedureStatus.id})
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

  readonly importExcelEffect = this.effect<UserUpdateProcedureStatusInput[]>(($data) =>
    $data.pipe(
      tap(() => this.patchState({loading: true })),
      switchMap((data) => this.procedureStatusService.importProcedureStatuses(data).pipe(
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

            this.addProcedureStatuses(created);
            this.updateProcedureStatuses(updated);

            this.toast.success(`${created.length} created, ${updated.length} updated, ${failed.length} failed of total ${total}`, { duration: 3000 })
          }
        )
      ))
    )
  )

}
