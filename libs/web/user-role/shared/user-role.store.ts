
import { ComponentStore,tapResponse } from '@ngrx/component-store'
import { EMPTY } from 'rxjs'
import { FormService } from '@case-clinical/web/ui/form'
import { Injectable } from '@angular/core'
import { UserRoleService } from './user-role.service'
import { Router, ActivatedRoute } from '@angular/router'
import { switchMap, tap, withLatestFrom, map, catchError } from 'rxjs/operators'
import { UserCreateUserRoleInput, UserUpdateUserRoleInput, WebCoreDataAccessService, CorePaging, UserRole, Role,User } from '@case-clinical/web/core/data-access'
import { WebUiToastService } from '@case-clinical/web/ui/toast'


export interface UserRoleFeatureState {
  errors?: any
  loading?: boolean
  item?: UserRole
  done: boolean,
  formName?: string
roleId?: string,userId?: string,
  userRoles: UserRole[]
 roles?: Role[],
 users?: User[]
  searchQuery?: string
  paging?: CorePaging
}

@Injectable()
export class WebUserRoleFeatureStore extends ComponentStore<UserRoleFeatureState> {
  constructor(
    private readonly data: WebCoreDataAccessService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly toast: WebUiToastService,
    private readonly formService: FormService,
    private readonly userRoleService: UserRoleService
) {
    super({ 
      loading: false,
      userRoles: [],
      done: false,
      searchQuery: '',
      formName: undefined,
roleId: undefined,
userId: undefined,
      paging: {
        limit: 10000,
        skip: 0,
      },
    })

    if (this.route.snapshot.paramMap.has('userRoleId')) {
      var userRoleId = this.route.snapshot.paramMap.get('userRoleId')
      this.setFormName('userRole_edit')
    } else {
      this.setFormName('userRole_create')
    }


    if(this.route.snapshot.paramMap.has("roleId")) {
      var roleId = this.route.snapshot.paramMap.get("roleId")
      this.setRoleId(roleId)
    }


    if(this.route.snapshot.paramMap.has("userId")) {
      var userId = this.route.snapshot.paramMap.get("userId")
      this.setUserId(userId)
    }



  }

  readonly errors$ = this.select((s) => s.errors)
  readonly loading$ = this.select((s) => s.loading)
  readonly done$ = this.select((s) => s.done)
  readonly item$ = this.select((s) => s.item)
  readonly userRoles$ = this.select((s) => s.userRoles)
  readonly roles$ = this.select((s) => s.roles || [])
  readonly users$ = this.select((s) => s.users || [])

readonly roleId$ = this.select((s) => s.roleId)

readonly userId$ = this.select((s) => s.userId)

  readonly paging$ = this.select((s) => s.paging)
  readonly searchQuery$ = this.select((s) => s.searchQuery)
  readonly formName$ = this.select((s) => s.formName)

  readonly actionResult$ = this.select(this.item$, this.done$,
    (item, done ) => ({item,done,
    }),
    {debounce: true })


  readonly vm$ = this.select(this.errors$, this.loading$, this.item$, this.formName$, this.userRoles$,
this.roles$,this.users$,
    (errors, loading, item, formName, userRoles, roles,users ) => ({
    errors,
    loading,
    item,
    formName,
    userRoles,

            roles,users
  }),
{debounce: true})

  readonly input$ = this.select(this.paging$, this.roleId$,
this.userId$, this.searchQuery$, (paging, roleId,
userId,searchQuery) => ({
    limit: paging.limit,
    skip: paging.skip,
    name: searchQuery,
    roleId: roleId,userId: userId,
    total: paging.total
  }))

  readonly setFormName = this.updater((state, formName: string) => ({
    ...state,
    formName,
  }))



            readonly setRoleId = this.updater((state, roleId: string) => ({
                ...state,
    roleId,
  }))


            readonly setUserId = this.updater((state, userId: string) => ({
                ...state,
    userId,
  }))



  readonly filterRoles = (term) => 
        this.data.userSelectRoles({input: { name: term}}).pipe(
          tapResponse(
            (res: any) => {
              let roles = res.data.items;
              this.patchState({roles})
              return roles
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


  readonly filterUsers = (term) => 
        this.data.userSelectUsers({input: { name: term}}).pipe(
          tapResponse(
            (res: any) => {
              let users = res.data.items;
              this.patchState({users})
              return users
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



  readonly addRole = this.updater((state, role: Role) => ({
    ...state, roles: state.roles.concat(role)
  }))


  readonly addUser = this.updater((state, user: User) => ({
    ...state, users: state.users.concat(user)
  }))

    

  readonly setItem = this.updater((state, item: UserRole) => ({...state, item}))

  addNewUserRole = this.updater((state, userRole: UserRole) => ({ ...state, userRoles: [...state.userRoles, userRole] }))

  updateUserRole = this.updater((state, userRole: UserRole) => {
    return {
      ...state,
      userRoles: state.userRoles.map((el) => {
        if (el.id === userRole.id) {
          return userRole
        } else {
          return el
        }
      }),
    }
  })

  addUserRoles = this.updater((state, newUserRoles: any[]) => ({...state, userRoles: state.userRoles.concat(newUserRoles) }))
  updateUserRoles = this.updater((state, updatedUserRoles: any[]) => {
    return {
      ...state,
      userRoles: state.userRoles.map((userRole) => {
        const updated = updatedUserRoles.find((el) => el.id === userRole.id);
        return updated ? updated : userRole;
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
        return this.userRoleService.validateUserRoleExcelData(excelData, vm.roles,vm.users);
      })
    )
  }


  readonly loadUserRoleEffect = this.effect<string>((userRoleId$) =>
    userRoleId$.pipe(
      tap(() => this.patchState({ loading: true })),
      switchMap((userRoleId) =>
        this.data.userUserRole({ userRoleId }).pipe(
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



  readonly loadUserRolesEffect = this.effect(($) =>
    $.pipe(
      tap(() => this.patchState({ loading: true })),
      withLatestFrom(this.input$),
      switchMap(([_, input]) =>
        this.data.userUserRoles({input}).pipe(
          tapResponse(
            (res) =>
              this.patchState({
                paging: {limit: input.limit, skip: input.skip, total: res.data.count.total},
                userRoles: res.data.items,
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

  readonly createUserRoleEffect = this.effect<UserCreateUserRoleInput>((input$) =>
    input$.pipe(
      tap(() => this.patchState({loading: true })),
      switchMap((input) =>
        this.userRoleService.createUserRole({...input }).pipe(
          tapResponse(
            (userRole: UserRole) => {
              this.addNewUserRole(userRole)
              this.toast.success('Created Successfully!');
              setTimeout(() => this.patchState({ item: userRole, loading: false, done: true }), 300);
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

    readonly updateUserRoleEffect = this.effect<UserUpdateUserRoleInput>((input$) =>
        input$.pipe(
          tap(() => this.patchState({ loading: true })),
          withLatestFrom(this.item$),
          switchMap(([input, item]) =>
            this.userRoleService.updateUserRole(input, input.id).pipe(
              tapResponse(
                (userRole) => {
                  this.updateUserRole(userRole)
                  this.toast.success('Updated Successfully!')
                  setTimeout(() => this.patchState({item: userRole, loading: false, done: true }), 300);
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
  
    readonly deleteUserRoleEffect = this.effect(
    ($) =>
      $.pipe(
        tap(() => this.patchState({ loading: true })),
        withLatestFrom(this.item$),
        switchMap(([_, userRole]) => {
          return this.data.userDeleteUserRole({userRoleId: userRole.id})
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

  readonly importExcelEffect = this.effect<UserUpdateUserRoleInput[]>(($data) =>
    $data.pipe(
      tap(() => this.patchState({loading: true })),
      switchMap((data) => this.userRoleService.importUserRoles(data).pipe(
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

            this.addUserRoles(created);
            this.updateUserRoles(updated);

            this.toast.success(`${created.length} created, ${updated.length} updated, ${failed.length} failed of total ${total}`, { duration: 3000 })
          }
        )
      ))
    )
  )

}
