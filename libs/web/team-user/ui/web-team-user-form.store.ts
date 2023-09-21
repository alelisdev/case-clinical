
import { Injectable } from '@angular/core'
import { WebCoreDataAccessService, TeamUser, UserCreateTeamUserInput, TeamRole } from '@case-clinical/web/core/data-access'
import { ComponentStore,tapResponse } from '@ngrx/component-store'
import { switchMap, tap, map } from 'rxjs/operators'

export interface TeamUserFormState {
  errors?: any
  loading?: boolean
  item?: TeamUser,
 teamRoles?: TeamRole[]
  searchTerm?: string
}

@Injectable()
export class WebTeamUserFormStore extends ComponentStore<TeamUserFormState> {
  constructor(private readonly data: WebCoreDataAccessService) {
    super({ loading: false })
  }

  readonly errors$ = this.select((s) => s.errors)
  readonly loading$ = this.select((s) => s.loading)
  readonly item$ = this.select((s) => s.item)
  readonly teamRoles$ = this.select((s) => s.teamRoles || [])
  readonly vm$ = this.select(this.errors$, this.loading$, this.item$, 
this.teamRoles$,
    (errors, loading, item, teamRoles ) => ({
    errors,
    loading,
    item,
teamRoles
  }),
{debounce: true})



  readonly filterTeamRoles = (term) => 
        this.data.userSelectTeamRoles({input: { name: term}}).pipe(
          tapResponse(
            (res: any) => {
              let teamRoles = res.data.items;
              this.patchState({teamRoles})
              return teamRoles
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



  readonly createTeamUserEffect = this.effect<UserCreateTeamUserInput>((input$) =>
    input$.pipe(
      tap(() => this.patchState({ loading: true })),
      switchMap((input) =>
        this.data.userCreateTeamUser({ input }).pipe(
          tapResponse(
            (res) => {
              this.patchState({ item: res.data.created, errors: res.errors, loading: false })
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


  readonly addTeamRole = this.updater((state, teamRole: TeamRole) => ({
    ...state, teamRoles: state.teamRoles.concat(teamRole)
  }))

}
