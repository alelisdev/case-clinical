
import { ComponentStore,tapResponse } from '@ngrx/component-store'
import { EMPTY } from 'rxjs'
import { FormService } from '@case-clinical/web/ui/form'
import { Injectable } from '@angular/core'
import { AuthorizationStatusService } from './authorization-status.service'
import { Router, ActivatedRoute } from '@angular/router'
import { switchMap, tap, withLatestFrom, map, catchError } from 'rxjs/operators'
import { UserCreateAuthorizationStatusInput, UserUpdateAuthorizationStatusInput, WebCoreDataAccessService, CorePaging, AuthorizationStatus,  } from '@case-clinical/web/core/data-access'
import { WebUiToastService } from '@case-clinical/web/ui/toast'


export interface AuthorizationStatusFeatureState {
  errors?: any
  loading?: boolean
  item?: AuthorizationStatus
  done: boolean,
  formName?: string

  authorizationStatuses: AuthorizationStatus[]

  searchQuery?: string
  paging?: CorePaging
}

@Injectable()
export class WebAuthorizationStatusFeatureStore extends ComponentStore<AuthorizationStatusFeatureState> {
  constructor(
    private readonly data: WebCoreDataAccessService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly toast: WebUiToastService,
    private readonly formService: FormService,
    private readonly authorizationStatusService: AuthorizationStatusService
) {
    super({ 
      loading: false,
      authorizationStatuses: [],
      done: false,
      searchQuery: '',
      formName: undefined,

      paging: {
        limit: 10000,
        skip: 0,
      },
    })

    if (this.route.snapshot.paramMap.has('authorizationStatusId')) {
      var authorizationStatusId = this.route.snapshot.paramMap.get('authorizationStatusId')
      this.setFormName('authorizationStatus_edit')
    } else {
      this.setFormName('authorizationStatus_create')
    }




  }

  readonly errors$ = this.select((s) => s.errors)
  readonly loading$ = this.select((s) => s.loading)
  readonly done$ = this.select((s) => s.done)
  readonly item$ = this.select((s) => s.item)
  readonly authorizationStatuses$ = this.select((s) => s.authorizationStatuses)


  readonly paging$ = this.select((s) => s.paging)
  readonly searchQuery$ = this.select((s) => s.searchQuery)
  readonly formName$ = this.select((s) => s.formName)

  readonly actionResult$ = this.select(this.item$, this.done$,
    (item, done ) => ({item,done,
    }),
    {debounce: true })


  readonly vm$ = this.select(this.errors$, this.loading$, this.item$, this.formName$, this.authorizationStatuses$,

    (errors, loading, item, formName, authorizationStatuses,  ) => ({
    errors,
    loading,
    item,
    formName,
    authorizationStatuses,

            
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







    

  readonly setItem = this.updater((state, item: AuthorizationStatus) => ({...state, item}))

  addNewAuthorizationStatus = this.updater((state, authorizationStatus: AuthorizationStatus) => ({ ...state, authorizationStatuses: [...state.authorizationStatuses, authorizationStatus] }))

  updateAuthorizationStatus = this.updater((state, authorizationStatus: AuthorizationStatus) => {
    return {
      ...state,
      authorizationStatuses: state.authorizationStatuses.map((el) => {
        if (el.id === authorizationStatus.id) {
          return authorizationStatus
        } else {
          return el
        }
      }),
    }
  })

  addAuthorizationStatuses = this.updater((state, newAuthorizationStatuses: any[]) => ({...state, authorizationStatuses: state.authorizationStatuses.concat(newAuthorizationStatuses) }))
  updateAuthorizationStatuses = this.updater((state, updatedAuthorizationStatuses: any[]) => {
    return {
      ...state,
      authorizationStatuses: state.authorizationStatuses.map((authorizationStatus) => {
        const updated = updatedAuthorizationStatuses.find((el) => el.id === authorizationStatus.id);
        return updated ? updated : authorizationStatus;
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
        return this.authorizationStatusService.validateAuthorizationStatusExcelData(excelData);
      })
    )
  }


  readonly loadAuthorizationStatusEffect = this.effect<string>((authorizationStatusId$) =>
    authorizationStatusId$.pipe(
      tap(() => this.patchState({ loading: true })),
      switchMap((authorizationStatusId) =>
        this.data.userAuthorizationStatus({ authorizationStatusId }).pipe(
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



  readonly loadAuthorizationStatusesEffect = this.effect(($) =>
    $.pipe(
      tap(() => this.patchState({ loading: true })),
      withLatestFrom(this.input$),
      switchMap(([_, input]) =>
        this.data.userAuthorizationStatuses({input}).pipe(
          tapResponse(
            (res) =>
              this.patchState({
                paging: {limit: input.limit, skip: input.skip, total: res.data.count.total},
                authorizationStatuses: res.data.items,
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

  readonly createAuthorizationStatusEffect = this.effect<UserCreateAuthorizationStatusInput>((input$) =>
    input$.pipe(
      tap(() => this.patchState({loading: true })),
      switchMap((input) =>
        this.authorizationStatusService.createAuthorizationStatus({...input }).pipe(
          tapResponse(
            (authorizationStatus: AuthorizationStatus) => {
              this.addNewAuthorizationStatus(authorizationStatus)
              this.toast.success('Created Successfully!');
              setTimeout(() => this.patchState({ item: authorizationStatus, loading: false, done: true }), 300);
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

    readonly updateAuthorizationStatusEffect = this.effect<UserUpdateAuthorizationStatusInput>((input$) =>
        input$.pipe(
          tap(() => this.patchState({ loading: true })),
          withLatestFrom(this.item$),
          switchMap(([input, item]) =>
            this.authorizationStatusService.updateAuthorizationStatus(input, input.id).pipe(
              tapResponse(
                (authorizationStatus) => {
                  this.updateAuthorizationStatus(authorizationStatus)
                  this.toast.success('Updated Successfully!')
                  setTimeout(() => this.patchState({item: authorizationStatus, loading: false, done: true }), 300);
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
  
    readonly deleteAuthorizationStatusEffect = this.effect(
    ($) =>
      $.pipe(
        tap(() => this.patchState({ loading: true })),
        withLatestFrom(this.item$),
        switchMap(([_, authorizationStatus]) => {
          return this.data.userDeleteAuthorizationStatus({authorizationStatusId: authorizationStatus.id})
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

  readonly importExcelEffect = this.effect<UserUpdateAuthorizationStatusInput[]>(($data) =>
    $data.pipe(
      tap(() => this.patchState({loading: true })),
      switchMap((data) => this.authorizationStatusService.importAuthorizationStatuses(data).pipe(
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

            this.addAuthorizationStatuses(created);
            this.updateAuthorizationStatuses(updated);

            this.toast.success(`${created.length} created, ${updated.length} updated, ${failed.length} failed of total ${total}`, { duration: 3000 })
          }
        )
      ))
    )
  )

}
