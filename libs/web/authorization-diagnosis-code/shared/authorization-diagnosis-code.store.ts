
import { ComponentStore,tapResponse } from '@ngrx/component-store'
import { EMPTY } from 'rxjs'
import { FormService } from '@case-clinical/web/ui/form'
import { Injectable } from '@angular/core'
import { AuthorizationDiagnosisCodeService } from './authorization-diagnosis-code.service'
import { Router, ActivatedRoute } from '@angular/router'
import { switchMap, tap, withLatestFrom, map, catchError } from 'rxjs/operators'
import { UserCreateAuthorizationDiagnosisCodeInput, UserUpdateAuthorizationDiagnosisCodeInput, WebCoreDataAccessService, CorePaging, AuthorizationDiagnosisCode, DiagnosisCode,Authorization } from '@case-clinical/web/core/data-access'
import { WebUiToastService } from '@case-clinical/web/ui/toast'


export interface AuthorizationDiagnosisCodeFeatureState {
  errors?: any
  loading?: boolean
  item?: AuthorizationDiagnosisCode
  done: boolean,
  formName?: string
diagnosisCodeId?: string,authorizationId?: string,
  authorizationDiagnosisCodes: AuthorizationDiagnosisCode[]
 diagnosisCodes?: DiagnosisCode[],
 authorizations?: Authorization[]
  searchQuery?: string
  paging?: CorePaging
}

@Injectable()
export class WebAuthorizationDiagnosisCodeFeatureStore extends ComponentStore<AuthorizationDiagnosisCodeFeatureState> {
  constructor(
    private readonly data: WebCoreDataAccessService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly toast: WebUiToastService,
    private readonly formService: FormService,
    private readonly authorizationDiagnosisCodeService: AuthorizationDiagnosisCodeService
) {
    super({ 
      loading: false,
      authorizationDiagnosisCodes: [],
      done: false,
      searchQuery: '',
      formName: undefined,
diagnosisCodeId: undefined,
authorizationId: undefined,
      paging: {
        limit: 10000,
        skip: 0,
      },
    })

    if (this.route.snapshot.paramMap.has('authorizationDiagnosisCodeId')) {
      var authorizationDiagnosisCodeId = this.route.snapshot.paramMap.get('authorizationDiagnosisCodeId')
      this.setFormName('authorizationDiagnosisCode_edit')
    } else {
      this.setFormName('authorizationDiagnosisCode_create')
    }


    if(this.route.snapshot.paramMap.has("diagnosisCodeId")) {
      var diagnosisCodeId = this.route.snapshot.paramMap.get("diagnosisCodeId")
      this.setDiagnosisCodeId(diagnosisCodeId)
    }


    if(this.route.snapshot.paramMap.has("authorizationId")) {
      var authorizationId = this.route.snapshot.paramMap.get("authorizationId")
      this.setAuthorizationId(authorizationId)
    }



  }

  readonly errors$ = this.select((s) => s.errors)
  readonly loading$ = this.select((s) => s.loading)
  readonly done$ = this.select((s) => s.done)
  readonly item$ = this.select((s) => s.item)
  readonly authorizationDiagnosisCodes$ = this.select((s) => s.authorizationDiagnosisCodes)
  readonly diagnosisCodes$ = this.select((s) => s.diagnosisCodes || [])
  readonly authorizations$ = this.select((s) => s.authorizations || [])

readonly diagnosisCodeId$ = this.select((s) => s.diagnosisCodeId)

readonly authorizationId$ = this.select((s) => s.authorizationId)

  readonly paging$ = this.select((s) => s.paging)
  readonly searchQuery$ = this.select((s) => s.searchQuery)
  readonly formName$ = this.select((s) => s.formName)

  readonly actionResult$ = this.select(this.item$, this.done$,
    (item, done ) => ({item,done,
    }),
    {debounce: true })


  readonly vm$ = this.select(this.errors$, this.loading$, this.item$, this.formName$, this.authorizationDiagnosisCodes$,
this.diagnosisCodes$,this.authorizations$,
    (errors, loading, item, formName, authorizationDiagnosisCodes, diagnosisCodes,authorizations ) => ({
    errors,
    loading,
    item,
    formName,
    authorizationDiagnosisCodes,

            diagnosisCodes,authorizations
  }),
{debounce: true})

  readonly input$ = this.select(this.paging$, this.diagnosisCodeId$,
this.authorizationId$, this.searchQuery$, (paging, diagnosisCodeId,
authorizationId,searchQuery) => ({
    limit: paging.limit,
    skip: paging.skip,
    name: searchQuery,
    diagnosisCodeId: diagnosisCodeId,authorizationId: authorizationId,
    total: paging.total
  }))

  readonly setFormName = this.updater((state, formName: string) => ({
    ...state,
    formName,
  }))



            readonly setDiagnosisCodeId = this.updater((state, diagnosisCodeId: string) => ({
                ...state,
    diagnosisCodeId,
  }))


            readonly setAuthorizationId = this.updater((state, authorizationId: string) => ({
                ...state,
    authorizationId,
  }))



  readonly filterDiagnosisCodes = (term) => 
        this.data.userSelectDiagnosisCodes({input: { name: term}}).pipe(
          tapResponse(
            (res: any) => {
              let diagnosisCodes = res.data.items;
              this.patchState({diagnosisCodes})
              return diagnosisCodes
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



  readonly addDiagnosisCode = this.updater((state, diagnosisCode: DiagnosisCode) => ({
    ...state, diagnosisCodes: state.diagnosisCodes.concat(diagnosisCode)
  }))


  readonly addAuthorization = this.updater((state, authorization: Authorization) => ({
    ...state, authorizations: state.authorizations.concat(authorization)
  }))

    

  readonly setItem = this.updater((state, item: AuthorizationDiagnosisCode) => ({...state, item}))

  addNewAuthorizationDiagnosisCode = this.updater((state, authorizationDiagnosisCode: AuthorizationDiagnosisCode) => ({ ...state, authorizationDiagnosisCodes: [...state.authorizationDiagnosisCodes, authorizationDiagnosisCode] }))

  updateAuthorizationDiagnosisCode = this.updater((state, authorizationDiagnosisCode: AuthorizationDiagnosisCode) => {
    return {
      ...state,
      authorizationDiagnosisCodes: state.authorizationDiagnosisCodes.map((el) => {
        if (el.id === authorizationDiagnosisCode.id) {
          return authorizationDiagnosisCode
        } else {
          return el
        }
      }),
    }
  })

  addAuthorizationDiagnosisCodes = this.updater((state, newAuthorizationDiagnosisCodes: any[]) => ({...state, authorizationDiagnosisCodes: state.authorizationDiagnosisCodes.concat(newAuthorizationDiagnosisCodes) }))
  updateAuthorizationDiagnosisCodes = this.updater((state, updatedAuthorizationDiagnosisCodes: any[]) => {
    return {
      ...state,
      authorizationDiagnosisCodes: state.authorizationDiagnosisCodes.map((authorizationDiagnosisCode) => {
        const updated = updatedAuthorizationDiagnosisCodes.find((el) => el.id === authorizationDiagnosisCode.id);
        return updated ? updated : authorizationDiagnosisCode;
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
        return this.authorizationDiagnosisCodeService.validateAuthorizationDiagnosisCodeExcelData(excelData, vm.diagnosisCodes,vm.authorizations);
      })
    )
  }


  readonly loadAuthorizationDiagnosisCodeEffect = this.effect<string>((authorizationDiagnosisCodeId$) =>
    authorizationDiagnosisCodeId$.pipe(
      tap(() => this.patchState({ loading: true })),
      switchMap((authorizationDiagnosisCodeId) =>
        this.data.userAuthorizationDiagnosisCode({ authorizationDiagnosisCodeId }).pipe(
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



  readonly loadAuthorizationDiagnosisCodesEffect = this.effect(($) =>
    $.pipe(
      tap(() => this.patchState({ loading: true })),
      withLatestFrom(this.input$),
      switchMap(([_, input]) =>
        this.data.userAuthorizationDiagnosisCodes({input}).pipe(
          tapResponse(
            (res) =>
              this.patchState({
                paging: {limit: input.limit, skip: input.skip, total: res.data.count.total},
                authorizationDiagnosisCodes: res.data.items,
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

  readonly createAuthorizationDiagnosisCodeEffect = this.effect<UserCreateAuthorizationDiagnosisCodeInput>((input$) =>
    input$.pipe(
      tap(() => this.patchState({loading: true })),
      switchMap((input) =>
        this.authorizationDiagnosisCodeService.createAuthorizationDiagnosisCode({...input }).pipe(
          tapResponse(
            (authorizationDiagnosisCode: AuthorizationDiagnosisCode) => {
              this.addNewAuthorizationDiagnosisCode(authorizationDiagnosisCode)
              this.toast.success('Created Successfully!');
              setTimeout(() => this.patchState({ item: authorizationDiagnosisCode, loading: false, done: true }), 300);
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

    readonly updateAuthorizationDiagnosisCodeEffect = this.effect<UserUpdateAuthorizationDiagnosisCodeInput>((input$) =>
        input$.pipe(
          tap(() => this.patchState({ loading: true })),
          withLatestFrom(this.item$),
          switchMap(([input, item]) =>
            this.authorizationDiagnosisCodeService.updateAuthorizationDiagnosisCode(input, input.id).pipe(
              tapResponse(
                (authorizationDiagnosisCode) => {
                  this.updateAuthorizationDiagnosisCode(authorizationDiagnosisCode)
                  this.toast.success('Updated Successfully!')
                  setTimeout(() => this.patchState({item: authorizationDiagnosisCode, loading: false, done: true }), 300);
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
  
    readonly deleteAuthorizationDiagnosisCodeEffect = this.effect(
    ($) =>
      $.pipe(
        tap(() => this.patchState({ loading: true })),
        withLatestFrom(this.item$),
        switchMap(([_, authorizationDiagnosisCode]) => {
          return this.data.userDeleteAuthorizationDiagnosisCode({authorizationDiagnosisCodeId: authorizationDiagnosisCode.id})
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

  readonly importExcelEffect = this.effect<UserUpdateAuthorizationDiagnosisCodeInput[]>(($data) =>
    $data.pipe(
      tap(() => this.patchState({loading: true })),
      switchMap((data) => this.authorizationDiagnosisCodeService.importAuthorizationDiagnosisCodes(data).pipe(
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

            this.addAuthorizationDiagnosisCodes(created);
            this.updateAuthorizationDiagnosisCodes(updated);

            this.toast.success(`${created.length} created, ${updated.length} updated, ${failed.length} failed of total ${total}`, { duration: 3000 })
          }
        )
      ))
    )
  )

}
