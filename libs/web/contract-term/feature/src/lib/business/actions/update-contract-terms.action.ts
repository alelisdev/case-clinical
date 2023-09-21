
import {IsNotNullOrUndefined,IsNumber, StringIsValidDateString, CellIdIsValidRule } from '@schema-driven/rules-engine'
import {of} from 'rxjs'
import {ContractTermBusinessActionBase} from './contract-term.business-action-base'
import {ContractTermNameIsValidRule} from '../rules/contract-term-name-is-valid.rule';
import {switchMap} from 'rxjs';
import {UserUpdateContractTermInput} from '@case-clinical/shared/util/sdk';

export class UpdateContractTermsAction extends ContractTermBusinessActionBase<boolean> {

    constructor(private contractTerms: UserUpdateContractTermInput[]) {
        super('UpdateContractTermsAction')
    }

    preValidateAction()
    {
        this.validationContext.addRule(
            new IsNotNullOrUndefined(
                'Input',
                'Input should have values',
                this.contractTerms,
                true
            )
        )
    }

    performAction()
    {
        this.response = this.businessProvider.data.userUpdateContractTerms({ input: { contractTerms: this.contractTerms} }).pipe(
                switchMap(() => of(true))
            )
    }
}

export class UpdateContractTermAction extends ContractTermBusinessActionBase<boolean> {

    constructor(private contractTerm: UserUpdateContractTermInput, private contractTermId: string) {
        super('UpdateContractTermAction')
    }

    preValidateAction()
    {
        this.validationContext.addRule(
            new IsNotNullOrUndefined(
                'Input',
                'Input should have values',
                this.contractTerm,
                true
            )
        ).addRule(
            new CellIdIsValidRule(
                'Id',
                'Id should be a CUID and not null',
                this.contractTermId,
                true
                )
        )
    }

    performAction()
    {
        this.response = this.businessProvider.data.userUpdateContractTerm({contractTermId: this.contractTermId, input: this.contractTerm }).pipe(
                switchMap(() => of(true))
            )
    }
}
