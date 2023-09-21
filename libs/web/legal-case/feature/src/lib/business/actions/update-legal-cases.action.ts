
import {IsNotNullOrUndefined,IsNumber, StringIsValidDateString, CellIdIsValidRule } from '@schema-driven/rules-engine'
import {of} from 'rxjs'
import {LegalCaseBusinessActionBase} from './legal-case.business-action-base'
import {LegalCaseNameIsValidRule} from '../rules/legal-case-name-is-valid.rule';
import {switchMap} from 'rxjs';
import {UserUpdateLegalCaseInput,UpdateResult} from '@case-clinical/shared/util/sdk';

export class UpdateLegalCasesAction extends LegalCaseBusinessActionBase<UpdateResult> {

    constructor(private legalCases: UserUpdateLegalCaseInput[]) {
        super('UpdateLegalCasesAction')
    }

    preValidateAction()
    {
      console.log(this.legalCases)
        this.validationContext.addRule(
            new IsNotNullOrUndefined(
                'Input',
                'Input should have values',
                this.legalCases,
                true
            )
        )
    }

    performAction()
    {
        this.response = this.businessProvider.data.userUpdateLegalCases({ input: { legalCases: this.legalCases} }).pipe(
                switchMap((response) => of(response.data.updated))
            )
    }
}

export class UpdateLegalCaseAction extends LegalCaseBusinessActionBase<boolean> {

    constructor(private legalCase: UserUpdateLegalCaseInput, private legalCaseId: string) {
        super('UpdateLegalCaseAction')
    }

    preValidateAction()
    {
        this.validationContext.addRule(
            new IsNotNullOrUndefined(
                'Input',
                'Input should have values',
                this.legalCase,
                true
            )
        ).addRule(
            new CellIdIsValidRule(
                'Id',
                'Id should be a CUID and not null',
                this.legalCaseId,
                true
                )
        )
    }

    performAction()
    {
        this.response = this.businessProvider.data.userUpdateLegalCase({legalCaseId: this.legalCaseId, input: this.legalCase }).pipe(
                switchMap(() => of(true))
            )
    }
}
