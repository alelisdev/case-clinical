
import { ComponentStore,tapResponse } from '@ngrx/component-store'
import { EMPTY } from 'rxjs'
import { FormService } from '@case-clinical/web/ui/form'
import { Injectable } from '@angular/core'
import { AttorneyStatusService } from './attorney-status.service'
import { Router, ActivatedRoute } from '@angular/router'
import { switchMap, tap, withLatestFrom, map, catchError } from 'rxjs/operators'
import { UserCreateAttorneyStatusInput, UserUpdateAttorneyStatusInput, WebCoreDataAccessService, CorePaging, AttorneyStatus,  } from '@case-clinical/web/core/data-access'
import { WebUiToastService } from '@case-clinical/web/ui/toast'


export interface AttorneyStatusFeatureState {
  errors?: any
  loading?: boolean
  item?: AttorneyStatus
  done: boolean,
  formName?: string

  attorneyStatuses: AttorneyStatus[]

  searchQuery?: string
  paging?: CorePaging
}

@Injectable()
export class WebAttorneyStatusFeatureStore extends ComponentStore<AttorneyStatusFeatureState> {
  constructor(
    private readonly data: WebCoreDataAccessService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly toast: WebUiToastService,
    private readonly formService: FormService,
    private readonly attorneyStatusService: AttorneyStatusService
) {
    super({ 
      loading: false,
      attorneyStatuses: [],
      done: false,
      searchQuery: '',
      formName: undefined,

      paging: {
        limit: 10000,
        skip: 0,
      },
    })

    if (this.route.snapshot.paramMap.has('attorneyStatusId')) {
      var attorneyStatusId = this.route.snapshot.paramMap.get('attorneyStatusId')
      this.setFormName('attorneyStatus_edit')
    } else {
      this.setFormName('attorneyStatus_create')
    }




  }

  readonly errors$ = this.select((s) => s.errors)
  readonly loading$ = this.select((s) => s.loading)
  readonly done$ = this.select((s) => s.done)
  readonly item$ = this.select((s) => s.item)
  readonly attorneyStatuses$ = this.select((s) => s.attorneyStatuses)


  readonly paging$ = this.select((s) => s.paging)
  readonly searchQuery$ = this.select((s) => s.searchQuery)
  readonly formName$ = this.select((s) => s.formName)

  readonly actionResult$ = this.select(this.item$, this.done$,
    (item, done ) => ({item,done,
    }),
    {debounce: true })


  readonly vm$ = this.select(this.errors$, this.loading$, this.item$, this.formName$, this.attorneyStatuses$,

    (errors, loading, item, formName, attorneyStatuses,  ) => ({
    errors,
    loading,
    item,
    formName,
    attorneyStatuses,

            
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







    

  readonly setItem = this.updater((state, item: AttorneyStatus) => ({...state, item}))

  addNewAttorneyStatus = this.updater((state, attorneyStatus: AttorneyStatus) => ({ ...state, attorneyStatuses: [...state.attorneyStatuses, attorneyStatus] }))

  updateAttorneyStatus = this.updater((state, attorneyStatus: AttorneyStatus) => {
    return {
      ...state,
      attorneyStatuses: state.attorneyStatuses.map((el) => {
        if (el.id === attorneyStatus.id) {
          return attorneyStatus
        } else {
          return el
        }
      }),
    }
  })

  addAttorneyStatuses = this.updater((state, newAttorneyStatuses: any[]) => ({...state, attorneyStatuses: state.attorneyStatuses.concat(newAttorneyStatuses) }))
  updateAttorneyStatuses = this.updater((state, updatedAttorneyStatuses: any[]) => {
    return {
      ...state,
      attorneyStatuses: state.attorneyStatuses.map((attorneyStatus) => {
        const updated = updatedAttorneyStatuses.find((el) => el.id === attorneyStatus.id);
        return updated ? updated : attorneyStatus;
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
        return this.attorneyStatusService.validateAttorneyStatusExcelData(excelData);
      })
    )
  }


  readonly loadAttorneyStatusEffect = this.effect<string>((attorneyStatusId$) =>
    attorneyStatusId$.pipe(
      tap(() => this.patchState({ loading: true })),
      switchMap((attorneyStatusId) =>
        this.data.userAttorneyStatus({ attorneyStatusId }).pipe(
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



  readonly loadAttorneyStatusesEffect = this.effect(($) =>
    $.pipe(
      tap(() => this.patchState({ loading: true })),
      withLatestFrom(this.input$),
      switchMap(([_, input]) =>
        this.data.userAttorneyStatuses({input}).pipe(
          tapResponse(
            (res) =>
              this.patchState({
                paging: {limit: input.limit, skip: input.skip, total: res.data.count.total},
                attorneyStatuses: res.data.items,
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

  readonly createAttorneyStatusEffect = this.effect<UserCreateAttorneyStatusInput>((input$) =>
    input$.pipe(
      tap(() => this.patchState({loading: true })),
      switchMap((input) =>
        this.attorneyStatusService.createAttorneyStatus({...input }).pipe(
          tapResponse(
            (attorneyStatus: AttorneyStatus) => {
              this.addNewAttorneyStatus(attorneyStatus)
              this.toast.success('Created Successfully!');
              setTimeout(() => this.patchState({ item: attorneyStatus, loading: false, done: true }), 300);
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

    readonly updateAttorneyStatusEffect = this.effect<UserUpdateAttorneyStatusInput>((input$) =>
        input$.pipe(
          tap(() => this.patchState({ loading: true })),
          withLatestFrom(this.item$),
          switchMap(([input, item]) =>
            this.attorneyStatusService.updateAttorneyStatus(input, input.id).pipe(
              tapResponse(
                (attorneyStatus) => {
                  this.updateAttorneyStatus(attorneyStatus)
                  this.toast.success('Updated Successfully!')
                  setTimeout(() => this.patchState({item: attorneyStatus, loading: false, done: true }), 300);
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
  
    readonly deleteAttorneyStatusEffect = this.effect(
    ($) =>
      $.pipe(
        tap(() => this.patchState({ loading: true })),
        withLatestFrom(this.item$),
        switchMap(([_, attorneyStatus]) => {
          return this.data.userDeleteAttorneyStatus({attorneyStatusId: attorneyStatus.id})
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

  readonly importExcelEffect = this.effect<UserUpdateAttorneyStatusInput[]>(($data) =>
    $data.pipe(
      tap(() => this.patchState({loading: true })),
      switchMap((data) => this.attorneyStatusService.importAttorneyStatuses(data).pipe(
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

            this.addAttorneyStatuses(created);
            this.updateAttorneyStatuses(updated);

            this.toast.success(`${created.length} created, ${updated.length} updated, ${failed.length} failed of total ${total}`, { duration: 3000 })
          }
        )
      ))
    )
  )

}
