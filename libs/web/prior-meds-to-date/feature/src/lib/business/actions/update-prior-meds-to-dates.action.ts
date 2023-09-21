
import {IsNotNullOrUndefined,IsNumber, StringIsValidDateString, CellIdIsValidRule } from '@schema-driven/rules-engine'
import {of} from 'rxjs'
import {PriorMedsToDateBusinessActionBase} from './prior-meds-to-date.business-action-base'
import {PriorMedsToDateNameIsValidRule} from '../rules/prior-meds-to-date-name-is-valid.rule';
import {switchMap} from 'rxjs';
import {UserUpdatePriorMedsToDateInput} from '@case-clinical/shared/util/sdk';

export class UpdatePriorMedsToDatesAction extends PriorMedsToDateBusinessActionBase<boolean> {

    constructor(private priorMedsToDates: UserUpdatePriorMedsToDateInput[]) {
        super('UpdatePriorMedsToDatesAction')
    }

    preValidateAction()
    {
        this.validationContext.addRule(
            new IsNotNullOrUndefined(
                'Input',
                'Input should have values',
                this.priorMedsToDates,
                true
            )
        )
    }

    performAction()
    {
        this.response = this.businessProvider.data.userUpdatePriorMedsToDates({ input: { priorMedsToDates: this.priorMedsToDates} }).pipe(
                switchMap(() => of(true))
            )
    }
}

export class UpdatePriorMedsToDateAction extends PriorMedsToDateBusinessActionBase<boolean> {

    constructor(private priorMedsToDate: UserUpdatePriorMedsToDateInput, private priorMedsToDateId: string) {
        super('UpdatePriorMedsToDateAction')
    }

    preValidateAction()
    {
        this.validationContext.addRule(
            new IsNotNullOrUndefined(
                'Input',
                'Input should have values',
                this.priorMedsToDate,
                true
            )
        ).addRule(
            new CellIdIsValidRule(
                'Id',
                'Id should be a CUID and not null',
                this.priorMedsToDateId,
                true
                )
        )
    }

    performAction()
    {
        this.response = this.businessProvider.data.userUpdatePriorMedsToDate({priorMedsToDateId: this.priorMedsToDateId, input: this.priorMedsToDate }).pipe(
                switchMap(() => of(true))
            )
    }
}
