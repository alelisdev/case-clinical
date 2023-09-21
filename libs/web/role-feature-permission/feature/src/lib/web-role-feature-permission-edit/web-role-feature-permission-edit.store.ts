
import { Injectable } from '@angular/core'
import { Router, ActivatedRoute } from '@angular/router'
import { UserUpdateRoleFeaturePermissionInput, WebCoreDataAccessService, RoleFeaturePermission, FeaturePermission,Role } from '@case-clinical/web/core/data-access'
import { ComponentStore,tapResponse } from '@ngrx/component-store'
import { switchMap, tap, map, withLatestFrom } from 'rxjs/operators'
import { WebUiToastService } from '@case-clinical/web/ui/toast'
import { FormService } from '@case-clinical/web/ui/form'
import { RoleFeaturePermissionService } from '@case-clinical/web/role-feature-permission/shared'

export interface RoleFeaturePermissionEditState {
  errors?: any
  loading?: boolean
  item?: RoleFeaturePermission,
 featurePermissions?: FeaturePermission[],
 roles?: Role[]
  searchTerm?: string
}

@Injectable()
export class WebRoleFeaturePermissionEditStore extends ComponentStore<RoleFeaturePermissionEditState> {
  constructor(
    private readonly data: WebCoreDataAccessService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly toast: WebUiToastService,
    private readonly formService: FormService,
    private readonly roleFeaturePermissionService: RoleFeaturePermissionService
) {
    super({ loading: false })
    
    this.loadRoleFeaturePermissionEffect(route.params.pipe(map((route) => route?.roleFeaturePermissionId)))
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



  readonly addFeaturePermission = this.updater((state, featurePermission: FeaturePermission) => ({
    ...state, featurePermissions: state.featurePermissions.concat(featurePermission)
  }))


  readonly addRole = this.updater((state, role: Role) => ({
    ...state, roles: state.roles.concat(role)
  }))

  
  readonly loadRoleFeaturePermissionEffect = this.effect<string>((roleFeaturePermissionId$) =>
     roleFeaturePermissionId$.pipe(
      tap(() => this.setState({loading: true })),
      switchMap((roleFeaturePermissionId) =>
        this.data.userRoleFeaturePermission({roleFeaturePermissionId}).pipe(
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

  readonly updateRoleFeaturePermissionEffect = this.effect<UserUpdateRoleFeaturePermissionInput>((input$) =>
    input$.pipe(
      tap(() => this.patchState({ loading: true })),
      withLatestFrom(this.item$),
      switchMap(([input, item]) =>
         this.roleFeaturePermissionService.updateRoleFeaturePermission(input, item?.id).pipe(
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
