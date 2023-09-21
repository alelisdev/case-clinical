
import { ComponentStore,tapResponse } from '@ngrx/component-store'
import { EMPTY } from 'rxjs'
import { FormService } from '@case-clinical/web/ui/form'
import { Injectable } from '@angular/core'
import { TeamRoleService } from './team-role.service'
import { Router, ActivatedRoute } from '@angular/router'
import { switchMap, tap, withLatestFrom, map, catchError } from 'rxjs/operators'
import { UserCreateTeamRoleInput, UserUpdateTeamRoleInput, WebCoreDataAccessService, CorePaging, TeamRole,  } from '@case-clinical/web/core/data-access'
import { WebUiToastService } from '@case-clinical/web/ui/toast'


export interface TeamRoleFeatureState {
  errors?: any
  loading?: boolean
  item?: TeamRole
  done: boolean,
  formName?: string

  teamRoles: TeamRole[]

  searchQuery?: string
  paging?: CorePaging
}

@Injectable()
export class WebTeamRoleFeatureStore extends ComponentStore<TeamRoleFeatureState> {
  constructor(
    private readonly data: WebCoreDataAccessService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly toast: WebUiToastService,
    private readonly formService: FormService,
    private readonly teamRoleService: TeamRoleService
) {
    super({ 
      loading: false,
      teamRoles: [],
      done: false,
      searchQuery: '',
      formName: undefined,

      paging: {
        limit: 10000,
        skip: 0,
      },
    })

    if (this.route.snapshot.paramMap.has('teamRoleId')) {
      var teamRoleId = this.route.snapshot.paramMap.get('teamRoleId')
      this.setFormName('teamRole_edit')
    } else {
      this.setFormName('teamRole_create')
    }




  }

  readonly errors$ = this.select((s) => s.errors)
  readonly loading$ = this.select((s) => s.loading)
  readonly done$ = this.select((s) => s.done)
  readonly item$ = this.select((s) => s.item)
  readonly teamRoles$ = this.select((s) => s.teamRoles)


  readonly paging$ = this.select((s) => s.paging)
  readonly searchQuery$ = this.select((s) => s.searchQuery)
  readonly formName$ = this.select((s) => s.formName)

  readonly actionResult$ = this.select(this.item$, this.done$,
    (item, done ) => ({item,done,
    }),
    {debounce: true })


  readonly vm$ = this.select(this.errors$, this.loading$, this.item$, this.formName$, this.teamRoles$,

    (errors, loading, item, formName, teamRoles,  ) => ({
    errors,
    loading,
    item,
    formName,
    teamRoles,

            
  }),
{debounce: true})

  readonly input$ = this.select(this.paging$,  this.searchQuery$, (paging, searchQuery) => ({
    limit: paging.limit,
    skip: paging.skip,
    name: searchQuery,
    
    total: paging.total
  }))

  readonly setFormName = this.updater((state, formName: string) => ({
    ...state,
    formName,
  }))







    

  readonly setItem = this.updater((state, item: TeamRole) => ({...state, item}))

  addNewTeamRole = this.updater((state, teamRole: TeamRole) => ({ ...state, teamRoles: [...state.teamRoles, teamRole] }))

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

  addTeamRoles = this.updater((state, newTeamRoles: any[]) => ({...state, teamRoles: state.teamRoles.concat(newTeamRoles) }))
  updateTeamRoles = this.updater((state, updatedTeamRoles: any[]) => {
    return {
      ...state,
      teamRoles: state.teamRoles.map((teamRole) => {
        const updated = updatedTeamRoles.find((el) => el.id === teamRole.id);
        return updated ? updated : teamRole;
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
        return this.teamRoleService.validateTeamRoleExcelData(excelData);
      })
    )
  }


  readonly loadTeamRoleEffect = this.effect<string>((teamRoleId$) =>
    teamRoleId$.pipe(
      tap(() => this.patchState({ loading: true })),
      switchMap((teamRoleId) =>
        this.data.userTeamRole({ teamRoleId }).pipe(
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



  readonly loadTeamRolesEffect = this.effect(($) =>
    $.pipe(
      tap(() => this.patchState({ loading: true })),
      withLatestFrom(this.input$),
      switchMap(([_, input]) =>
        this.data.userTeamRoles({input}).pipe(
          tapResponse(
            (res) =>
              this.patchState({
                paging: {limit: input.limit, skip: input.skip, total: res.data.count.total},
                teamRoles: res.data.items,
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

  readonly createTeamRoleEffect = this.effect<UserCreateTeamRoleInput>((input$) =>
    input$.pipe(
      tap(() => this.patchState({loading: true })),
      switchMap((input) =>
        this.teamRoleService.createTeamRole({...input }).pipe(
          tapResponse(
            (teamRole: TeamRole) => {
              this.addNewTeamRole(teamRole)
              this.toast.success('Created Successfully!');
              setTimeout(() => this.patchState({ item: teamRole, loading: false, done: true }), 300);
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

    readonly updateTeamRoleEffect = this.effect<UserUpdateTeamRoleInput>((input$) =>
        input$.pipe(
          tap(() => this.patchState({ loading: true })),
          withLatestFrom(this.item$),
          switchMap(([input, item]) =>
            this.teamRoleService.updateTeamRole(input, input.id).pipe(
              tapResponse(
                (teamRole) => {
                  this.updateTeamRole(teamRole)
                  this.toast.success('Updated Successfully!')
                  setTimeout(() => this.patchState({item: teamRole, loading: false, done: true }), 300);
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
  
    readonly deleteTeamRoleEffect = this.effect(
    ($) =>
      $.pipe(
        tap(() => this.patchState({ loading: true })),
        withLatestFrom(this.item$),
        switchMap(([_, teamRole]) => {
          return this.data.userDeleteTeamRole({teamRoleId: teamRole.id})
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

  readonly importExcelEffect = this.effect<UserUpdateTeamRoleInput[]>(($data) =>
    $data.pipe(
      tap(() => this.patchState({loading: true })),
      switchMap((data) => this.teamRoleService.importTeamRoles(data).pipe(
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

            this.addTeamRoles(created);
            this.updateTeamRoles(updated);

            this.toast.success(`${created.length} created, ${updated.length} updated, ${failed.length} failed of total ${total}`, { duration: 3000 })
          }
        )
      ))
    )
  )

}
