
import {IsNotNullOrUndefined,IsNumber, StringIsValidDateString, CellIdIsValidRule } from '@schema-driven/rules-engine'
import {of} from 'rxjs'
import {RolePermissionBusinessActionBase} from './role-permission.business-action-base'
import {RolePermissionNameIsValidRule} from '../rules/role-permission-name-is-valid.rule';
import {switchMap} from 'rxjs';
import {UserUpdateRolePermissionInput, UpdateResult} from '@case-clinical/shared/util/sdk';

export class UpdateRolePermissionsAction extends RolePermissionBusinessActionBase<UpdateResult> {

    constructor(private rolePermissions: UserUpdateRolePermissionInput[]) {
        super('UpdateRolePermissionsAction')
    }

    preValidateAction()
    {
        this.validationContext.addRule(
            new IsNotNullOrUndefined(
                'Input',
                'Input should have values',
                this.rolePermissions,
                true
            )
        )
    }

    performAction()
    {
        this.response = this.businessProvider.data.userUpdateRolePermissions({ input: { rolePermissions: this.rolePermissions} }).pipe(
                switchMap((response) => of(response.data.updated))
            )
    }
}

export class UpdateRolePermissionAction extends RolePermissionBusinessActionBase<boolean> {

    constructor(private rolePermission: UserUpdateRolePermissionInput, private rolePermissionId: string) {
        super('UpdateRolePermissionAction')
    }

    preValidateAction()
    {
        this.validationContext.addRule(
            new IsNotNullOrUndefined(
                'Input',
                'Input should have values',
                this.rolePermission,
                true
            )
        ).addRule(
            new CellIdIsValidRule(
                'Id',
                'Id should be a CUID and not null',
                this.rolePermissionId,
                true
                )
        )
    }

    performAction()
    {
        this.response = this.businessProvider.data.userUpdateRolePermission({rolePermissionId: this.rolePermissionId, input: this.rolePermission }).pipe(
                switchMap((response) => of(response.data.updated))
            )
    }
}
