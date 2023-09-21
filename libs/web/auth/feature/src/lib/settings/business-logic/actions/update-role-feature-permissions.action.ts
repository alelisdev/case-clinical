import { BillingInfo } from '@case-clinical/web/core/data-access'
import { SettingsBusinessActionBase } from './settings.business-action-base'
import { catchError, of, EMPTY, switchMap } from 'rxjs'
import { IsNotNullOrUndefined } from '@schema-driven/rules-engine'

export class UpdateRoleFeaturePermissionsAction extends SettingsBusinessActionBase<BillingInfo> {
  private featurePermissionIdsToAdd: string[] = []
  private featurePermissionIdsToRemove: string[] = []

  constructor(
    private roleId: string,
    private originalRoleFeaturePermissionIds: string[],
    private newRoleFeaturePermissionIds: string[],
    private featureIds: string[]
  ) {
    super('UpdateRoleFeaturePermissionsAction')
  }

  preValidateAction() {
    console.log(this.roleId)
    this.validationContext.addRule(
      new IsNotNullOrUndefined('roleId', 'RoleId should not be null', this.roleId, true)
    )
  }

  postValidateAction(): void {
    super.postValidateAction()
    this.featurePermissionIdsToAdd = this.newRoleFeaturePermissionIds.filter((el) => !this.originalRoleFeaturePermissionIds.includes(el))
    this.featurePermissionIdsToRemove = this.originalRoleFeaturePermissionIds.filter((el) => !this.newRoleFeaturePermissionIds.includes(el))
  }

  performAction() {
    this.response = this.businessProvider.data.adminRoleFeaturePermissionsUpdate({ roleId: this.roleId, input: { featurePermissionIdsToAdd: this.featurePermissionIdsToAdd, featurePermissionIdsToRemove: this.featurePermissionIdsToRemove, featureIds: this.featureIds } }).pipe(
      catchError((error) => {
        console.log('catChError', error)
        this.response = this.createFailResponse();
        return EMPTY;
      }),
      switchMap((result) => {
          return of(result.data.result)
      })
    )
  }
}
