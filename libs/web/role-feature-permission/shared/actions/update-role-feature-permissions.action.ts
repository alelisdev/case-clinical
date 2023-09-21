
import {IsNotNullOrUndefined,IsNumber, StringIsValidDateString, CellIdIsValidRule } from '@schema-driven/rules-engine'
import {of} from 'rxjs'
import {RoleFeaturePermissionBusinessActionBase} from './role-feature-permission.business-action-base'
import {RoleFeaturePermissionNameIsValidRule} from '../rules/role-feature-permission-name-is-valid.rule';
import {switchMap} from 'rxjs';
import {UserUpdateRoleFeaturePermissionInput, UpdateResult} from '@case-clinical/shared/util/sdk';

export class UpdateRoleFeaturePermissionsAction extends RoleFeaturePermissionBusinessActionBase<UpdateResult> {

    constructor(private roleFeaturePermissions: UserUpdateRoleFeaturePermissionInput[]) {
        super('UpdateRoleFeaturePermissionsAction')
    }

    preValidateAction()
    {
        this.validationContext.addRule(
            new IsNotNullOrUndefined(
                'Input',
                'Input should have values',
                this.roleFeaturePermissions,
                true
            )
        )
    }

    performAction()
    {
        this.response = this.businessProvider.data.userUpdateRoleFeaturePermissions({ input: { roleFeaturePermissions: this.roleFeaturePermissions} }).pipe(
                switchMap((response) => of(response.data.updated))
            )
    }
}

export class UpdateRoleFeaturePermissionAction extends RoleFeaturePermissionBusinessActionBase<boolean> {

    constructor(private roleFeaturePermission: UserUpdateRoleFeaturePermissionInput, private roleFeaturePermissionId: string) {
        super('UpdateRoleFeaturePermissionAction')
    }

    preValidateAction()
    {
        this.validationContext.addRule(
            new IsNotNullOrUndefined(
                'Input',
                'Input should have values',
                this.roleFeaturePermission,
                true
            )
        ).addRule(
            new CellIdIsValidRule(
                'Id',
                'Id should be a CUID and not null',
                this.roleFeaturePermissionId,
                true
                )
        )
    }

    performAction()
    {
        this.response = this.businessProvider.data.userUpdateRoleFeaturePermission({roleFeaturePermissionId: this.roleFeaturePermissionId, input: this.roleFeaturePermission }).pipe(
                switchMap((response) => of(response.data.updated))
            )
    }
}
