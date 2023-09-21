
import { ComponentStore,tapResponse } from '@ngrx/component-store'
import { EMPTY } from 'rxjs'
import { FormService } from '@case-clinical/web/ui/form'
import { Injectable } from '@angular/core'
import { CaseStatusService } from './case-status.service'
import { Router, ActivatedRoute } from '@angular/router'
import { switchMap, tap, withLatestFrom, map, catchError } from 'rxjs/operators'
import { UserCreateCaseStatusInput, UserUpdateCaseStatusInput, WebCoreDataAccessService, CorePaging, CaseStatus,  } from '@case-clinical/web/core/data-access'
import { WebUiToastService } from '@case-clinical/web/ui/toast'


export interface CaseStatusFeatureState {
  errors?: any
  loading?: boolean
  item?: CaseStatus
  done: boolean,
  formName?: string

  caseStatuses: CaseStatus[]

  searchQuery?: string
  paging?: CorePaging
}

@Injectable()
export class WebCaseStatusFeatureStore extends ComponentStore<CaseStatusFeatureState> {
  constructor(
    private readonly data: WebCoreDataAccessService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly toast: WebUiToastService,
    private readonly formService: FormService,
    private readonly caseStatusService: CaseStatusService
) {
    super({ 
      loading: false,
      caseStatuses: [],
      done: false,
      searchQuery: '',
      formName: undefined,

      paging: {
        limit: 10000,
        skip: 0,
      },
    })

    if (this.route.snapshot.paramMap.has('caseStatusId')) {
      var caseStatusId = this.route.snapshot.paramMap.get('caseStatusId')
      this.setFormName('caseStatus_edit')
    } else {
      this.setFormName('caseStatus_create')
    }




  }

  readonly errors$ = this.select((s) => s.errors)
  readonly loading$ = this.select((s) => s.loading)
  readonly done$ = this.select((s) => s.done)
  readonly item$ = this.select((s) => s.item)
  readonly caseStatuses$ = this.select((s) => s.caseStatuses)


  readonly paging$ = this.select((s) => s.paging)
  readonly searchQuery$ = this.select((s) => s.searchQuery)
  readonly formName$ = this.select((s) => s.formName)

  readonly actionResult$ = this.select(this.item$, this.done$,
    (item, done ) => ({item,done,
    }),
    {debounce: true })


  readonly vm$ = this.select(this.errors$, this.loading$, this.item$, this.formName$, this.caseStatuses$,

    (errors, loading, item, formName, caseStatuses,  ) => ({
    errors,
    loading,
    item,
    formName,
    caseStatuses,

            
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







    

  readonly setItem = this.updater((state, item: CaseStatus) => ({...state, item}))

  addNewCaseStatus = this.updater((state, caseStatus: CaseStatus) => ({ ...state, caseStatuses: [...state.caseStatuses, caseStatus] }))

  updateCaseStatus = this.updater((state, caseStatus: CaseStatus) => {
    return {
      ...state,
      caseStatuses: state.caseStatuses.map((el) => {
        if (el.id === caseStatus.id) {
          return caseStatus
        } else {
          return el
        }
      }),
    }
  })

  addCaseStatuses = this.updater((state, newCaseStatuses: any[]) => ({...state, caseStatuses: state.caseStatuses.concat(newCaseStatuses) }))
  updateCaseStatuses = this.updater((state, updatedCaseStatuses: any[]) => {
    return {
      ...state,
      caseStatuses: state.caseStatuses.map((caseStatus) => {
        const updated = updatedCaseStatuses.find((el) => el.id === caseStatus.id);
        return updated ? updated : caseStatus;
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
        return this.caseStatusService.validateCaseStatusExcelData(excelData);
      })
    )
  }


  readonly loadCaseStatusEffect = this.effect<string>((caseStatusId$) =>
    caseStatusId$.pipe(
      tap(() => this.patchState({ loading: true })),
      switchMap((caseStatusId) =>
        this.data.userCaseStatus({ caseStatusId }).pipe(
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



  readonly loadCaseStatusesEffect = this.effect(($) =>
    $.pipe(
      tap(() => this.patchState({ loading: true })),
      withLatestFrom(this.input$),
      switchMap(([_, input]) =>
        this.data.userCaseStatuses({input}).pipe(
          tapResponse(
            (res) =>
              this.patchState({
                paging: {limit: input.limit, skip: input.skip, total: res.data.count.total},
                caseStatuses: res.data.items,
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

  readonly createCaseStatusEffect = this.effect<UserCreateCaseStatusInput>((input$) =>
    input$.pipe(
      tap(() => this.patchState({loading: true })),
      switchMap((input) =>
        this.caseStatusService.createCaseStatus({...input }).pipe(
          tapResponse(
            (caseStatus: CaseStatus) => {
              this.addNewCaseStatus(caseStatus)
              this.toast.success('Created Successfully!');
              setTimeout(() => this.patchState({ item: caseStatus, loading: false, done: true }), 300);
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

    readonly updateCaseStatusEffect = this.effect<UserUpdateCaseStatusInput>((input$) =>
        input$.pipe(
          tap(() => this.patchState({ loading: true })),
          withLatestFrom(this.item$),
          switchMap(([input, item]) =>
            this.caseStatusService.updateCaseStatus(input, input.id).pipe(
              tapResponse(
                (caseStatus) => {
                  this.updateCaseStatus(caseStatus)
                  this.toast.success('Updated Successfully!')
                  setTimeout(() => this.patchState({item: caseStatus, loading: false, done: true }), 300);
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
  
    readonly deleteCaseStatusEffect = this.effect(
    ($) =>
      $.pipe(
        tap(() => this.patchState({ loading: true })),
        withLatestFrom(this.item$),
        switchMap(([_, caseStatus]) => {
          return this.data.userDeleteCaseStatus({caseStatusId: caseStatus.id})
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

  readonly importExcelEffect = this.effect<UserUpdateCaseStatusInput[]>(($data) =>
    $data.pipe(
      tap(() => this.patchState({loading: true })),
      switchMap((data) => this.caseStatusService.importCaseStatuses(data).pipe(
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

            this.addCaseStatuses(created);
            this.updateCaseStatuses(updated);

            this.toast.success(`${created.length} created, ${updated.length} updated, ${failed.length} failed of total ${total}`, { duration: 3000 })
          }
        )
      ))
    )
  )

}
