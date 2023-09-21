
import { ComponentStore,tapResponse } from '@ngrx/component-store'
import { EMPTY } from 'rxjs'
import { FormService } from '@case-clinical/web/ui/form'
import { Injectable } from '@angular/core'
import { UserService } from './user.service'
import { Router, ActivatedRoute } from '@angular/router'
import { switchMap, tap, withLatestFrom, map, catchError } from 'rxjs/operators'
import { UserCreateUserInput, UserUpdateUserInput, WebCoreDataAccessService, CorePaging, User, Patient,ClinicalProvider,Attorney } from '@case-clinical/web/core/data-access'
import { WebUiToastService } from '@case-clinical/web/ui/toast'


export interface UserFeatureState {
  errors?: any
  loading?: boolean
  item?: User
  done: boolean
patientId?: string,providerId?: string,attorneyId?: string,
  users: User[]
 patients?: Patient[],
 clinicalProviders?: ClinicalProvider[],
 attorneys?: Attorney[]
  searchQuery?: string
  paging?: CorePaging
}

@Injectable()
export class WebUserFeatureStore extends ComponentStore<UserFeatureState> {
  constructor(
    private readonly data: WebCoreDataAccessService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly toast: WebUiToastService,
    private readonly formService: FormService,
    private readonly userService: UserService
) {
    super({ 
      loading: false,
      users: [],
      done: false,
      searchQuery: '',
patientId: undefined,
providerId: undefined,
attorneyId: undefined,
      paging: {
        limit: 10000,
        skip: 0,
      },
    })


    if(this.route.snapshot.paramMap.has("patientId")) {
      var patientId = this.route.snapshot.paramMap.get("patientId")
      this.setPatientId(patientId)
    }


    if(this.route.snapshot.paramMap.has("providerId")) {
      var providerId = this.route.snapshot.paramMap.get("providerId")
      this.setProviderId(providerId)
    }


    if(this.route.snapshot.paramMap.has("attorneyId")) {
      var attorneyId = this.route.snapshot.paramMap.get("attorneyId")
      this.setAttorneyId(attorneyId)
    }



  }

  readonly errors$ = this.select((s) => s.errors)
  readonly loading$ = this.select((s) => s.loading)
  readonly done$ = this.select((s) => s.done)
  readonly item$ = this.select((s) => s.item)
  readonly users$ = this.select((s) => s.users)
  readonly patients$ = this.select((s) => s.patients || [])
  readonly clinicalProviders$ = this.select((s) => s.clinicalProviders || [])
  readonly attorneys$ = this.select((s) => s.attorneys || [])
  readonly paging$ = this.select((s) => s.paging)
  readonly searchQuery$ = this.select((s) => s.searchQuery)

  readonly actionResult$ = this.select(this.item$, this.done$,
    (item, done ) => ({item,done,
    }),
    {debounce: true })


  readonly vm$ = this.select(this.errors$, this.loading$, this.item$, this.users$,
this.patients$,this.clinicalProviders$,this.attorneys$,
    (errors, loading, item, users, patients,clinicalProviders,attorneys ) => ({
    errors,
    loading,
    item,
    users,
patients,clinicalProviders,attorneys
  }),
{debounce: true})

  readonly input$ = this.select(this.paging$, this.searchQuery$, (paging, searchQuery) => ({
    limit: paging.limit,
    skip: paging.skip,
    name: searchQuery,
    total: paging.total
  }))


            readonly setPatientId = this.updater((state, patientId: string) => ({
                ...state,
    patientId,
  }))


            readonly setProviderId = this.updater((state, providerId: string) => ({
                ...state,
    providerId,
  }))


            readonly setAttorneyId = this.updater((state, attorneyId: string) => ({
                ...state,
    attorneyId,
  }))



  readonly filterPatients = (term) => 
        this.data.userSelectPatients({input: { name: term}}).pipe(
          tapResponse(
            (res: any) => {
              let patients = res.data.items;
              this.patchState({patients})
              return patients
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


  readonly filterClinicalProviders = (term) => 
        this.data.userSelectClinicalProviders({input: { name: term}}).pipe(
          tapResponse(
            (res: any) => {
              let clinicalProviders = res.data.items;
              this.patchState({clinicalProviders})
              return clinicalProviders
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


  readonly filterAttorneys = (term) => 
        this.data.userSelectAttorneys({input: { name: term}}).pipe(
          tapResponse(
            (res: any) => {
              let attorneys = res.data.items;
              this.patchState({attorneys})
              return attorneys
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



  readonly addPatient = this.updater((state, patient: Patient) => ({
    ...state, patients: state.patients.concat(patient)
  }))


  readonly addClinicalProvider = this.updater((state, clinicalProvider: ClinicalProvider) => ({
    ...state, clinicalProviders: state.clinicalProviders.concat(clinicalProvider)
  }))


  readonly addAttorney = this.updater((state, attorney: Attorney) => ({
    ...state, attorneys: state.attorneys.concat(attorney)
  }))

    

  addNewUser = this.updater((state, user: User) => ({ ...state, users: [...state.users, user] }))

  updateUser = this.updater((state, user: User) => {
    return {
      ...state,
      users: state.users.map((el) => {
        if (el.id === user.id) {
          return user
        } else {
          return el
        }
      }),
    }
  })

  addUsers = this.updater((state, newUsers: any[]) => ({...state, users: state.users.concat(newUsers) }))
  updateUsers = this.updater((state, updatedUsers: any[]) => {
    return {
      ...state,
      users: state.users.map((user) => {
        const updated = updatedUsers.find((el) => el.id === user.id);
        return updated ? updated : user;
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
        return this.userService.validateUserExcelData(excelData, vm.patients,vm.clinicalProviders,vm.attorneys);
      })
    )
  }

  readonly loadUserEffect = this.effect<string>((userId$) =>
    userId$.pipe(
      tap(() => this.patchState({ loading: true })),
      switchMap((userId) =>
        this.data.userUser({ userId }).pipe(
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

  readonly loadUsersEffect = this.effect(($) =>
        $.pipe(
          tap(() => { this.patchState({ loading: true }) }),
          withLatestFrom(this.input$),
          switchMap(([_, input]) =>
            this.data.userUsers({ input }).pipe(
              tapResponse(
                (res) => {
                  this.patchState({
                    paging: { limit: input.limit, skip: input.skip, total: res.data.count.total },
                    users: res.data.items,
                    errors: res.errors,
                    loading: false,
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

  readonly createUserEffect = this.effect<UserCreateUserInput>((input$) =>
    input$.pipe(
      tap(() => this.patchState({loading: true })),
      switchMap((input) =>
        this.userService.createUser({...input }).pipe(
          tapResponse(
            (user: User) => {
              this.addNewUser(user)
              this.toast.success('Created new user');
              setTimeout(() => this.patchState({ item: user, loading: false, done: true }), 300);
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

    readonly updateUserEffect = this.effect<UserUpdateUserInput>((input$) =>
        input$.pipe(
          tap(() => this.patchState({ loading: true })),
          withLatestFrom(this.item$),
          switchMap(([input, item]) =>
            this.userService.updateUser(input, input.id).pipe(
              tapResponse(
                (user) => {
                  this.updateUser(user)
                  this.toast.success('Updated user Successfully')
                  setTimeout(() => this.patchState({item: user, loading: false, done: true }), 300);
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
  
    readonly deleteUserEffect = this.effect<User>(
    (user$) =>
      user$.pipe(
        switchMap((user) =>
          this.data
            .userDeleteUser({
                userId: user.id,
            })
            .pipe(
              tapResponse(
                (res) => {
                  this.toast.success("Deleted user successfully!", { duration: 3000 })
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
            ),
        ),
      ),
  )

  readonly importExcelEffect = this.effect<UserUpdateUserInput[]>(($data) =>
    $data.pipe(
      tap(() => this.patchState({loading: true })),
      switchMap((data) => this.userService.importUsers(data).pipe(
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

            this.addUsers(created);
            this.updateUsers(updated);

            this.toast.success(`${created.length} created, ${updated.length} updated, ${failed.length} failed of total ${total}`, { duration: 3000 })
          }
        )
      ))
    )
  )

}
