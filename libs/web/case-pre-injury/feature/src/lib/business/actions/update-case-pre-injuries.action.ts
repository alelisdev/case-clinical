
import {IsNotNullOrUndefined,IsNumber, StringIsValidDateString, CellIdIsValidRule } from '@schema-driven/rules-engine'
import {of} from 'rxjs'
import {CasePreInjuryBusinessActionBase} from './case-pre-injury.business-action-base'
import {CasePreInjuryNameIsValidRule} from '../rules/case-pre-injury-name-is-valid.rule';
import {switchMap} from 'rxjs';
import {UserUpdateCasePreInjuryInput} from '@case-clinical/shared/util/sdk';

export class UpdateCasePreInjuriesAction extends CasePreInjuryBusinessActionBase<boolean> {

    constructor(private casePreInjuries: UserUpdateCasePreInjuryInput[]) {
        super('UpdateCasePreInjuriesAction')
    }

    preValidateAction()
    {
        this.validationContext.addRule(
            new IsNotNullOrUndefined(
                'Input',
                'Input should have values',
                this.casePreInjuries,
                true
            )
        )
    }

    performAction()
    {
        this.response = this.businessProvider.data.userUpdateCasePreInjuries({ input: { casePreInjuries: this.casePreInjuries} }).pipe(
                switchMap(() => of(true))
            )
    }
}

export class UpdateCasePreInjuryAction extends CasePreInjuryBusinessActionBase<boolean> {

    constructor(private casePreInjury: UserUpdateCasePreInjuryInput, private casePreInjuryId: string) {
        super('UpdateCasePreInjuryAction')
    }

    preValidateAction()
    {
        this.validationContext.addRule(
            new IsNotNullOrUndefined(
                'Input',
                'Input should have values',
                this.casePreInjury,
                true
            )
        ).addRule(
            new CellIdIsValidRule(
                'Id',
                'Id should be a CUID and not null',
                this.casePreInjuryId,
                true
                )
        )
    }

    performAction()
    {
        this.response = this.businessProvider.data.userUpdateCasePreInjury({casePreInjuryId: this.casePreInjuryId, input: this.casePreInjury }).pipe(
                switchMap(() => of(true))
            )
    }
}
