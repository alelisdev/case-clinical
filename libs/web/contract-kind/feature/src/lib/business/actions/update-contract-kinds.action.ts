
import {IsNotNullOrUndefined,IsNumber, StringIsValidDateString, CellIdIsValidRule } from '@schema-driven/rules-engine'
import {of} from 'rxjs'
import {ContractKindBusinessActionBase} from './contract-kind.business-action-base'
import {ContractKindNameIsValidRule} from '../rules/contract-kind-name-is-valid.rule';
import {switchMap} from 'rxjs';
import {UserUpdateContractKindInput} from '@case-clinical/shared/util/sdk';

export class UpdateContractKindsAction extends ContractKindBusinessActionBase<boolean> {

    constructor(private contractKinds: UserUpdateContractKindInput[]) {
        super('UpdateContractKindsAction')
    }

    preValidateAction()
    {
        this.validationContext.addRule(
            new IsNotNullOrUndefined(
                'Input',
                'Input should have values',
                this.contractKinds,
                true
            )
        )
    }

    performAction()
    {
        this.response = this.businessProvider.data.userUpdateContractKinds({ input: { contractKinds: this.contractKinds} }).pipe(
                switchMap(() => of(true))
            )
    }
}

export class UpdateContractKindAction extends ContractKindBusinessActionBase<boolean> {

    constructor(private contractKind: UserUpdateContractKindInput, private contractKindId: string) {
        super('UpdateContractKindAction')
    }

    preValidateAction()
    {
        this.validationContext.addRule(
            new IsNotNullOrUndefined(
                'Input',
                'Input should have values',
                this.contractKind,
                true
            )
        ).addRule(
            new CellIdIsValidRule(
                'Id',
                'Id should be a CUID and not null',
                this.contractKindId,
                true
                )
        )
    }

    performAction()
    {
        this.response = this.businessProvider.data.userUpdateContractKind({contractKindId: this.contractKindId, input: this.contractKind }).pipe(
                switchMap(() => of(true))
            )
    }
}
