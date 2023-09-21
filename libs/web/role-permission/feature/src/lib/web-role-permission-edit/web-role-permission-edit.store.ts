
import { Injectable } from '@angular/core'
import { Router, ActivatedRoute } from '@angular/router'
import { UserUpdateRolePermissionInput, WebCoreDataAccessService, RolePermission, Permission } from '@case-clinical/web/core/data-access'
import { ComponentStore,tapResponse } from '@ngrx/component-store'
import { switchMap, tap, map, withLatestFrom } from 'rxjs/operators'
import { WebUiToastService } from '@case-clinical/web/ui/toast'
import { FormService } from '@case-clinical/web/ui/form'
import { RolePermissionService } from '@case-clinical/web/role-permission/shared'

export interface RolePermissionEditState {
  errors?: any
  loading?: boolean
  item?: RolePermission,
 permissions?: Permission[]
  searchTerm?: string
}

@Injectable()
export class WebRolePermissionEditStore extends ComponentStore<RolePermissionEditState> {
  constructor(
    private readonly data: WebCoreDataAccessService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly toast: WebUiToastService,
    private readonly formService: FormService,
    private readonly rolePermissionService: RolePermissionService
) {
    super({ loading: false })
    
    this.loadRolePermissionEffect(route.params.pipe(map((route) => route?.rolePermissionId)))
  }

  readonly errors$ = this.select((s) => s.errors)
  readonly loading$ = this.select((s) => s.loading)
  readonly item$ = this.select((s) => s.item)
  readonly permissions$ = this.select((s) => s.permissions || [])
  readonly vm$ = this.select(this.errors$, this.loading$, this.item$, 
this.permissions$,
    (errors, loading, item, permissions ) => ({
    errors,
    loading,
    item,
permissions
  }),
{debounce: true})



  readonly filterPermissions = (term) => 
        this.data.userSelectPermissions({input: { name: term}}).pipe(
          tapResponse(
            (res: any) => {
              let permissions = res.data.items;
              this.patchState({permissions})
              return permissions
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



  readonly addPermission = this.updater((state, permission: Permission) => ({
    ...state, permissions: state.permissions.concat(permission)
  }))

  
  readonly loadRolePermissionEffect = this.effect<string>((rolePermissionId$) =>
     rolePermissionId$.pipe(
      tap(() => this.setState({loading: true })),
      switchMap((rolePermissionId) =>
        this.data.userRolePermission({rolePermissionId}).pipe(
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

  readonly updateRolePermissionEffect = this.effect<UserUpdateRolePermissionInput>((input$) =>
    input$.pipe(
      tap(() => this.patchState({ loading: true })),
      withLatestFrom(this.item$),
      switchMap(([input, item]) =>
         this.rolePermissionService.updateRolePermission(input, item?.id).pipe(
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
