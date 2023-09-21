
import {IsNotNullOrUndefined,IsNumber, StringIsValidDateString, CellIdIsValidRule } from '@schema-driven/rules-engine'
import {of} from 'rxjs'
import {InjuryBusinessActionBase} from './injury.business-action-base'
import {InjuryNameIsValidRule} from '../rules/injury-name-is-valid.rule';
import {switchMap} from 'rxjs';
import {UserUpdateInjuryInput, UpdateResult} from '@case-clinical/shared/util/sdk';

export class UpdateInjuriesAction extends InjuryBusinessActionBase<UpdateResult> {

    constructor(private injuries: UserUpdateInjuryInput[]) {
        super('UpdateInjuriesAction')
    }

    preValidateAction()
    {
        this.validationContext.addRule(
            new IsNotNullOrUndefined(
                'Input',
                'Input should have values',
                this.injuries,
                true
            )
        )
    }

    performAction()
    {
        this.response = this.businessProvider.data.userUpdateInjuries({ input: { injuries: this.injuries} }).pipe(
                switchMap((response) => of(response.data.updated))
            )
    }
}

export class UpdateInjuryAction extends InjuryBusinessActionBase<boolean> {

    constructor(private injury: UserUpdateInjuryInput, private injuryId: string) {
        super('UpdateInjuryAction')
    }

    preValidateAction()
    {
        this.validationContext.addRule(
            new IsNotNullOrUndefined(
                'Input',
                'Input should have values',
                this.injury,
                true
            )
        ).addRule(
            new CellIdIsValidRule(
                'Id',
                'Id should be a CUID and not null',
                this.injuryId,
                true
                )
        )
    }

    performAction()
    {
        this.response = this.businessProvider.data.userUpdateInjury({injuryId: this.injuryId, input: this.injury }).pipe(
                switchMap((response) => of(response.data.updated))
            )
    }
}
