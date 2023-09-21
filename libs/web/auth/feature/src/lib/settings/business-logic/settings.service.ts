import { Inject, Injectable, Optional } from "@angular/core";
import { LoggingService } from "@schema-driven/logging";
import { Observable, of, switchMap } from "rxjs";
import { ServiceBase, ServiceContext } from "@schema-driven/foundation";
import { SettingsBusinessProviderService } from "./settings.business-provider.service";
import { UserListSettingInput } from '@case-clinical/web/core/data-access';
import {
  BillingInfo,
  Feature,
  Permission,
  Plan,
  Price,
  PriceSubscription,
  Role,
  RoleFeaturePermission,
  Tenant,
  User,
  AdminUpdateTenantInput,
  NovuNotification,
  AdminListRoleNavigationInput,
  RoleNavigation,
  AccountUpdatePasswordInput,
  AdminUpdateRoleNavigationInput,
  UserCreateSettingInput,
  UserUpdateSettingInput
} from '@case-clinical/web/core/data-access'

@Injectable({
  providedIn: 'root',
})
export class SettingsService extends ServiceBase {
  /**
   * Constructor
   */
  constructor(
    @Inject(SettingsBusinessProviderService)
    @Optional() serviceContext: ServiceContext,
    private businessProvider: SettingsBusinessProviderService,
    loggingService: LoggingService,
   ) {
      super("SettingsService", loggingService, serviceContext);
  }

  accountProfile(): Observable<User> {
    return this.businessProvider.data.accountProfile().pipe(
      switchMap((response) => of(response.data.accountProfile))
    )
  }

  loadPlans(): Observable<Plan[]> {
    return this.businessProvider.data.userPlans({ input: {} }).pipe(
      switchMap((response) => of(response.data.plans))
    )
  }

  loadBillingInfo(): Observable<BillingInfo> {
    return this.businessProvider.data.userBillingInfo({ userId: "" }).pipe(
      switchMap((response) => of(response.data.billingInfo))
    )
  }

  updatePlan(planId: string) {
    return this.businessProvider.updatePlan(planId)
  }

  updateBillingInfo(input: any): Observable<BillingInfo> {
    return this.businessProvider.updateBillingInfo(input);
  }

  createBillingInfo(input: any): Observable<BillingInfo> {
    return this.businessProvider.createBillingInfo(input);
  }

  getPrices(): Observable<Price[]> {
    return this.businessProvider.data.listPrices({ input: {} }).pipe(
      switchMap((response: any) => {
        console.log(response)
        return of(response.data.prices)
      })
    )
  }

  getSubscriptions(): Observable<PriceSubscription[]> {
    return this.businessProvider.data.listSubscriptions({ input: {} }).pipe(
      switchMap((response) => of(response.data.subscriptions))
    )
  }

  subscribePrice(priceId: string) {
    return this.businessProvider.data.subscribe({ priceId }).pipe(
      switchMap((response) => of(response.data.result.status))
    )
  }

  cancelSubscribe(subscriptionId: string) {
    return this.businessProvider.data.cancelSubcribe({ subscriptionId }).pipe(
      switchMap((response) => of(response.data.result.status))
    )
  }

  loadBasicData(): Observable<{roles: Role[], features: Feature[], permissions: Permission[]}> {
    return this.businessProvider.loadBasicData();
  }

  loadRoleFeaturePermissions(roleId: string): Observable<RoleFeaturePermission[]> {
    return this.businessProvider.loadRoleFeaturePermissions(roleId);
  }

  updateRoleFeaturePermissions(roleId: string, originalRoleFeaturePermissionIds: string[], newRoleFeaturePermissionIds: string[], featureIds: string[]) {
    return this.businessProvider.updateRoleFeaturePermissions(roleId, originalRoleFeaturePermissionIds, newRoleFeaturePermissionIds, featureIds);
  }

  fetchUsersAndRoles(): Observable<{ users: User[], roles: Role[] }> {
    return this.businessProvider.fetchUsersAndRoles();
  }

  updateUserRoles(userId: string, roleIds: string[]) {
    return this.businessProvider.updateUserRoles(userId, roleIds);
  }

  loadTenants(): Observable<Tenant[]> {
    return this.businessProvider.loadTenants();
  }

  updateTenant(tenantId: string, avatar: File, input: AdminUpdateTenantInput): Observable<Tenant> {
    return this.businessProvider.updateTenant(tenantId, avatar, input);
  }

  updateAccount(input: any): Observable<boolean> {
    return this.businessProvider.updateAccount(input);
  }

  loadNovuNotifications(): Observable<NovuNotification[]> {
    return this.businessProvider.loadNovuNotifications();
  }

  subscribeNotification(notificationId: string): Observable<boolean> {
    return this.businessProvider.subscribeNotification(notificationId);
  }

  unsubscribeNotification(notificationId: string): Observable<boolean> {
    return this.businessProvider.unsubscribeNotification(notificationId);
  }

  loadRoleNaviations(input: AdminListRoleNavigationInput): Observable<RoleNavigation[]> {
    return this.businessProvider.loadRoleNavigations(input);
  }

  loadRoles() {
    return this.businessProvider.data.adminRoles({}).pipe(
      switchMap(res => of(res.data.items))
    )
  }

  updateRoleNavigation(roleNavigationId: string, input: AdminUpdateRoleNavigationInput): Observable<RoleNavigation> {
    return this.businessProvider.updateRoleNavigation(roleNavigationId, input);
  }

  updatePassword(input: AccountUpdatePasswordInput): Observable<boolean> {
    return this.businessProvider.updatePassword(input);
  }
}
