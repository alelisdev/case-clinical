
import { ComponentStore,tapResponse } from '@ngrx/component-store'
import { EMPTY } from 'rxjs'
import { FormService } from '@case-clinical/web/ui/form'
import { Injectable } from '@angular/core'
import { CaseProgressStatusService } from './case-progress-status.service'
import { Router, ActivatedRoute } from '@angular/router'
import { switchMap, tap, withLatestFrom, map, catchError } from 'rxjs/operators'
import { UserCreateCaseProgressStatusInput, UserUpdateCaseProgressStatusInput, WebCoreDataAccessService, CorePaging, CaseProgressStatus,  } from '@case-clinical/web/core/data-access'
import { WebUiToastService } from '@case-clinical/web/ui/toast'


export interface CaseProgressStatusFeatureState {
  errors?: any
  loading?: boolean
  item?: CaseProgressStatus
  done: boolean,
  formName?: string

  caseProgressStatuses: CaseProgressStatus[]

  searchQuery?: string
  paging?: CorePaging
}

@Injectable()
export class WebCaseProgressStatusFeatureStore extends ComponentStore<CaseProgressStatusFeatureState> {
  constructor(
    private readonly data: WebCoreDataAccessService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly toast: WebUiToastService,
    private readonly formService: FormService,
    private readonly caseProgressStatusService: CaseProgressStatusService
) {
    super({ 
      loading: false,
      caseProgressStatuses: [],
      done: false,
      searchQuery: '',
      formName: undefined,

      paging: {
        limit: 10000,
        skip: 0,
      },
    })

    if (this.route.snapshot.paramMap.has('caseProgressStatusId')) {
      var caseProgressStatusId = this.route.snapshot.paramMap.get('caseProgressStatusId')
      this.setFormName('caseProgressStatus_edit')
    } else {
      this.setFormName('caseProgressStatus_create')
    }




  }

  readonly errors$ = this.select((s) => s.errors)
  readonly loading$ = this.select((s) => s.loading)
  readonly done$ = this.select((s) => s.done)
  readonly item$ = this.select((s) => s.item)
  readonly caseProgressStatuses$ = this.select((s) => s.caseProgressStatuses)


  readonly paging$ = this.select((s) => s.paging)
  readonly searchQuery$ = this.select((s) => s.searchQuery)
  readonly formName$ = this.select((s) => s.formName)

  readonly actionResult$ = this.select(this.item$, this.done$,
    (item, done ) => ({item,done,
    }),
    {debounce: true })


  readonly vm$ = this.select(this.errors$, this.loading$, this.item$, this.formName$, this.caseProgressStatuses$,

    (errors, loading, item, formName, caseProgressStatuses,  ) => ({
    errors,
    loading,
    item,
    formName,
    caseProgressStatuses,

            
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







    

  readonly setItem = this.updater((state, item: CaseProgressStatus) => ({...state, item}))

  addNewCaseProgressStatus = this.updater((state, caseProgressStatus: CaseProgressStatus) => ({ ...state, caseProgressStatuses: [...state.caseProgressStatuses, caseProgressStatus] }))

  updateCaseProgressStatus = this.updater((state, caseProgressStatus: CaseProgressStatus) => {
    return {
      ...state,
      caseProgressStatuses: state.caseProgressStatuses.map((el) => {
        if (el.id === caseProgressStatus.id) {
          return caseProgressStatus
        } else {
          return el
        }
      }),
    }
  })

  addCaseProgressStatuses = this.updater((state, newCaseProgressStatuses: any[]) => ({...state, caseProgressStatuses: state.caseProgressStatuses.concat(newCaseProgressStatuses) }))
  updateCaseProgressStatuses = this.updater((state, updatedCaseProgressStatuses: any[]) => {
    return {
      ...state,
      caseProgressStatuses: state.caseProgressStatuses.map((caseProgressStatus) => {
        const updated = updatedCaseProgressStatuses.find((el) => el.id === caseProgressStatus.id);
        return updated ? updated : caseProgressStatus;
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
        return this.caseProgressStatusService.validateCaseProgressStatusExcelData(excelData);
      })
    )
  }


  readonly loadCaseProgressStatusEffect = this.effect<string>((caseProgressStatusId$) =>
    caseProgressStatusId$.pipe(
      tap(() => this.patchState({ loading: true })),
      switchMap((caseProgressStatusId) =>
        this.data.userCaseProgressStatus({ caseProgressStatusId }).pipe(
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



  readonly loadCaseProgressStatusesEffect = this.effect(($) =>
    $.pipe(
      tap(() => this.patchState({ loading: true })),
      withLatestFrom(this.input$),
      switchMap(([_, input]) =>
        this.data.userCaseProgressStatuses({input}).pipe(
          tapResponse(
            (res) =>
              this.patchState({
                paging: {limit: input.limit, skip: input.skip, total: res.data.count.total},
                caseProgressStatuses: res.data.items,
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

  readonly createCaseProgressStatusEffect = this.effect<UserCreateCaseProgressStatusInput>((input$) =>
    input$.pipe(
      tap(() => this.patchState({loading: true })),
      switchMap((input) =>
        this.caseProgressStatusService.createCaseProgressStatus({...input }).pipe(
          tapResponse(
            (caseProgressStatus: CaseProgressStatus) => {
              this.addNewCaseProgressStatus(caseProgressStatus)
              this.toast.success('Created Successfully!');
              setTimeout(() => this.patchState({ item: caseProgressStatus, loading: false, done: true }), 300);
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

    readonly updateCaseProgressStatusEffect = this.effect<UserUpdateCaseProgressStatusInput>((input$) =>
        input$.pipe(
          tap(() => this.patchState({ loading: true })),
          withLatestFrom(this.item$),
          switchMap(([input, item]) =>
            this.caseProgressStatusService.updateCaseProgressStatus(input, input.id).pipe(
              tapResponse(
                (caseProgressStatus) => {
                  this.updateCaseProgressStatus(caseProgressStatus)
                  this.toast.success('Updated Successfully!')
                  setTimeout(() => this.patchState({item: caseProgressStatus, loading: false, done: true }), 300);
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
  
    readonly deleteCaseProgressStatusEffect = this.effect(
    ($) =>
      $.pipe(
        tap(() => this.patchState({ loading: true })),
        withLatestFrom(this.item$),
        switchMap(([_, caseProgressStatus]) => {
          return this.data.userDeleteCaseProgressStatus({caseProgressStatusId: caseProgressStatus.id})
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

  readonly importExcelEffect = this.effect<UserUpdateCaseProgressStatusInput[]>(($data) =>
    $data.pipe(
      tap(() => this.patchState({loading: true })),
      switchMap((data) => this.caseProgressStatusService.importCaseProgressStatuses(data).pipe(
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

            this.addCaseProgressStatuses(created);
            this.updateCaseProgressStatuses(updated);

            this.toast.success(`${created.length} created, ${updated.length} updated, ${failed.length} failed of total ${total}`, { duration: 3000 })
          }
        )
      ))
    )
  )

}
