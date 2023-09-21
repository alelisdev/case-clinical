
import {IsNotNullOrUndefined,IsNumber, StringIsValidDateString, CellIdIsValidRule } from '@schema-driven/rules-engine'
import {of} from 'rxjs'
import {TeamRoleBusinessActionBase} from './team-role.business-action-base'
import {TeamRoleNameIsValidRule} from '../rules/team-role-name-is-valid.rule';
import {switchMap} from 'rxjs';
import {UserUpdateTeamRoleInput, UpdateResult} from '@case-clinical/shared/util/sdk';

export class UpdateTeamRolesAction extends TeamRoleBusinessActionBase<UpdateResult> {

    constructor(private teamRoles: UserUpdateTeamRoleInput[]) {
        super('UpdateTeamRolesAction')
    }

    preValidateAction()
    {
        this.validationContext.addRule(
            new IsNotNullOrUndefined(
                'Input',
                'Input should have values',
                this.teamRoles,
                true
            )
        )
    }

    performAction()
    {
        this.response = this.businessProvider.data.userUpdateTeamRoles({ input: { teamRoles: this.teamRoles} }).pipe(
                switchMap((response) => of(response.data.updated))
            )
    }
}

export class UpdateTeamRoleAction extends TeamRoleBusinessActionBase<boolean> {

    constructor(private teamRole: UserUpdateTeamRoleInput, private teamRoleId: string) {
        super('UpdateTeamRoleAction')
    }

    preValidateAction()
    {
        this.validationContext.addRule(
            new IsNotNullOrUndefined(
                'Input',
                'Input should have values',
                this.teamRole,
                true
            )
        ).addRule(
            new CellIdIsValidRule(
                'Id',
                'Id should be a CUID and not null',
                this.teamRoleId,
                true
                )
        )
    }

    performAction()
    {
        this.response = this.businessProvider.data.userUpdateTeamRole({teamRoleId: this.teamRoleId, input: this.teamRole }).pipe(
                switchMap((response) => of(response.data.updated))
            )
    }
}
