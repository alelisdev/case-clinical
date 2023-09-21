
import { Injectable } from '@angular/core'
import { Router, ActivatedRoute } from '@angular/router'
import { UserCreateUserFeaturePermissionInput, WebCoreDataAccessService, UserFeaturePermission, FeaturePermission,User } from '@case-clinical/web/core/data-access'
import { ComponentStore,tapResponse } from '@ngrx/component-store'
import { switchMap, tap, map } from 'rxjs/operators'

export interface UserFeaturePermissionCreateState {
  errors?: any
  loading?: boolean
  item?: UserFeaturePermission,
 featurePermissions?: FeaturePermission[],
 users?: User[]
  searchTerm?: string
}

@Injectable()
export class WebUserFeaturePermissionCreateStore extends ComponentStore<UserFeaturePermissionCreateState> {
  constructor(private readonly data: WebCoreDataAccessService, private readonly router: Router, private readonly route: ActivatedRoute ) {
    super({ loading: false })
  }

  readonly errors$ = this.select((s) => s.errors)
  readonly loading$ = this.select((s) => s.loading)
  readonly item$ = this.select((s) => s.item)
  readonly featurePermissions$ = this.select((s) => s.featurePermissions || [])
  readonly users$ = this.select((s) => s.users || [])
  readonly vm$ = this.select(this.errors$, this.loading$, this.item$, 
this.featurePermissions$,this.users$,
    (errors, loading, item, featurePermissions,users ) => ({
    errors,
    loading,
    item,
featurePermissions,users
  }),
{debounce: true})



  readonly filterFeaturePermissions = (term) => 
        this.data.userSelectFeaturePermissions({input: { name: term}}).pipe(
          tapResponse(
            (res: any) => {
              let featurePermissions = res.data.items;
              this.patchState({featurePermissions})
              return featurePermissions
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
        this.data.userUsers({input: { name: term}}).pipe(
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



  readonly addFeaturePermission = this.updater((state, featurePermission: FeaturePermission) => ({
    ...state, featurePermissions: state.featurePermissions.concat(featurePermission)
  }))


  readonly addUser = this.updater((state, user: User) => ({
    ...state, users: state.users.concat(user)
  }))

    

  readonly createUserFeaturePermissionEffect = this.effect<UserCreateUserFeaturePermissionInput>((input$) =>
    input$.pipe(
      tap(() => this.patchState({ loading: true })),
      switchMap((input) =>
        this.data.userCreateUserFeaturePermission({ input }).pipe(
          tapResponse(
            (res) => {
              this.patchState({ item: res.data.created, errors: res.errors, loading: false })
              return this.router.navigate(['..', res.data?.created?.id], {relativeTo: this.route})
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
}
