
import {IsNotNullOrUndefined,IsNumber, StringIsValidDateString, CellIdIsValidRule } from '@schema-driven/rules-engine'
import {of} from 'rxjs'
import {TeamUserBusinessActionBase} from './team-user.business-action-base'
import {TeamUserNameIsValidRule} from '../rules/team-user-name-is-valid.rule';
import {switchMap} from 'rxjs';
import {UserUpdateTeamUserInput, UpdateResult} from '@case-clinical/shared/util/sdk';

export class UpdateTeamUsersAction extends TeamUserBusinessActionBase<UpdateResult> {

    constructor(private teamUsers: UserUpdateTeamUserInput[]) {
        super('UpdateTeamUsersAction')
    }

    preValidateAction()
    {
        this.validationContext.addRule(
            new IsNotNullOrUndefined(
                'Input',
                'Input should have values',
                this.teamUsers,
                true
            )
        )
    }

    performAction()
    {
        this.response = this.businessProvider.data.userUpdateTeamUsers({ input: { teamUsers: this.teamUsers} }).pipe(
                switchMap((response) => of(response.data.updated))
            )
    }
}

export class UpdateTeamUserAction extends TeamUserBusinessActionBase<boolean> {

    constructor(private teamUser: UserUpdateTeamUserInput, private teamUserId: string) {
        super('UpdateTeamUserAction')
    }

    preValidateAction()
    {
        this.validationContext.addRule(
            new IsNotNullOrUndefined(
                'Input',
                'Input should have values',
                this.teamUser,
                true
            )
        ).addRule(
            new CellIdIsValidRule(
                'Id',
                'Id should be a CUID and not null',
                this.teamUserId,
                true
                )
        )
    }

    performAction()
    {
        this.response = this.businessProvider.data.userUpdateTeamUser({teamUserId: this.teamUserId, input: this.teamUser }).pipe(
                switchMap((response) => of(response.data.updated))
            )
    }
}
