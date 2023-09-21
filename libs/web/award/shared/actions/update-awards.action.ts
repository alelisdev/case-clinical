
import {IsNotNullOrUndefined,IsNumber, StringIsValidDateString, CellIdIsValidRule } from '@schema-driven/rules-engine'
import {of} from 'rxjs'
import {AwardBusinessActionBase} from './award.business-action-base'
import {AwardNameIsValidRule} from '../rules/award-name-is-valid.rule';
import {switchMap} from 'rxjs';
import {UserUpdateAwardInput, UpdateResult} from '@case-clinical/shared/util/sdk';

export class UpdateAwardsAction extends AwardBusinessActionBase<UpdateResult> {

    constructor(private awards: UserUpdateAwardInput[]) {
        super('UpdateAwardsAction')
    }

    preValidateAction()
    {
        this.validationContext.addRule(
            new IsNotNullOrUndefined(
                'Input',
                'Input should have values',
                this.awards,
                true
            )
        )
    }

    performAction()
    {
        this.response = this.businessProvider.data.userUpdateAwards({ input: { awards: this.awards} }).pipe(
                switchMap((response) => of(response.data.updated))
            )
    }
}

export class UpdateAwardAction extends AwardBusinessActionBase<boolean> {

    constructor(private award: UserUpdateAwardInput, private awardId: string) {
        super('UpdateAwardAction')
    }

    preValidateAction()
    {
        this.validationContext.addRule(
            new IsNotNullOrUndefined(
                'Input',
                'Input should have values',
                this.award,
                true
            )
        ).addRule(
            new CellIdIsValidRule(
                'Id',
                'Id should be a CUID and not null',
                this.awardId,
                true
                )
        )
    }

    performAction()
    {
        this.response = this.businessProvider.data.userUpdateAward({awardId: this.awardId, input: this.award }).pipe(
                switchMap((response) => of(response.data.updated))
            )
    }
}
