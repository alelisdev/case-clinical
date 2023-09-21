
import {IsNotNullOrUndefined,IsNumber, StringIsValidDateString, CellIdIsValidRule } from '@schema-driven/rules-engine'
import {of} from 'rxjs'
import {AttorneyBusinessActionBase} from './attorney.business-action-base'
import {AttorneyNameIsValidRule} from '../rules/attorney-name-is-valid.rule';
import {switchMap} from 'rxjs';
import {UserUpdateAttorneyInput} from '@case-clinical/shared/util/sdk';

export class UpdateAttorneysAction extends AttorneyBusinessActionBase<boolean> {

    constructor(private attorneys: UserUpdateAttorneyInput[]) {
        super('UpdateAttorneysAction')
    }

    preValidateAction()
    {
        this.validationContext.addRule(
            new IsNotNullOrUndefined(
                'Input',
                'Input should have values',
                this.attorneys,
                true
            )
        )
    }

    performAction()
    {
        this.response = this.businessProvider.data.userUpdateAttorneys({ input: { attorneys: this.attorneys} }).pipe(
                switchMap(() => of(true))
            )
    }
}

export class UpdateAttorneyAction extends AttorneyBusinessActionBase<boolean> {

    constructor(private attorney: UserUpdateAttorneyInput, private attorneyId: string) {
        super('UpdateAttorneyAction')
    }

    preValidateAction()
    {
        this.validationContext.addRule(
            new IsNotNullOrUndefined(
                'Input',
                'Input should have values',
                this.attorney,
                true
            )
        ).addRule(
            new CellIdIsValidRule(
                'Id',
                'Id should be a CUID and not null',
                this.attorneyId,
                true
                )
        )
    }

    performAction()
    {
        this.response = this.businessProvider.data.userUpdateAttorney({attorneyId: this.attorneyId, input: this.attorney }).pipe(
                switchMap(() => of(true))
            )
    }
}
