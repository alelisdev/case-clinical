
import { ComponentStore,tapResponse } from '@ngrx/component-store'
import { EMPTY } from 'rxjs'
import { FormService } from '@case-clinical/web/ui/form'
import { Injectable } from '@angular/core'
import { TeamUserService } from './team-user.service'
import { Router, ActivatedRoute } from '@angular/router'
import { switchMap, tap, withLatestFrom, map, catchError } from 'rxjs/operators'
import { UserCreateTeamUserInput, UserUpdateTeamUserInput, WebCoreDataAccessService, CorePaging, TeamUser, Team,User,TeamRole } from '@case-clinical/web/core/data-access'
import { WebUiToastService } from '@case-clinical/web/ui/toast'


export interface TeamUserFeatureState {
  errors?: any
  loading?: boolean
  item?: TeamUser
  done: boolean,
  formName?: string
teamId?: string,userId?: string,teamRoleId?: string,
  teamUsers: TeamUser[]
 teams?: Team[],
 users?: User[],
 teamRoles?: TeamRole[]
  searchQuery?: string
  paging?: CorePaging
}

@Injectable()
export class WebTeamUserFeatureStore extends ComponentStore<TeamUserFeatureState> {
  constructor(
    private readonly data: WebCoreDataAccessService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly toast: WebUiToastService,
    private readonly formService: FormService,
    private readonly teamUserService: TeamUserService
) {
    super({ 
      loading: false,
      teamUsers: [],
      done: false,
      searchQuery: '',
      formName: undefined,
teamId: undefined,
userId: undefined,
teamRoleId: undefined,
      paging: {
        limit: 10000,
        skip: 0,
      },
    })

    if (this.route.snapshot.paramMap.has('teamUserId')) {
      var teamUserId = this.route.snapshot.paramMap.get('teamUserId')
      this.setFormName('teamUser_edit')
    } else {
      this.setFormName('teamUser_create')
    }


    if(this.route.snapshot.paramMap.has("teamId")) {
      var teamId = this.route.snapshot.paramMap.get("teamId")
      this.setTeamId(teamId)
    }


    if(this.route.snapshot.paramMap.has("userId")) {
      var userId = this.route.snapshot.paramMap.get("userId")
      this.setUserId(userId)
    }


    if(this.route.snapshot.paramMap.has("teamRoleId")) {
      var teamRoleId = this.route.snapshot.paramMap.get("teamRoleId")
      this.setTeamRoleId(teamRoleId)
    }



  }

  readonly errors$ = this.select((s) => s.errors)
  readonly loading$ = this.select((s) => s.loading)
  readonly done$ = this.select((s) => s.done)
  readonly item$ = this.select((s) => s.item)
  readonly teamUsers$ = this.select((s) => s.teamUsers)
  readonly teams$ = this.select((s) => s.teams || [])
  readonly users$ = this.select((s) => s.users || [])
  readonly teamRoles$ = this.select((s) => s.teamRoles || [])

readonly teamId$ = this.select((s) => s.teamId)

readonly userId$ = this.select((s) => s.userId)

readonly teamRoleId$ = this.select((s) => s.teamRoleId)

  readonly paging$ = this.select((s) => s.paging)
  readonly searchQuery$ = this.select((s) => s.searchQuery)
  readonly formName$ = this.select((s) => s.formName)

  readonly actionResult$ = this.select(this.item$, this.done$,
    (item, done ) => ({item,done,
    }),
    {debounce: true })


  readonly vm$ = this.select(this.errors$, this.loading$, this.item$, this.formName$, this.teamUsers$,
this.teams$,this.users$,this.teamRoles$,
    (errors, loading, item, formName, teamUsers, teams,users,teamRoles ) => ({
    errors,
    loading,
    item,
    formName,
    teamUsers,

            teams,users,teamRoles
  }),
{debounce: true})

  readonly input$ = this.select(this.paging$, this.teamId$,
this.userId$,
this.teamRoleId$, this.searchQuery$, (paging, teamId,
userId,
teamRoleId,searchQuery) => ({
    limit: paging.limit,
    skip: paging.skip,
    name: searchQuery,
    teamId: teamId,userId: userId,teamRoleId: teamRoleId,
    total: paging.total
  }))

  readonly setFormName = this.updater((state, formName: string) => ({
    ...state,
    formName,
  }))



            readonly setTeamId = this.updater((state, teamId: string) => ({
                ...state,
    teamId,
  }))


            readonly setUserId = this.updater((state, userId: string) => ({
                ...state,
    userId,
  }))


            readonly setTeamRoleId = this.updater((state, teamRoleId: string) => ({
                ...state,
    teamRoleId,
  }))



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

    

  readonly setItem = this.updater((state, item: TeamUser) => ({...state, item}))

  addNewTeamUser = this.updater((state, teamUser: TeamUser) => ({ ...state, teamUsers: [...state.teamUsers, teamUser] }))

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

  addTeamUsers = this.updater((state, newTeamUsers: any[]) => ({...state, teamUsers: state.teamUsers.concat(newTeamUsers) }))
  updateTeamUsers = this.updater((state, updatedTeamUsers: any[]) => {
    return {
      ...state,
      teamUsers: state.teamUsers.map((teamUser) => {
        const updated = updatedTeamUsers.find((el) => el.id === teamUser.id);
        return updated ? updated : teamUser;
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
        return this.teamUserService.validateTeamUserExcelData(excelData, vm.teams,vm.users,vm.teamRoles);
      })
    )
  }


  readonly loadTeamUserEffect = this.effect<string>((teamUserId$) =>
    teamUserId$.pipe(
      tap(() => this.patchState({ loading: true })),
      switchMap((teamUserId) =>
        this.data.userTeamUser({ teamUserId }).pipe(
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



  readonly loadTeamUsersEffect = this.effect(($) =>
    $.pipe(
      tap(() => this.patchState({ loading: true })),
      withLatestFrom(this.input$),
      switchMap(([_, input]) =>
        this.data.userTeamUsers({input}).pipe(
          tapResponse(
            (res) =>
              this.patchState({
                paging: {limit: input.limit, skip: input.skip, total: res.data.count.total},
                teamUsers: res.data.items,
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

  readonly createTeamUserEffect = this.effect<UserCreateTeamUserInput>((input$) =>
    input$.pipe(
      tap(() => this.patchState({loading: true })),
      switchMap((input) =>
        this.teamUserService.createTeamUser({...input }).pipe(
          tapResponse(
            (teamUser: TeamUser) => {
              this.addNewTeamUser(teamUser)
              this.toast.success('Created Successfully!');
              setTimeout(() => this.patchState({ item: teamUser, loading: false, done: true }), 300);
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

    readonly updateTeamUserEffect = this.effect<UserUpdateTeamUserInput>((input$) =>
        input$.pipe(
          tap(() => this.patchState({ loading: true })),
          withLatestFrom(this.item$),
          switchMap(([input, item]) =>
            this.teamUserService.updateTeamUser(input, input.id).pipe(
              tapResponse(
                (teamUser) => {
                  this.updateTeamUser(teamUser)
                  this.toast.success('Updated Successfully!')
                  setTimeout(() => this.patchState({item: teamUser, loading: false, done: true }), 300);
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
  
    readonly deleteTeamUserEffect = this.effect(
    ($) =>
      $.pipe(
        tap(() => this.patchState({ loading: true })),
        withLatestFrom(this.item$),
        switchMap(([_, teamUser]) => {
          return this.data.userDeleteTeamUser({teamUserId: teamUser.id})
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

  readonly importExcelEffect = this.effect<UserUpdateTeamUserInput[]>(($data) =>
    $data.pipe(
      tap(() => this.patchState({loading: true })),
      switchMap((data) => this.teamUserService.importTeamUsers(data).pipe(
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

            this.addTeamUsers(created);
            this.updateTeamUsers(updated);

            this.toast.success(`${created.length} created, ${updated.length} updated, ${failed.length} failed of total ${total}`, { duration: 3000 })
          }
        )
      ))
    )
  )

}
