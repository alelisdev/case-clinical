
import {IsNotNullOrUndefined,IsNumber, StringIsValidDateString, CellIdIsValidRule } from '@schema-driven/rules-engine'
import {of} from 'rxjs'
import {ContractedRateKindBusinessActionBase} from './contracted-rate-kind.business-action-base'
import {ContractedRateKindNameIsValidRule} from '../rules/contracted-rate-kind-name-is-valid.rule';
import {switchMap} from 'rxjs';
import {UserUpdateContractedRateKindInput} from '@case-clinical/shared/util/sdk';

export class UpdateContractedRateKindsAction extends ContractedRateKindBusinessActionBase<boolean> {

    constructor(private contractedRateKinds: UserUpdateContractedRateKindInput[]) {
        super('UpdateContractedRateKindsAction')
    }

    preValidateAction()
    {
        this.validationContext.addRule(
            new IsNotNullOrUndefined(
                'Input',
                'Input should have values',
                this.contractedRateKinds,
                true
            )
        )
    }

    performAction()
    {
        this.response = this.businessProvider.data.userUpdateContractedRateKinds({ input: { contractedRateKinds: this.contractedRateKinds} }).pipe(
                switchMap(() => of(true))
            )
    }
}

export class UpdateContractedRateKindAction extends ContractedRateKindBusinessActionBase<boolean> {

    constructor(private contractedRateKind: UserUpdateContractedRateKindInput, private contractedRateKindId: string) {
        super('UpdateContractedRateKindAction')
    }

    preValidateAction()
    {
        this.validationContext.addRule(
            new IsNotNullOrUndefined(
                'Input',
                'Input should have values',
                this.contractedRateKind,
                true
            )
        ).addRule(
            new CellIdIsValidRule(
                'Id',
                'Id should be a CUID and not null',
                this.contractedRateKindId,
                true
                )
        )
    }

    performAction()
    {
        this.response = this.businessProvider.data.userUpdateContractedRateKind({contractedRateKindId: this.contractedRateKindId, input: this.contractedRateKind }).pipe(
                switchMap(() => of(true))
            )
    }
}
