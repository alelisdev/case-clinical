
import {IsNotNullOrUndefined,IsNumber, StringIsValidDateString, CellIdIsValidRule } from '@schema-driven/rules-engine'
import {of} from 'rxjs'
import {ContractBusinessActionBase} from './contract.business-action-base'
import {ContractNameIsValidRule} from '../rules/contract-name-is-valid.rule';
import {switchMap} from 'rxjs';
import {UserUpdateContractInput} from '@case-clinical/shared/util/sdk';

export class UpdateContractsAction extends ContractBusinessActionBase<boolean> {

    constructor(private contracts: UserUpdateContractInput[]) {
        super('UpdateContractsAction')
    }

    preValidateAction()
    {
        this.validationContext.addRule(
            new IsNotNullOrUndefined(
                'Input',
                'Input should have values',
                this.contracts,
                true
            )
        )
    }

    performAction()
    {
        this.response = this.businessProvider.data.userUpdateContracts({ input: { contracts: this.contracts} }).pipe(
                switchMap(() => of(true))
            )
    }
}

export class UpdateContractAction extends ContractBusinessActionBase<boolean> {

    constructor(private contract: UserUpdateContractInput, private contractId: string) {
        super('UpdateContractAction')
    }

    preValidateAction()
    {
        this.validationContext.addRule(
            new IsNotNullOrUndefined(
                'Input',
                'Input should have values',
                this.contract,
                true
            )
        ).addRule(
            new CellIdIsValidRule(
                'Id',
                'Id should be a CUID and not null',
                this.contractId,
                true
                )
        )
    }

    performAction()
    {
        this.response = this.businessProvider.data.userUpdateContract({contractId: this.contractId, input: this.contract }).pipe(
                switchMap(() => of(true))
            )
    }
}
