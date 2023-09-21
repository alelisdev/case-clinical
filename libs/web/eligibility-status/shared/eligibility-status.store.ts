
import { ComponentStore,tapResponse } from '@ngrx/component-store'
import { EMPTY } from 'rxjs'
import { FormService } from '@case-clinical/web/ui/form'
import { Injectable } from '@angular/core'
import { EligibilityStatusService } from './eligibility-status.service'
import { Router, ActivatedRoute } from '@angular/router'
import { switchMap, tap, withLatestFrom, map, catchError } from 'rxjs/operators'
import { UserCreateEligibilityStatusInput, UserUpdateEligibilityStatusInput, WebCoreDataAccessService, CorePaging, EligibilityStatus,  } from '@case-clinical/web/core/data-access'
import { WebUiToastService } from '@case-clinical/web/ui/toast'


export interface EligibilityStatusFeatureState {
  errors?: any
  loading?: boolean
  item?: EligibilityStatus
  done: boolean,
  formName?: string

  eligibilityStatuses: EligibilityStatus[]

  searchQuery?: string
  paging?: CorePaging
}

@Injectable()
export class WebEligibilityStatusFeatureStore extends ComponentStore<EligibilityStatusFeatureState> {
  constructor(
    private readonly data: WebCoreDataAccessService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly toast: WebUiToastService,
    private readonly formService: FormService,
    private readonly eligibilityStatusService: EligibilityStatusService
) {
    super({ 
      loading: false,
      eligibilityStatuses: [],
      done: false,
      searchQuery: '',
      formName: undefined,

      paging: {
        limit: 10000,
        skip: 0,
      },
    })

    if (this.route.snapshot.paramMap.has('eligibilityStatusId')) {
      var eligibilityStatusId = this.route.snapshot.paramMap.get('eligibilityStatusId')
      this.setFormName('eligibilityStatus_edit')
    } else {
      this.setFormName('eligibilityStatus_create')
    }




  }

  readonly errors$ = this.select((s) => s.errors)
  readonly loading$ = this.select((s) => s.loading)
  readonly done$ = this.select((s) => s.done)
  readonly item$ = this.select((s) => s.item)
  readonly eligibilityStatuses$ = this.select((s) => s.eligibilityStatuses)


  readonly paging$ = this.select((s) => s.paging)
  readonly searchQuery$ = this.select((s) => s.searchQuery)
  readonly formName$ = this.select((s) => s.formName)

  readonly actionResult$ = this.select(this.item$, this.done$,
    (item, done ) => ({item,done,
    }),
    {debounce: true })


  readonly vm$ = this.select(this.errors$, this.loading$, this.item$, this.formName$, this.eligibilityStatuses$,

    (errors, loading, item, formName, eligibilityStatuses,  ) => ({
    errors,
    loading,
    item,
    formName,
    eligibilityStatuses,

            
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







    

  readonly setItem = this.updater((state, item: EligibilityStatus) => ({...state, item}))

  addNewEligibilityStatus = this.updater((state, eligibilityStatus: EligibilityStatus) => ({ ...state, eligibilityStatuses: [...state.eligibilityStatuses, eligibilityStatus] }))

  updateEligibilityStatus = this.updater((state, eligibilityStatus: EligibilityStatus) => {
    return {
      ...state,
      eligibilityStatuses: state.eligibilityStatuses.map((el) => {
        if (el.id === eligibilityStatus.id) {
          return eligibilityStatus
        } else {
          return el
        }
      }),
    }
  })

  addEligibilityStatuses = this.updater((state, newEligibilityStatuses: any[]) => ({...state, eligibilityStatuses: state.eligibilityStatuses.concat(newEligibilityStatuses) }))
  updateEligibilityStatuses = this.updater((state, updatedEligibilityStatuses: any[]) => {
    return {
      ...state,
      eligibilityStatuses: state.eligibilityStatuses.map((eligibilityStatus) => {
        const updated = updatedEligibilityStatuses.find((el) => el.id === eligibilityStatus.id);
        return updated ? updated : eligibilityStatus;
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
        return this.eligibilityStatusService.validateEligibilityStatusExcelData(excelData);
      })
    )
  }


  readonly loadEligibilityStatusEffect = this.effect<string>((eligibilityStatusId$) =>
    eligibilityStatusId$.pipe(
      tap(() => this.patchState({ loading: true })),
      switchMap((eligibilityStatusId) =>
        this.data.userEligibilityStatus({ eligibilityStatusId }).pipe(
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



  readonly loadEligibilityStatusesEffect = this.effect(($) =>
    $.pipe(
      tap(() => this.patchState({ loading: true })),
      withLatestFrom(this.input$),
      switchMap(([_, input]) =>
        this.data.userEligibilityStatuses({input}).pipe(
          tapResponse(
            (res) =>
              this.patchState({
                paging: {limit: input.limit, skip: input.skip, total: res.data.count.total},
                eligibilityStatuses: res.data.items,
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

  readonly createEligibilityStatusEffect = this.effect<UserCreateEligibilityStatusInput>((input$) =>
    input$.pipe(
      tap(() => this.patchState({loading: true })),
      switchMap((input) =>
        this.eligibilityStatusService.createEligibilityStatus({...input }).pipe(
          tapResponse(
            (eligibilityStatus: EligibilityStatus) => {
              this.addNewEligibilityStatus(eligibilityStatus)
              this.toast.success('Created Successfully!');
              setTimeout(() => this.patchState({ item: eligibilityStatus, loading: false, done: true }), 300);
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

    readonly updateEligibilityStatusEffect = this.effect<UserUpdateEligibilityStatusInput>((input$) =>
        input$.pipe(
          tap(() => this.patchState({ loading: true })),
          withLatestFrom(this.item$),
          switchMap(([input, item]) =>
            this.eligibilityStatusService.updateEligibilityStatus(input, input.id).pipe(
              tapResponse(
                (eligibilityStatus) => {
                  this.updateEligibilityStatus(eligibilityStatus)
                  this.toast.success('Updated Successfully!')
                  setTimeout(() => this.patchState({item: eligibilityStatus, loading: false, done: true }), 300);
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
  
    readonly deleteEligibilityStatusEffect = this.effect(
    ($) =>
      $.pipe(
        tap(() => this.patchState({ loading: true })),
        withLatestFrom(this.item$),
        switchMap(([_, eligibilityStatus]) => {
          return this.data.userDeleteEligibilityStatus({eligibilityStatusId: eligibilityStatus.id})
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

  readonly importExcelEffect = this.effect<UserUpdateEligibilityStatusInput[]>(($data) =>
    $data.pipe(
      tap(() => this.patchState({loading: true })),
      switchMap((data) => this.eligibilityStatusService.importEligibilityStatuses(data).pipe(
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

            this.addEligibilityStatuses(created);
            this.updateEligibilityStatuses(updated);

            this.toast.success(`${created.length} created, ${updated.length} updated, ${failed.length} failed of total ${total}`, { duration: 3000 })
          }
        )
      ))
    )
  )

}
