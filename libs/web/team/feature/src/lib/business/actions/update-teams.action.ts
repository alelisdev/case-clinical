
import {IsNotNullOrUndefined,IsNumber, StringIsValidDateString, CellIdIsValidRule } from '@schema-driven/rules-engine'
import {of} from 'rxjs'
import {TeamBusinessActionBase} from './team.business-action-base'
import {TeamNameIsValidRule} from '../rules/team-name-is-valid.rule';
import {switchMap} from 'rxjs';
import {UserUpdateTeamInput} from '@case-clinical/shared/util/sdk';

export class UpdateTeamsAction extends TeamBusinessActionBase<boolean> {

    constructor(private teams: UserUpdateTeamInput[]) {
        super('UpdateTeamsAction')
    }

    preValidateAction()
    {
        this.validationContext.addRule(
            new IsNotNullOrUndefined(
                'Input',
                'Input should have values',
                this.teams,
                true
            )
        )
    }

    performAction()
    {
        this.response = this.businessProvider.data.userUpdateTeams({ input: { teams: this.teams} }).pipe(
                switchMap(() => of(true))
            )
    }
}

export class UpdateTeamAction extends TeamBusinessActionBase<boolean> {

    constructor(private team: UserUpdateTeamInput, private teamId: string) {
        super('UpdateTeamAction')
    }

    preValidateAction()
    {
        this.validationContext.addRule(
            new IsNotNullOrUndefined(
                'Input',
                'Input should have values',
                this.team,
                true
            )
        ).addRule(
            new CellIdIsValidRule(
                'Id',
                'Id should be a CUID and not null',
                this.teamId,
                true
                )
        )
    }

    performAction()
    {
        this.response = this.businessProvider.data.userUpdateTeam({teamId: this.teamId, input: this.team }).pipe(
                switchMap(() => of(true))
            )
    }
}
