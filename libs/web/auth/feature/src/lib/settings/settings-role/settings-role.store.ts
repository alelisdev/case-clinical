import { AdminUpdateRoleNavigationInput } from './../../../../../../../api/concrete/navigation/data-access/src/lib/dto/admin-update-role-navigation.input';
import { FuseLoadingService } from '@fuse/services/loading/loading.service';
import { Role, Feature, RoleNavigation } from '@case-clinical/web/core/data-access';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { FormService } from '@case-clinical/web/ui/form';
import { Injectable } from "@angular/core";
import { SettingsService } from '../business-logic/settings.service';
import { switchMap, tap, EMPTY, withLatestFrom } from 'rxjs';
import { WebUiToastService } from '@case-clinical/web/ui/toast';

export interface SettingsRoleState {
  loading: boolean,
  query: string,
  roles: Role[],
  selectedRoleId: string,
  features: Feature[],

  featureIds: string[],
  roleFeaturePermissionIds: string[],
  refreshTable: boolean,
  selectedPermissionIds: string[],

  roleNavigations: RoleNavigation[]
}

@Injectable()
export class SettingsRoleStore extends ComponentStore<SettingsRoleState> {

  constructor(private formService: FormService, private loading: FuseLoadingService, private toast: WebUiToastService, private service: SettingsService) {
    super({
      query: "",
      loading: false,
      selectedRoleId: "",
      features: [],
      roles: [],
      featureIds: [],
      refreshTable: false,
      roleFeaturePermissionIds: [],
      selectedPermissionIds: [],
      roleNavigations: []
    })
  }

  /** Feature permission table data **/
  private readonly feautres$ = this.select(s => s.features)
  private readonly roleFeatures$ = this.select(
    this.feautres$,
    (features) => {
      const data = [];
      console.log(features)
      features.map((feature) => {
        feature.featurePermissions.map((fp) => {
          data.push({
            featureId: feature.id,
            feature: feature.name,
            permission: fp.name.split('.')[1],
            id: fp.id,
          })
        })
      }, { debounce: true })
      return data;
    }
  )
  /** Feature permission table data **/

  roleNavigations$ = this.select(s => s.roleNavigations)
  /** Table Indexes to be selected */
  private readonly refreshTable$ = this.select(s => s.refreshTable)
  private readonly selectedPermissionIds$ = this.select(s => s.selectedPermissionIds)
  public readonly refreshTableData$ = this.select(
    this.refreshTable$,
    this.selectedPermissionIds$,
    (
      refreshTable,
      selectedPermissionIds,
    ) => ({
      refreshTable,
      selectedPermissionIds,
    }),
    { debounce: true }
  )
  /** Table Indexes to be selected */


  /** Data that shows whether the original permissions are changed or not **/
  private readonly roleFeaturePermissionIds$ = this.select(s => s.roleFeaturePermissionIds)

  private readonly canSave$ = this.select(
    this.refreshTable$,
    this.roleFeaturePermissionIds$,
    this.selectedPermissionIds$,
    (
      refreshTable,
      roleFeaturePermissionIds,
      selectedPermissionIds
    ) => {
      let canSave = false;
      // If two lengths are different, then it tells that somethings has changed
      if (selectedPermissionIds.length !== roleFeaturePermissionIds.length) {
        return true;
      }

      const length = roleFeaturePermissionIds.length;
      const a = [...Array(length).keys()]   // roleFeaturePermissionIds
      const b = [...Array(length).keys()]   // selectedPermissionIds

      // Check whether there are some change
      while (a.length) {
        const srcIndex = a.shift();
        const targetIndex = selectedPermissionIds.findIndex(el => el === roleFeaturePermissionIds[srcIndex])
        if (targetIndex === -1) {
          return true;
        } else {
          const realTargetIndex = b.findIndex((el) => el === targetIndex)
          b.splice(realTargetIndex, 1)
        }
      }
      if (a.length !== b.length) {
        canSave = true;
      }

      return canSave;
    }, { debounce: true })
  /** Data that shows whether the original permissions are changed or not **/

  selectedFeatureIds$ = this.select(s => s.featureIds)
  roles$ = this.select(s => s.roles)
  loading$ = this.select(s => s.loading)
  selectedRoleId$ = this.select(s => s.selectedRoleId)
  vm$ = this.select(
    this.loading$,
    this.roleFeatures$,
    this.selectedRoleId$,
    this.roles$,
    this.canSave$,
    this.roleNavigations$,
    (
      loading,
      roleFeatures,
      selectedRoleId,
      roles,
      canSave,
      roleNavigations,
    ) => ({
      loading,
      roleFeatures,
      selectedRoleId,
      roles,
      canSave,
      roleNavigations,
    })
  )

  setSelectedPermissions = this.updater((state, permissionIds: string[]) => ({ ...state, refreshTable: false, selectedPermissionIds: permissionIds }))
  setSelectedFeatureIds = this.updater((state, featureIds: string[]) => ({ ...state, refreshTable: false, featureIds: featureIds }))

  setOriginPermissions = this.updater((state) => ({ ...state, refreshTable: true, selectedPermissionIds: state.roleFeaturePermissionIds }))

  updateRoleNavigation = this.updater((state, updated: RoleNavigation) => {
    return {
      ...state,
      roleNavigations: state.roleNavigations.map(roleNavigation => {
        return updated.id === roleNavigation.id ? { ...roleNavigation, ...updated } : roleNavigation;
      })
    }
  })

  loadRoleFeaturePermissionsEffect = this.effect<string>(roleId$ => roleId$.pipe(
    withLatestFrom(this.selectedRoleId$),
    tap(([roleId, currentRoleId]) => {
      if (!roleId && !currentRoleId) {
        return EMPTY;
      }
      this.patchState({ loading: true })
    }),
    switchMap(([roleId, currentRoleId]) => this.service.loadRoleFeaturePermissions(roleId ?? currentRoleId).pipe(
      tapResponse(
        (data) => {
          console.log(data)
          this.patchState({
            selectedRoleId: roleId ?? currentRoleId,
            loading: false,
            refreshTable: true,
            roleFeaturePermissionIds: data.map((permission) => permission.featurePermissionId),
            selectedPermissionIds: data.map((permission) => permission.featurePermissionId)
          })
        },
        (error) => {
          this.patchState({
            loading: false
          })
        }
      )
    )
    )
  ))

  loadRolesAndFeaturesEffect = this.effect<void>($ => $.pipe(
    tap(() => { this.patchState({ loading: true }) }),
    switchMap(() => this.service.loadBasicData().pipe(
      tapResponse(
        (data) => {
          // this.loadRoleFeaturePermissionsEffect(data.roles[0].id)
          this.patchState({
            loading: false,
            roles: data.roles,
            features: data.features,
          })
        },
        (error) => {
          this.patchState({
            loading: false
          })
        }
      )
    )
    )
  ))

  updateRoleFeaturePermissionsEffect = this.effect<void>($ => $.pipe(
    tap(() => { this.patchState({ loading: true }) }),
    withLatestFrom(this.selectedRoleId$, this.roleFeaturePermissionIds$, this.selectedPermissionIds$, this.selectedFeatureIds$),
    switchMap(([_, roleId, roleFeaturePermissionIds, selectedPermissionIds, featureIds]) => this.service.updateRoleFeaturePermissions(roleId, roleFeaturePermissionIds, selectedPermissionIds, featureIds).pipe(
      tapResponse(
        (data) => {
          this.toast.success('Successfuly updated role permissions', { duration: 3000 })
          this.patchState({
            loading: false,
            roleFeaturePermissionIds: selectedPermissionIds
          })
        },
        (error) => {
          this.patchState({
            loading: false
          })
        }
      )
    )
    )
  ))

  loadRoleNavigationsEffect = this.effect<string>(roleId$ => roleId$.pipe(
    withLatestFrom(this.selectedRoleId$),
    tap(([roleId, currentRoleId]) => {
      console.error(roleId, currentRoleId)
      if (!roleId && !currentRoleId) return EMPTY;
      this.patchState({ loading: true })
    }),
    switchMap(([roleId, currentRoleId]) => this.service.loadRoleNaviations({ roleId: roleId ?? currentRoleId }).pipe(
      tapResponse(
        (data) => {
          this.patchState({
            loading: false,
            selectedRoleId: roleId ?? currentRoleId,
            roleNavigations: data
          })
        },
        (_) => {
          this.patchState({
            loading: false
          })
        }
      )
    )
    )
  ))

  updateRoleNavigationEffect = this.effect<{ roleNavigationId: string, input: AdminUpdateRoleNavigationInput, dialogRef: any }>(data$ => data$.pipe(
    tap(() => { this.patchState({ loading: true }) }),
    switchMap((data) => this.service.updateRoleNavigation(data.roleNavigationId, data.input).pipe(
      tapResponse(
        (updated) => {
          this.toast.success('Successfully updated role navigation', { duration: 3000 })
          this.updateRoleNavigation(updated)
          this.patchState({
            loading: false,
          })
          data.dialogRef?.close();
        },
        (error) => {
          this.toast.error("Failed to update role navigation", { duration: 3000 })
          this.patchState({
            loading: false
          })
        }
      )
    )
    )
  ))

  loadRoles() {
    return this.service.loadRoles()
  }
}
