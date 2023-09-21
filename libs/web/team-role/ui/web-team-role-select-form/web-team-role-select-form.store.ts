
import { EventEmitter, Injectable } from '@angular/core'
import {
  WebCoreDataAccessService,
  UserCreateTeamRoleInput,
  UserUpdateTeamRoleInput,
  TeamRole,
} from '@case-clinical/web/core/data-access'
import { ComponentStore, tapResponse } from '@ngrx/component-store'
import { switchMap, tap, map } from 'rxjs/operators'

export interface TeamRoleFormState {
  errors?: any
  loading?: boolean
  searchTerm?: string
  teamRoles: TeamRole[]
}

@Injectable()
export class WebTeamRoleSelectFormStore extends ComponentStore<TeamRoleFormState> {
  constructor(private readonly data: WebCoreDataAccessService) {
    super({
      loading: false,
      teamRoles: [],
    })
  }

  readonly errors$ = this.select((s) => s.errors)
  readonly loading$ = this.select((s) => s.loading)
  readonly teamRoles$ = this.select((s) => s.teamRoles)

  readonly vm$ = this.select(
    this.errors$,
    this.loading$,
    this.teamRoles$,
    (errors, loading, teamRoles) => ({
      errors,
      loading,
      teamRoles
    }),
    { debounce: true },
  )

  addNewTeamRole = this.updater((state, teamRole: TeamRole) => ({ teamRoles: [...state.teamRoles, teamRole] }))

  updateTeamRole = this.updater((state, teamRole: TeamRole) => {
    return {
      ...state,
      teamRoles: state.teamRoles.map((el) => {
        if (el.id === teamRole.id) {
          return teamRole
        } else {
          return el
        }
      }),
    }
  })

  readonly createTeamRoleEffect = this.effect<{ input: UserCreateTeamRoleInput; resultEmitter: EventEmitter<any> }>(
    (data$) =>
      data$.pipe(
        tap(() => this.patchState({ loading: true })),
        switchMap((data) =>
          this.data.userCreateTeamRole({ input: data.input }).pipe(
            tapResponse(
              (res) => {
                this.addNewTeamRole(res.data.created)
                this.patchState({
                  errors: res.errors,
                  loading: false,
                })
                data.resultEmitter.emit(res.data.created)
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

  readonly updateTeamRoleEffect = this.effect<{ input: UserUpdateTeamRoleInput; resultEmitter: EventEmitter<any> }>(
    (data$) =>
      data$.pipe(
        tap(() => this.patchState({ loading: true })),
        switchMap((data) =>
          this.data.userUpdateTeamRole({ teamRoleId: data.input.id, input: data.input }).pipe(
            tapResponse(
              (res) => {
                this.updateTeamRole(res.data.updated)
                this.patchState({ errors: res.errors, loading: false })
                data.resultEmitter.emit(res.data.updated)
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

  loadTeamRolesEffect = this.effect<void>(($) =>
    $.pipe(
      tap(() => {
        this.patchState({ loading: true })
      }),
      switchMap(() =>
        this.data.userTeamRoles({ input: {} }).pipe(
          tapResponse(
            (data) => {
              this.patchState({
                loading: false,
                teamRoles: data.data.items,
              })
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
}

