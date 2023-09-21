
import { Injectable } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { UserUpdateUserFeaturePermissionInput, WebCoreDataAccessService, UserFeaturePermission, FeaturePermission,User } from '@case-clinical/web/core/data-access'
import { ComponentStore, tapResponse } from '@ngrx/component-store'
import { switchMap, tap, withLatestFrom, pluck, map } from 'rxjs/operators'

export interface UserFeaturePermissionUpdateState {
  errors ?: any
  loading?: boolean
  item?: UserFeaturePermission,
 featurePermissions?: FeaturePermission[],
 users?: User[]
  searchTerm?: string
}

@Injectable()
export class WebUserFeaturePermissionEditStore extends ComponentStore<UserFeaturePermissionUpdateState> {
  constructor(private readonly data: WebCoreDataAccessService, private readonly router: Router, private readonly route: ActivatedRoute) {
    super({ loading: false })

    this.loadUserFeaturePermissionEffect(route.params.pipe(pluck('userFeaturePermissionId')))
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
        this.data.userFeaturePermissions({input: { name: term}}).pipe(
          tapResponse(
            (res: any) => {
              let featurePermissions = res.data.items;
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


readonly loadUserFeaturePermissionEffect = this.effect<string>((userFeaturePermissionId$) =>
    userFeaturePermissionId$.pipe(
      tap(() => this.setState({ loading: true })),
      switchMap((userFeaturePermissionId) =>
        this.data.userUserFeaturePermission({ userFeaturePermissionId }).pipe(
          tapResponse(
            (res) => this.patchState({ item: res.data.item, errors: res.errors, loading: false }),
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

  readonly updateUserFeaturePermissionEffect = this.effect<UserUpdateUserFeaturePermissionInput>((input$) =>
    input$.pipe(
      tap(() => this.patchState({ loading: true })),
      withLatestFrom(this.item$),
      switchMap(([input, item]) =>
        this.data.userUpdateUserFeaturePermission({ input, userFeaturePermissionId: item.id }).pipe(
          tapResponse(
            (res) => {
              this.patchState({ item: res.data.updated, errors: res.errors, loading: false })
              return this.router.navigate(['..'],{relativeTo: this.route})
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

