
import { EventEmitter, Injectable } from '@angular/core'
import {
  WebCoreDataAccessService,
  UserCreateTeamUserInput,
  UserUpdateTeamUserInput,
  TeamUser,
} from '@case-clinical/web/core/data-access'
import { ComponentStore, tapResponse } from '@ngrx/component-store'
import { switchMap, tap, map } from 'rxjs/operators'

export interface TeamUserFormState {
  errors?: any
  loading?: boolean
  searchTerm?: string
  teamUsers: TeamUser[]
}

@Injectable()
export class WebTeamUserSelectFormStore extends ComponentStore<TeamUserFormState> {
  constructor(private readonly data: WebCoreDataAccessService) {
    super({
      loading: false,
      teamUsers: [],
    })
  }

  readonly errors$ = this.select((s) => s.errors)
  readonly loading$ = this.select((s) => s.loading)
  readonly teamUsers$ = this.select((s) => s.teamUsers)

  readonly vm$ = this.select(
    this.errors$,
    this.loading$,
    this.teamUsers$,
    (errors, loading, teamUsers) => ({
      errors,
      loading,
      teamUsers
    }),
    { debounce: true },
  )

  addNewTeamUser = this.updater((state, teamUser: TeamUser) => ({ teamUsers: [...state.teamUsers, teamUser] }))

  updateTeamUser = this.updater((state, teamUser: TeamUser) => {
    return {
      ...state,
      teamUsers: state.teamUsers.map((el) => {
        if (el.id === teamUser.id) {
          return teamUser
        } else {
          return el
        }
      }),
    }
  })

  readonly createTeamUserEffect = this.effect<{ input: UserCreateTeamUserInput; resultEmitter: EventEmitter<any> }>(
    (data$) =>
      data$.pipe(
        tap(() => this.patchState({ loading: true })),
        switchMap((data) =>
          this.data.userCreateTeamUser({ input: data.input }).pipe(
            tapResponse(
              (res) => {
                this.addNewTeamUser(res.data.created)
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

  readonly updateTeamUserEffect = this.effect<{ input: UserUpdateTeamUserInput; resultEmitter: EventEmitter<any> }>(
    (data$) =>
      data$.pipe(
        tap(() => this.patchState({ loading: true })),
        switchMap((data) =>
          this.data.userUpdateTeamUser({ teamUserId: data.input.id, input: data.input }).pipe(
            tapResponse(
              (res) => {
                this.updateTeamUser(res.data.updated)
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

  loadTeamUsersEffect = this.effect<void>(($) =>
    $.pipe(
      tap(() => {
        this.patchState({ loading: true })
      }),
      switchMap(() =>
        this.data.userTeamUsers({ input: {} }).pipe(
          tapResponse(
            (data) => {
              this.patchState({
                loading: false,
                teamUsers: data.data.items,
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

