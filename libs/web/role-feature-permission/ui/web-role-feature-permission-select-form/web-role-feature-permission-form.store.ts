
import { Injectable } from '@angular/core'
import { WebCoreDataAccessService, RoleFeaturePermission, UserCreateRoleFeaturePermissionInput, FeaturePermission,Role } from '@case-clinical/web/core/data-access'
import { ComponentStore,tapResponse } from '@ngrx/component-store'
import { switchMap, tap, map } from 'rxjs/operators'

export interface RoleFeaturePermissionFormState {
  errors?: any
  loading?: boolean
  item?: RoleFeaturePermission,
 featurePermissions?: FeaturePermission[],
 roles?: Role[]
  searchTerm?: string
}

@Injectable()
export class WebRoleFeaturePermissionFormStore extends ComponentStore<RoleFeaturePermissionFormState> {
  constructor(private readonly data: WebCoreDataAccessService) {
    super({ loading: false })
  }

  readonly errors$ = this.select((s) => s.errors)
  readonly loading$ = this.select((s) => s.loading)
  readonly item$ = this.select((s) => s.item)
  readonly featurePermissions$ = this.select((s) => s.featurePermissions || [])
  readonly roles$ = this.select((s) => s.roles || [])
  readonly vm$ = this.select(this.errors$, this.loading$, this.item$, 
this.featurePermissions$,this.roles$,
    (errors, loading, item, featurePermissions,roles ) => ({
    errors,
    loading,
    item,
featurePermissions,roles
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


  readonly filterRoles = (term) => 
        this.data.userSelectRoles({input: { name: term}}).pipe(
          tapResponse(
            (res: any) => {
              let roles = res.data.items;
              this.patchState({roles})
              return roles
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



  readonly createRoleFeaturePermissionEffect = this.effect<UserCreateRoleFeaturePermissionInput>((input$) =>
    input$.pipe(
      tap(() => this.patchState({ loading: true })),
      switchMap((input) =>
        this.data.userCreateRoleFeaturePermission({ input }).pipe(
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


  readonly addFeaturePermission = this.updater((state, featurePermission: FeaturePermission) => ({
    ...state, featurePermissions: state.featurePermissions.concat(featurePermission)
  }))


  readonly addRole = this.updater((state, role: Role) => ({
    ...state, roles: state.roles.concat(role)
  }))

}
