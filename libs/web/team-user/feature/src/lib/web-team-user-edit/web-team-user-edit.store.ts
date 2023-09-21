
import { Injectable } from '@angular/core'
import { Router, ActivatedRoute } from '@angular/router'
import { UserUpdateTeamUserInput, WebCoreDataAccessService, TeamUser, Team,User,TeamRole } from '@case-clinical/web/core/data-access'
import { ComponentStore,tapResponse } from '@ngrx/component-store'
import { switchMap, tap, map, withLatestFrom } from 'rxjs/operators'
import { WebUiToastService } from '@case-clinical/web/ui/toast'
import { FormService } from '@case-clinical/web/ui/form'
import { TeamUserService } from '@case-clinical/web/team-user/shared'

export interface TeamUserEditState {
  errors?: any
  loading?: boolean
  item?: TeamUser,
 teams?: Team[],
 users?: User[],
 teamRoles?: TeamRole[]
  searchTerm?: string
}

@Injectable()
export class WebTeamUserEditStore extends ComponentStore<TeamUserEditState> {
  constructor(
    private readonly data: WebCoreDataAccessService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly toast: WebUiToastService,
    private readonly formService: FormService,
    private readonly teamUserService: TeamUserService
) {
    super({ loading: false })
    
    this.loadTeamUserEffect(route.params.pipe(map((route) => route?.teamUserId)))
  }

  readonly errors$ = this.select((s) => s.errors)
  readonly loading$ = this.select((s) => s.loading)
  readonly item$ = this.select((s) => s.item)
  readonly teams$ = this.select((s) => s.teams || [])
  readonly users$ = this.select((s) => s.users || [])
  readonly teamRoles$ = this.select((s) => s.teamRoles || [])
  readonly vm$ = this.select(this.errors$, this.loading$, this.item$, 
this.teams$,this.users$,this.teamRoles$,
    (errors, loading, item, teams,users,teamRoles ) => ({
    errors,
    loading,
    item,
teams,users,teamRoles
  }),
{debounce: true})



  readonly filterTeams = (term) => 
        this.data.userSelectTeams({input: { name: term}}).pipe(
          tapResponse(
            (res: any) => {
              let teams = res.data.items;
              this.patchState({teams})
              return teams
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



  readonly addTeam = this.updater((state, team: Team) => ({
    ...state, teams: state.teams.concat(team)
  }))


  readonly addUser = this.updater((state, user: User) => ({
    ...state, users: state.users.concat(user)
  }))


  readonly addTeamRole = this.updater((state, teamRole: TeamRole) => ({
    ...state, teamRoles: state.teamRoles.concat(teamRole)
  }))

  
  readonly loadTeamUserEffect = this.effect<string>((teamUserId$) =>
     teamUserId$.pipe(
      tap(() => this.setState({loading: true })),
      switchMap((teamUserId) =>
        this.data.userTeamUser({teamUserId}).pipe(
          tapResponse(
            (res) => {
              this.patchState({ item: res.data.item, errors: res.errors, loading: false })
            },
            (errors: any) =>
              this.patchState({loading: false,
                errors: errors.graphQLErrors ? errors.graphQLErrors : errors,
              }),
          ),
        ),
      ),
    ),
  )

  readonly updateTeamUserEffect = this.effect<UserUpdateTeamUserInput>((input$) =>
    input$.pipe(
      tap(() => this.patchState({ loading: true })),
      withLatestFrom(this.item$),
      switchMap(([input, item]) =>
         this.teamUserService.updateTeamUser(input, item?.id).pipe(
          tapResponse(
            (response: any) => {
              this.toast.success('Changed Successfully')
              this.router.navigate(['..'], { relativeTo: this.route })
            },
            (errors: any) => {
              this.toast.error(errors.Message)
              this.formService.setErrors(errors.Data)
              this.patchState({
                loading: false,
                errors: errors.graphQLErrors ? errors.graphQLErrors : errors,
              })
            }
          ),
        ),
      ),
    ),
  )
}
