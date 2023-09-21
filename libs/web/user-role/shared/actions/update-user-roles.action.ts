
import {IsNotNullOrUndefined,IsNumber, StringIsValidDateString, CellIdIsValidRule } from '@schema-driven/rules-engine'
import {of} from 'rxjs'
import {UserRoleBusinessActionBase} from './user-role.business-action-base'
import {UserRoleNameIsValidRule} from '../rules/user-role-name-is-valid.rule';
import {switchMap} from 'rxjs';
import {UserUpdateUserRoleInput, UpdateResult} from '@case-clinical/shared/util/sdk';

export class UpdateUserRolesAction extends UserRoleBusinessActionBase<UpdateResult> {

    constructor(private userRoles: UserUpdateUserRoleInput[]) {
        super('UpdateUserRolesAction')
    }

    preValidateAction()
    {
        this.validationContext.addRule(
            new IsNotNullOrUndefined(
                'Input',
                'Input should have values',
                this.userRoles,
                true
            )
        )
    }

    performAction()
    {
        this.response = this.businessProvider.data.userUpdateUserRoles({ input: { userRoles: this.userRoles} }).pipe(
                switchMap((response) => of(response.data.updated))
            )
    }
}

export class UpdateUserRoleAction extends UserRoleBusinessActionBase<boolean> {

    constructor(private userRole: UserUpdateUserRoleInput, private userRoleId: string) {
        super('UpdateUserRoleAction')
    }

    preValidateAction()
    {
        this.validationContext.addRule(
            new IsNotNullOrUndefined(
                'Input',
                'Input should have values',
                this.userRole,
                true
            )
        ).addRule(
            new CellIdIsValidRule(
                'Id',
                'Id should be a CUID and not null',
                this.userRoleId,
                true
                )
        )
    }

    performAction()
    {
        this.response = this.businessProvider.data.userUpdateUserRole({userRoleId: this.userRoleId, input: this.userRole }).pipe(
                switchMap((response) => of(response.data.updated))
            )
    }
}
