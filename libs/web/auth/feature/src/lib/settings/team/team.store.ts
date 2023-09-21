import { ComponentStore, tapResponse } from '@ngrx/component-store'
import { FormService } from '@case-clinical/web/ui/form'
import { FuseLoadingService } from '@fuse/services/loading/loading.service'
import { Injectable } from '@angular/core'
import { of, switchMap, tap, withLatestFrom } from 'rxjs'
import { Role, User, UserCreateUserInput, WebCoreDataAccessService } from '@case-clinical/web/core/data-access'
import { SettingsService } from '../business-logic/settings.service'
import { WebUiToastService } from '@case-clinical/web/ui/toast'
import { ActivatedRoute, Router } from '@angular/router'

export interface TeamSetttingState {
  loading: boolean
  originalRoleIds: string[]
  query: string
  roles: Role[]
  item?: User,
  selectedRoleIds: string[]
  selectedUserId: string
  searchQuery: string
  errors?: any
  shouldRefreshTable: boolean
  users: User[]
}

@Injectable()
export class TeamSetttingStore extends ComponentStore<TeamSetttingState> {
  constructor(private readonly router: Router, private loading: FuseLoadingService, private route: ActivatedRoute, private readonly data: WebCoreDataAccessService, private toast: WebUiToastService, private service: SettingsService) {
    super({
      loading: false,
      originalRoleIds: [],
      query: '',
      roles: [],
      searchQuery: '',
      selectedRoleIds: [],
      selectedUserId: '',
      shouldRefreshTable: false,
      users: [],
    })
  }
  selectedUserId$ = this.select((s) => s.selectedUserId)
  shouldRefreshTable$ = this.select((s) => s.shouldRefreshTable)
  originalRoleIds$ = this.select((s) => s.originalRoleIds)
  selectedRoleIds$ = this.select((s) => s.selectedRoleIds)
  searchQuery$ = this.select((s) => s.searchQuery)
  users$ = this.select((s) => s.users)
  roles$ = this.select((s) => s.roles)
  loading$ = this.select((s) => s.loading)

  canSave$ = this.select(this.selectedRoleIds$, this.originalRoleIds$, (selectedRoleIds, originalRoleIds) => {
    console.log(selectedRoleIds, originalRoleIds)
    if (selectedRoleIds.length !== originalRoleIds.length) return true
    const diff1 = selectedRoleIds.filter((a) => !originalRoleIds.includes(a))
    const diff2 = originalRoleIds.filter((a) => !selectedRoleIds.includes(a))
    if (diff1.length === 0 && diff2.length === 0) return false
    else return true
  })

  selectedTableIds$ = this.select(
    this.shouldRefreshTable$,
    this.selectedRoleIds$,
    (shouldRefreshTable, selectedRoleIds) => ({
      shouldRefreshTable,
      selectedRoleIds,
    }),
  )

  vm$ = this.select(
    this.selectedUserId$,
    this.loading$,
    this.users$,
    this.roles$,
    this.canSave$,
    this.searchQuery$,
    (selectedUserId, loading, users, roles, canSave, searchQuery,) => {
      const searchUsers: any[] = []
      users.forEach((user) => {
        const userEmail = user?.emails?.at(0)?.email?.toLowerCase()
        if(userEmail?.includes(searchQuery?.toLowerCase())) searchUsers.push(user)
      })
      return {
        selectedUserId,
        loading,
        users: searchUsers,
        roles,
        canSave,
        searchQuery,
      }
    },
  )

  setSelectedRoleIds = this.updater((state, selectedRoleIds: string[]) => ({
    ...state,
    selectedRoleIds,
    shouldRefreshTable: false,
  }))

  setOriginalRoleIds = this.updater((state) => ({
    ...state,
    selectedRoleIds: state.originalRoleIds,
    shouldRefreshTable: true,
  }))

  selectUser = this.updater((state, user: User) => {
    const roleIds = user.userRoles.map((userRole) => userRole.roleId)
    return {
      ...state,
      selectedUserId: user.id,
      shouldRefreshTable: true,
      selectedRoleIds: roleIds,
      originalRoleIds: roleIds,
    }
  })

  setSearchQuery = this.updater((state, searchQuery: string) => {
    return {
      ...state,
      searchQuery: searchQuery,
    }
  })

  fetchUsersAndRolesEffect = this.effect<void>(($) =>
    $.pipe(
      tap(() => {
        this.patchState({ loading: true })
      }),
      switchMap(() =>
        this.service.fetchUsersAndRoles().pipe(
          tapResponse(
            (data) => {
              this.patchState({
                loading: false,
                users: data.users,
                roles: data.roles,
              })
              setTimeout(() => {
                this.selectUser(data.users[0])
              }, 200)
            },
            (error) => {
              this.patchState({
                loading: false,
              })
            },
          ),
        ),
      ),
    ),
  )

  saveRolesEffect = this.effect<void>(($) =>
    $.pipe(
      tap(() => {
        this.patchState({ loading: true })
      }),
      withLatestFrom(this.selectedUserId$, this.selectedRoleIds$, this.users$),
      switchMap(([_, selectedUserId, selectedRoleIds, users]) =>
        this.service.updateUserRoles(selectedUserId, selectedRoleIds).pipe(
          tapResponse(
            (data) => {
              this.toast.success('Successfully updated roles', { duration: 3000 })
              const selectedUser = users.find((user) => user.id === selectedUserId)
              selectedUser.userRoles = selectedRoleIds.map((roleId) => ({ id: '', roleId: roleId }))
              this.patchState({
                loading: false,
                originalRoleIds: selectedRoleIds,
              })
            },
            (error) => {
              this.toast.error('Failed to update roles', { duration: 3000 })
              this.patchState({
                loading: false,
              })
            },
          ),
        ),
      ),
    ),
  )


  readonly createUserEffect = this.effect<UserCreateUserInput>((input$) =>
    input$.pipe(
      tap(() => this.patchState({ loading: true })),
      switchMap((input) => {
        console.log("+++++++", input);
        return this.data.userCreateUser({ input }).pipe(
          tapResponse(
            (res) => {
              this.patchState({ item: res.data.created, errors: res.errors, loading: false })
              return this.router.navigate(['..'], {relativeTo: this.route})
            },
            (errors: any) =>
              this.patchState({
                loading: false,
                errors: errors.graphQLErrors ? errors.graphQLErrors : errors,
              }),
          ),
        )
            }
      ),
    ),
  )

}

