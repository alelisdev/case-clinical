
import { ComponentStore,tapResponse } from '@ngrx/component-store'
import { EMPTY } from 'rxjs'
import { FormService } from '@case-clinical/web/ui/form'
import { Injectable } from '@angular/core'
import { PriorMedsToDateStatusService } from './prior-meds-to-date-status.service'
import { Router, ActivatedRoute } from '@angular/router'
import { switchMap, tap, withLatestFrom, map, catchError } from 'rxjs/operators'
import { UserCreatePriorMedsToDateStatusInput, UserUpdatePriorMedsToDateStatusInput, WebCoreDataAccessService, CorePaging, PriorMedsToDateStatus,  } from '@case-clinical/web/core/data-access'
import { WebUiToastService } from '@case-clinical/web/ui/toast'


export interface PriorMedsToDateStatusFeatureState {
  errors?: any
  loading?: boolean
  item?: PriorMedsToDateStatus
  done: boolean,
  formName?: string

  priorMedsToDateStatuses: PriorMedsToDateStatus[]

  searchQuery?: string
  paging?: CorePaging
}

@Injectable()
export class WebPriorMedsToDateStatusFeatureStore extends ComponentStore<PriorMedsToDateStatusFeatureState> {
  constructor(
    private readonly data: WebCoreDataAccessService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly toast: WebUiToastService,
    private readonly formService: FormService,
    private readonly priorMedsToDateStatusService: PriorMedsToDateStatusService
) {
    super({ 
      loading: false,
      priorMedsToDateStatuses: [],
      done: false,
      searchQuery: '',
      formName: undefined,

      paging: {
        limit: 10000,
        skip: 0,
      },
    })

    if (this.route.snapshot.paramMap.has('priorMedsToDateStatusId')) {
      var priorMedsToDateStatusId = this.route.snapshot.paramMap.get('priorMedsToDateStatusId')
      this.setFormName('priorMedsToDateStatus_edit')
    } else {
      this.setFormName('priorMedsToDateStatus_create')
    }




  }

  readonly errors$ = this.select((s) => s.errors)
  readonly loading$ = this.select((s) => s.loading)
  readonly done$ = this.select((s) => s.done)
  readonly item$ = this.select((s) => s.item)
  readonly priorMedsToDateStatuses$ = this.select((s) => s.priorMedsToDateStatuses)


  readonly paging$ = this.select((s) => s.paging)
  readonly searchQuery$ = this.select((s) => s.searchQuery)
  readonly formName$ = this.select((s) => s.formName)

  readonly actionResult$ = this.select(this.item$, this.done$,
    (item, done ) => ({item,done,
    }),
    {debounce: true })


  readonly vm$ = this.select(this.errors$, this.loading$, this.item$, this.formName$, this.priorMedsToDateStatuses$,

    (errors, loading, item, formName, priorMedsToDateStatuses,  ) => ({
    errors,
    loading,
    item,
    formName,
    priorMedsToDateStatuses,

            
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







    

  readonly setItem = this.updater((state, item: PriorMedsToDateStatus) => ({...state, item}))

  addNewPriorMedsToDateStatus = this.updater((state, priorMedsToDateStatus: PriorMedsToDateStatus) => ({ ...state, priorMedsToDateStatuses: [...state.priorMedsToDateStatuses, priorMedsToDateStatus] }))

  updatePriorMedsToDateStatus = this.updater((state, priorMedsToDateStatus: PriorMedsToDateStatus) => {
    return {
      ...state,
      priorMedsToDateStatuses: state.priorMedsToDateStatuses.map((el) => {
        if (el.id === priorMedsToDateStatus.id) {
          return priorMedsToDateStatus
        } else {
          return el
        }
      }),
    }
  })

  addPriorMedsToDateStatuses = this.updater((state, newPriorMedsToDateStatuses: any[]) => ({...state, priorMedsToDateStatuses: state.priorMedsToDateStatuses.concat(newPriorMedsToDateStatuses) }))
  updatePriorMedsToDateStatuses = this.updater((state, updatedPriorMedsToDateStatuses: any[]) => {
    return {
      ...state,
      priorMedsToDateStatuses: state.priorMedsToDateStatuses.map((priorMedsToDateStatus) => {
        const updated = updatedPriorMedsToDateStatuses.find((el) => el.id === priorMedsToDateStatus.id);
        return updated ? updated : priorMedsToDateStatus;
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
        return this.priorMedsToDateStatusService.validatePriorMedsToDateStatusExcelData(excelData);
      })
    )
  }


  readonly loadPriorMedsToDateStatusEffect = this.effect<string>((priorMedsToDateStatusId$) =>
    priorMedsToDateStatusId$.pipe(
      tap(() => this.patchState({ loading: true })),
      switchMap((priorMedsToDateStatusId) =>
        this.data.userPriorMedsToDateStatus({ priorMedsToDateStatusId }).pipe(
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



  readonly loadPriorMedsToDateStatusesEffect = this.effect(($) =>
    $.pipe(
      tap(() => this.patchState({ loading: true })),
      withLatestFrom(this.input$),
      switchMap(([_, input]) =>
        this.data.userPriorMedsToDateStatuses({input}).pipe(
          tapResponse(
            (res) =>
              this.patchState({
                paging: {limit: input.limit, skip: input.skip, total: res.data.count.total},
                priorMedsToDateStatuses: res.data.items,
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

  readonly createPriorMedsToDateStatusEffect = this.effect<UserCreatePriorMedsToDateStatusInput>((input$) =>
    input$.pipe(
      tap(() => this.patchState({loading: true })),
      switchMap((input) =>
        this.priorMedsToDateStatusService.createPriorMedsToDateStatus({...input }).pipe(
          tapResponse(
            (priorMedsToDateStatus: PriorMedsToDateStatus) => {
              this.addNewPriorMedsToDateStatus(priorMedsToDateStatus)
              this.toast.success('Created Successfully!');
              setTimeout(() => this.patchState({ item: priorMedsToDateStatus, loading: false, done: true }), 300);
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

    readonly updatePriorMedsToDateStatusEffect = this.effect<UserUpdatePriorMedsToDateStatusInput>((input$) =>
        input$.pipe(
          tap(() => this.patchState({ loading: true })),
          withLatestFrom(this.item$),
          switchMap(([input, item]) =>
            this.priorMedsToDateStatusService.updatePriorMedsToDateStatus(input, input.id).pipe(
              tapResponse(
                (priorMedsToDateStatus) => {
                  this.updatePriorMedsToDateStatus(priorMedsToDateStatus)
                  this.toast.success('Updated Successfully!')
                  setTimeout(() => this.patchState({item: priorMedsToDateStatus, loading: false, done: true }), 300);
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
  
    readonly deletePriorMedsToDateStatusEffect = this.effect(
    ($) =>
      $.pipe(
        tap(() => this.patchState({ loading: true })),
        withLatestFrom(this.item$),
        switchMap(([_, priorMedsToDateStatus]) => {
          return this.data.userDeletePriorMedsToDateStatus({priorMedsToDateStatusId: priorMedsToDateStatus.id})
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

  readonly importExcelEffect = this.effect<UserUpdatePriorMedsToDateStatusInput[]>(($data) =>
    $data.pipe(
      tap(() => this.patchState({loading: true })),
      switchMap((data) => this.priorMedsToDateStatusService.importPriorMedsToDateStatuses(data).pipe(
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

            this.addPriorMedsToDateStatuses(created);
            this.updatePriorMedsToDateStatuses(updated);

            this.toast.success(`${created.length} created, ${updated.length} updated, ${failed.length} failed of total ${total}`, { duration: 3000 })
          }
        )
      ))
    )
  )

}
