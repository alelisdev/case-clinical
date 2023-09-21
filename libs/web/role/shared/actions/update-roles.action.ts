
import {IsNotNullOrUndefined,IsNumber, StringIsValidDateString, CellIdIsValidRule } from '@schema-driven/rules-engine'
import {of} from 'rxjs'
import {RoleBusinessActionBase} from './role.business-action-base'
import {RoleNameIsValidRule} from '../rules/role-name-is-valid.rule';
import {switchMap} from 'rxjs';
import {UserUpdateRoleInput, UpdateResult} from '@case-clinical/shared/util/sdk';

export class UpdateRolesAction extends RoleBusinessActionBase<UpdateResult> {

    constructor(private roles: UserUpdateRoleInput[]) {
        super('UpdateRolesAction')
    }

    preValidateAction()
    {
        this.validationContext.addRule(
            new IsNotNullOrUndefined(
                'Input',
                'Input should have values',
                this.roles,
                true
            )
        )
    }

    performAction()
    {
        this.response = this.businessProvider.data.userUpdateRoles({ input: { roles: this.roles} }).pipe(
                switchMap((response) => of(response.data.updated))
            )
    }
}

export class UpdateRoleAction extends RoleBusinessActionBase<boolean> {

    constructor(private role: UserUpdateRoleInput, private roleId: string) {
        super('UpdateRoleAction')
    }

    preValidateAction()
    {
        this.validationContext.addRule(
            new IsNotNullOrUndefined(
                'Input',
                'Input should have values',
                this.role,
                true
            )
        ).addRule(
            new CellIdIsValidRule(
                'Id',
                'Id should be a CUID and not null',
                this.roleId,
                true
                )
        )
    }

    performAction()
    {
        this.response = this.businessProvider.data.userUpdateRole({roleId: this.roleId, input: this.role }).pipe(
                switchMap((response) => of(response.data.updated))
            )
    }
}
