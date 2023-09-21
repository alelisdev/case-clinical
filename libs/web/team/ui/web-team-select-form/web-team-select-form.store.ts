
import { EventEmitter, Injectable } from '@angular/core'
import {
  WebCoreDataAccessService,
  UserCreateTeamInput,
  UserUpdateTeamInput,
  Team,
} from '@case-clinical/web/core/data-access'
import { ComponentStore, tapResponse } from '@ngrx/component-store'
import { switchMap, tap, map } from 'rxjs/operators'

export interface TeamFormState {
  errors?: any
  loading?: boolean
  searchTerm?: string
  teams: Team[]
}

@Injectable()
export class WebTeamSelectFormStore extends ComponentStore<TeamFormState> {
  constructor(private readonly data: WebCoreDataAccessService) {
    super({
      loading: false,
      teams: [],
    })
  }

  readonly errors$ = this.select((s) => s.errors)
  readonly loading$ = this.select((s) => s.loading)
  readonly teams$ = this.select((s) => s.teams)

  readonly vm$ = this.select(
    this.errors$,
    this.loading$,
    this.teams$,
    (errors, loading, teams) => ({
      errors,
      loading,
      teams
    }),
    { debounce: true },
  )

  addNewTeam = this.updater((state, team: Team) => ({ teams: [...state.teams, team] }))

  updateTeam = this.updater((state, team: Team) => {
    return {
      ...state,
      teams: state.teams.map((el) => {
        if (el.id === team.id) {
          return team
        } else {
          return el
        }
      }),
    }
  })

  readonly createTeamEffect = this.effect<{ input: UserCreateTeamInput; resultEmitter: EventEmitter<any> }>(
    (data$) =>
      data$.pipe(
        tap(() => this.patchState({ loading: true })),
        switchMap((data) =>
          this.data.userCreateTeam({ input: data.input }).pipe(
            tapResponse(
              (res) => {
                this.addNewTeam(res.data.created)
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

  readonly updateTeamEffect = this.effect<{ input: UserUpdateTeamInput; resultEmitter: EventEmitter<any> }>(
    (data$) =>
      data$.pipe(
        tap(() => this.patchState({ loading: true })),
        switchMap((data) =>
          this.data.userUpdateTeam({ teamId: data.input.id, input: data.input }).pipe(
            tapResponse(
              (res) => {
                this.updateTeam(res.data.updated)
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

  loadTeamsEffect = this.effect<void>(($) =>
    $.pipe(
      tap(() => {
        this.patchState({ loading: true })
      }),
      switchMap(() =>
        this.data.userTeams({ input: {} }).pipe(
          tapResponse(
            (data) => {
              this.patchState({
                loading: false,
                teams: data.data.items,
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

