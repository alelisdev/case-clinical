
import { ComponentStore,tapResponse } from '@ngrx/component-store'
import { EMPTY } from 'rxjs'
import { FormService } from '@case-clinical/web/ui/form'
import { Injectable } from '@angular/core'
import { ProcedureOrTreatmentRequestAuthorizationService } from './procedure-or-treatment-request-authorization.service'
import { Router, ActivatedRoute } from '@angular/router'
import { switchMap, tap, withLatestFrom, map, catchError } from 'rxjs/operators'
import { UserCreateProcedureOrTreatmentRequestAuthorizationInput, UserUpdateProcedureOrTreatmentRequestAuthorizationInput, WebCoreDataAccessService, CorePaging, ProcedureOrTreatmentRequestAuthorization, Authorization,ProcedureOrTreatmentRequest } from '@case-clinical/web/core/data-access'
import { WebUiToastService } from '@case-clinical/web/ui/toast'


export interface ProcedureOrTreatmentRequestAuthorizationFeatureState {
  errors?: any
  loading?: boolean
  item?: ProcedureOrTreatmentRequestAuthorization
  done: boolean,
  formName?: string
authorizationId?: string,procedureOrTreatmentRequestId?: string,
  procedureOrTreatmentRequestAuthorizations: ProcedureOrTreatmentRequestAuthorization[]
 authorizations?: Authorization[],
 procedureOrTreatmentRequests?: ProcedureOrTreatmentRequest[]
  searchQuery?: string
  paging?: CorePaging
}

@Injectable()
export class WebProcedureOrTreatmentRequestAuthorizationFeatureStore extends ComponentStore<ProcedureOrTreatmentRequestAuthorizationFeatureState> {
  constructor(
    private readonly data: WebCoreDataAccessService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly toast: WebUiToastService,
    private readonly formService: FormService,
    private readonly procedureOrTreatmentRequestAuthorizationService: ProcedureOrTreatmentRequestAuthorizationService
) {
    super({ 
      loading: false,
      procedureOrTreatmentRequestAuthorizations: [],
      done: false,
      searchQuery: '',
      formName: undefined,
authorizationId: undefined,
procedureOrTreatmentRequestId: undefined,
      paging: {
        limit: 10000,
        skip: 0,
      },
    })

    if (this.route.snapshot.paramMap.has('procedureOrTreatmentRequestAuthorizationId')) {
      var procedureOrTreatmentRequestAuthorizationId = this.route.snapshot.paramMap.get('procedureOrTreatmentRequestAuthorizationId')
      this.setFormName('procedureOrTreatmentRequestAuthorization_edit')
    } else {
      this.setFormName('procedureOrTreatmentRequestAuthorization_create')
    }


    if(this.route.snapshot.paramMap.has("authorizationId")) {
      var authorizationId = this.route.snapshot.paramMap.get("authorizationId")
      this.setAuthorizationId(authorizationId)
    }


    if(this.route.snapshot.paramMap.has("procedureOrTreatmentRequestId")) {
      var procedureOrTreatmentRequestId = this.route.snapshot.paramMap.get("procedureOrTreatmentRequestId")
      this.setProcedureOrTreatmentRequestId(procedureOrTreatmentRequestId)
    }



  }

  readonly errors$ = this.select((s) => s.errors)
  readonly loading$ = this.select((s) => s.loading)
  readonly done$ = this.select((s) => s.done)
  readonly item$ = this.select((s) => s.item)
  readonly procedureOrTreatmentRequestAuthorizations$ = this.select((s) => s.procedureOrTreatmentRequestAuthorizations)
  readonly authorizations$ = this.select((s) => s.authorizations || [])
  readonly procedureOrTreatmentRequests$ = this.select((s) => s.procedureOrTreatmentRequests || [])

readonly authorizationId$ = this.select((s) => s.authorizationId)

readonly procedureOrTreatmentRequestId$ = this.select((s) => s.procedureOrTreatmentRequestId)

  readonly paging$ = this.select((s) => s.paging)
  readonly searchQuery$ = this.select((s) => s.searchQuery)
  readonly formName$ = this.select((s) => s.formName)

  readonly actionResult$ = this.select(this.item$, this.done$,
    (item, done ) => ({item,done,
    }),
    {debounce: true })


  readonly vm$ = this.select(this.errors$, this.loading$, this.item$, this.formName$, this.procedureOrTreatmentRequestAuthorizations$,
this.authorizations$,this.procedureOrTreatmentRequests$,
    (errors, loading, item, formName, procedureOrTreatmentRequestAuthorizations, authorizations,procedureOrTreatmentRequests ) => ({
    errors,
    loading,
    item,
    formName,
    procedureOrTreatmentRequestAuthorizations,

            authorizations,procedureOrTreatmentRequests
  }),
{debounce: true})

  readonly input$ = this.select(this.paging$, this.authorizationId$,
this.procedureOrTreatmentRequestId$, this.searchQuery$, (paging, authorizationId,
procedureOrTreatmentRequestId,searchQuery) => ({
    limit: paging.limit,
    skip: paging.skip,
    name: searchQuery,
    authorizationId: authorizationId,procedureOrTreatmentRequestId: procedureOrTreatmentRequestId,
    total: paging.total
  }))

  readonly setFormName = this.updater((state, formName: string) => ({
    ...state,
    formName,
  }))



            readonly setAuthorizationId = this.updater((state, authorizationId: string) => ({
                ...state,
    authorizationId,
  }))


            readonly setProcedureOrTreatmentRequestId = this.updater((state, procedureOrTreatmentRequestId: string) => ({
                ...state,
    procedureOrTreatmentRequestId,
  }))



  readonly filterAuthorizations = (term) => 
        this.data.userSelectAuthorizations({input: { name: term}}).pipe(
          tapResponse(
            (res: any) => {
              let authorizations = res.data.items;
              this.patchState({authorizations})
              return authorizations
            },
            (errors: any) =>
              this.patchState({
                errors: errors.graphQLErrors ? errors.graphQLErrors : errors,
              }),
          ),
        map(result => {
          return result.data.items;
        })
  )


  readonly filterProcedureOrTreatmentRequests = (term) => 
        this.data.userSelectProcedureOrTreatmentRequests({input: { name: term}}).pipe(
          tapResponse(
            (res: any) => {
              let procedureOrTreatmentRequests = res.data.items;
              this.patchState({procedureOrTreatmentRequests})
              return procedureOrTreatmentRequests
            },
            (errors: any) =>
              this.patchState({
                errors: errors.graphQLErrors ? errors.graphQLErrors : errors,
              }),
          ),
        map(result => {
          return result.data.items;
        })
  )



  readonly addAuthorization = this.updater((state, authorization: Authorization) => ({
    ...state, authorizations: state.authorizations.concat(authorization)
  }))


  readonly addProcedureOrTreatmentRequest = this.updater((state, procedureOrTreatmentRequest: ProcedureOrTreatmentRequest) => ({
    ...state, procedureOrTreatmentRequests: state.procedureOrTreatmentRequests.concat(procedureOrTreatmentRequest)
  }))

    

  readonly setItem = this.updater((state, item: ProcedureOrTreatmentRequestAuthorization) => ({...state, item}))

  addNewProcedureOrTreatmentRequestAuthorization = this.updater((state, procedureOrTreatmentRequestAuthorization: ProcedureOrTreatmentRequestAuthorization) => ({ ...state, procedureOrTreatmentRequestAuthorizations: [...state.procedureOrTreatmentRequestAuthorizations, procedureOrTreatmentRequestAuthorization] }))

  updateProcedureOrTreatmentRequestAuthorization = this.updater((state, procedureOrTreatmentRequestAuthorization: ProcedureOrTreatmentRequestAuthorization) => {
    return {
      ...state,
      procedureOrTreatmentRequestAuthorizations: state.procedureOrTreatmentRequestAuthorizations.map((el) => {
        if (el.id === procedureOrTreatmentRequestAuthorization.id) {
          return procedureOrTreatmentRequestAuthorization
        } else {
          return el
        }
      }),
    }
  })

  addProcedureOrTreatmentRequestAuthorizations = this.updater((state, newProcedureOrTreatmentRequestAuthorizations: any[]) => ({...state, procedureOrTreatmentRequestAuthorizations: state.procedureOrTreatmentRequestAuthorizations.concat(newProcedureOrTreatmentRequestAuthorizations) }))
  updateProcedureOrTreatmentRequestAuthorizations = this.updater((state, updatedProcedureOrTreatmentRequestAuthorizations: any[]) => {
    return {
      ...state,
      procedureOrTreatmentRequestAuthorizations: state.procedureOrTreatmentRequestAuthorizations.map((procedureOrTreatmentRequestAuthorization) => {
        const updated = updatedProcedureOrTreatmentRequestAuthorizations.find((el) => el.id === procedureOrTreatmentRequestAuthorization.id);
        return updated ? updated : procedureOrTreatmentRequestAuthorization;
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
        return this.procedureOrTreatmentRequestAuthorizationService.validateProcedureOrTreatmentRequestAuthorizationExcelData(excelData, vm.authorizations,vm.procedureOrTreatmentRequests);
      })
    )
  }


  readonly loadProcedureOrTreatmentRequestAuthorizationEffect = this.effect<string>((procedureOrTreatmentRequestAuthorizationId$) =>
    procedureOrTreatmentRequestAuthorizationId$.pipe(
      tap(() => this.patchState({ loading: true })),
      switchMap((procedureOrTreatmentRequestAuthorizationId) =>
        this.data.userProcedureOrTreatmentRequestAuthorization({ procedureOrTreatmentRequestAuthorizationId }).pipe(
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



  readonly loadProcedureOrTreatmentRequestAuthorizationsEffect = this.effect(($) =>
    $.pipe(
      tap(() => this.patchState({ loading: true })),
      withLatestFrom(this.input$),
      switchMap(([_, input]) =>
        this.data.userProcedureOrTreatmentRequestAuthorizations({input}).pipe(
          tapResponse(
            (res) =>
              this.patchState({
                paging: {limit: input.limit, skip: input.skip, total: res.data.count.total},
                procedureOrTreatmentRequestAuthorizations: res.data.items,
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

  readonly createProcedureOrTreatmentRequestAuthorizationEffect = this.effect<UserCreateProcedureOrTreatmentRequestAuthorizationInput>((input$) =>
    input$.pipe(
      tap(() => this.patchState({loading: true })),
      switchMap((input) =>
        this.procedureOrTreatmentRequestAuthorizationService.createProcedureOrTreatmentRequestAuthorization({...input }).pipe(
          tapResponse(
            (procedureOrTreatmentRequestAuthorization: ProcedureOrTreatmentRequestAuthorization) => {
              this.addNewProcedureOrTreatmentRequestAuthorization(procedureOrTreatmentRequestAuthorization)
              this.toast.success('Created Successfully!');
              setTimeout(() => this.patchState({ item: procedureOrTreatmentRequestAuthorization, loading: false, done: true }), 300);
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

    readonly updateProcedureOrTreatmentRequestAuthorizationEffect = this.effect<UserUpdateProcedureOrTreatmentRequestAuthorizationInput>((input$) =>
        input$.pipe(
          tap(() => this.patchState({ loading: true })),
          withLatestFrom(this.item$),
          switchMap(([input, item]) =>
            this.procedureOrTreatmentRequestAuthorizationService.updateProcedureOrTreatmentRequestAuthorization(input, input.id).pipe(
              tapResponse(
                (procedureOrTreatmentRequestAuthorization) => {
                  this.updateProcedureOrTreatmentRequestAuthorization(procedureOrTreatmentRequestAuthorization)
                  this.toast.success('Updated Successfully!')
                  setTimeout(() => this.patchState({item: procedureOrTreatmentRequestAuthorization, loading: false, done: true }), 300);
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
  
    readonly deleteProcedureOrTreatmentRequestAuthorizationEffect = this.effect(
    ($) =>
      $.pipe(
        tap(() => this.patchState({ loading: true })),
        withLatestFrom(this.item$),
        switchMap(([_, procedureOrTreatmentRequestAuthorization]) => {
          return this.data.userDeleteProcedureOrTreatmentRequestAuthorization({procedureOrTreatmentRequestAuthorizationId: procedureOrTreatmentRequestAuthorization.id})
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

  readonly importExcelEffect = this.effect<UserUpdateProcedureOrTreatmentRequestAuthorizationInput[]>(($data) =>
    $data.pipe(
      tap(() => this.patchState({loading: true })),
      switchMap((data) => this.procedureOrTreatmentRequestAuthorizationService.importProcedureOrTreatmentRequestAuthorizations(data).pipe(
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

            this.addProcedureOrTreatmentRequestAuthorizations(created);
            this.updateProcedureOrTreatmentRequestAuthorizations(updated);

            this.toast.success(`${created.length} created, ${updated.length} updated, ${failed.length} failed of total ${total}`, { duration: 3000 })
          }
        )
      ))
    )
  )

}
