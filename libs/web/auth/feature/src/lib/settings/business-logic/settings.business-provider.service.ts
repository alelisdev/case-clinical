import { HttpClient } from '@angular/common/http';
import { switchMap } from 'rxjs/operators';
import { Injectable } from '@angular/core'
import { LoggingService } from '@schema-driven/logging'
import { Observable, of } from 'rxjs'
import { ServiceBase, ServiceContext } from '@schema-driven/foundation'
import { AcademyCategory, Feature, NovuNotification, UserUpdateSettingInput } from '@case-clinical/web/core/data-access'
import { WebCoreDataAccessService, Tenant, RoleFeaturePermission, User, Setting } from '@case-clinical/web/core/data-access'
import { UpdatePlanAction } from './actions/update-plan.action'
import {
  Permission,
  BillingInfo,
  Role,
  AdminUpdateTenantInput,
  AdminListRoleNavigationInput,
  RoleNavigation,
  AccountUpdatePasswordInput,
  AdminUpdateRoleNavigationInput,
  UserCreateSettingInput,
} from '@case-clinical/web/core/data-access'
import { UpdateBillingAction } from './actions/update-billing.action'
import { CreateBillingAction } from './actions/create-billing-action'
import { UpdateRoleFeaturePermissionsAction } from './actions/update-role-feature-permissions.action';
import { UpdateTenantAction } from './actions/update-tenant.action';
import { UpdateAccountAction } from './actions/update-account-action';
import { UpdatePasswordAction } from './actions/update-password-action';
import { UserListSettingInput } from '@case-clinical/web/core/data-access';
@Injectable({
  providedIn: 'root',
})
export class SettingsBusinessProviderService extends ServiceBase {
  constructor(
    logger: LoggingService,
    public data: WebCoreDataAccessService,
    serviceContext: ServiceContext,
    public http: HttpClient,
  ) {
    super('NotificationService.SettingsBusinessProviderService', logger, serviceContext)
  }

  updatePlan(planId: string): Observable<AcademyCategory> {
    const action = new UpdatePlanAction(planId)
    action.Do(this)
    return action.response;
  }

  updateBillingInfo(input: any): Observable<BillingInfo> {
    const action = new UpdateBillingAction(input)
    action.Do(this)
    return action.response
  }

  createBillingInfo(input: any): Observable<BillingInfo> {
    const action = new CreateBillingAction(input)
    action.Do(this)
    return action.response
  }

  loadBasicData(): Observable<{roles: Role[], features: Feature[], permissions: Permission[]}> {
    return this.data.loadBasicData({ roleInput: {}, featureInput: {}, permissionInput: {} }).pipe(
      switchMap((response) => of({ roles: response.data.roles, features: response.data.features, permissions: response.data.permissions}))
    )
  }

  loadRoleFeaturePermissions(roleId: string): Observable<RoleFeaturePermission[]> {
    return this.data.adminRoleFeaturePermissions({ input: { roleId: roleId } }).pipe(
      switchMap((response) => of(response.data.items))
    )
  }


  updateRoleFeaturePermissions(roleId: string, originalRoleFeaturePermissionIds: string[], newRoleFeaturePermissionIds: string[], featureIds: string[]) {
    const action = new UpdateRoleFeaturePermissionsAction(roleId, originalRoleFeaturePermissionIds, newRoleFeaturePermissionIds, featureIds);
    action.Do(this)
    return action.response
  }

  fetchUsersAndRoles(): Observable<{ users: User[], roles: Role[] }> {
    return this.data.fetchUsersAndRoles({ userInput: {}, roleInput: {} }).pipe(
      switchMap((response) => of({ users: response.data.users, roles: response.data.roles }))
    )
  }

  updateUserRoles(userId: string, roleIds: string[]) {
    return this.data.adminUpdateUserRoles({ userId, input: { roleIds } }).pipe(
      switchMap((response) => of(response.data.result))
    )
  }



  loadTenants(): Observable<Tenant[]> {
    this.data
    return this.data.adminTenants({ input: {} }).pipe(
      switchMap((response) => of(response.data.items))
    )
  }


  updatePassword(input: AccountUpdatePasswordInput): Observable<boolean> {
    const action = new UpdatePasswordAction(input);
    action.Do(this)
    return action.response
  }

  updateTenant(tenantId: string, avatar: File, input: AdminUpdateTenantInput): Observable<Tenant> {
    const action = new UpdateTenantAction(tenantId, avatar, input)
    action.Do(this)
    return action.response
  }

  updateAccount(input: any): Observable<boolean> {
    const action = new UpdateAccountAction(input)
    action.Do(this)
    return action.response
  }

  loadNovuNotifications(): Observable<NovuNotification[]> {
    return this.data.userNovuNotifications().pipe(
      switchMap(resp => of(resp.data.notifications))
    )
  }

  subscribeNotification(notificationId: string): Observable<boolean> {
    return this.data.subscribeNovuNotification({notificationId}).pipe(
      switchMap(resp => of(true))
    )
  }

  unsubscribeNotification(notificationId: string): Observable<boolean> {
    return this.data.unsubscribeNovuNotification({notificationId}).pipe(
      switchMap(resp => of(true))
    )
  }

  loadRoleNavigations(input: AdminListRoleNavigationInput): Observable<RoleNavigation[]> {
    return this.data.adminRoleNavigations({ input }).pipe(
      switchMap(response => of(response.data.roleNavigations))
    )
  }

  updateRoleNavigation(roleNavigationId: string, input: AdminUpdateRoleNavigationInput): Observable<RoleNavigation> {
    return this.data.adminUpdateRoleNavigation({ id: roleNavigationId, input}).pipe(
      switchMap(response => of(response.data.updated))
    )
  }
}
