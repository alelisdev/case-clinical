
import {IsNotNullOrUndefined,IsNumber, StringIsValidDateString, CellIdIsValidRule } from '@schema-driven/rules-engine'
import {of} from 'rxjs'
import {ContractedRateBusinessActionBase} from './contracted-rate.business-action-base'
import {ContractedRateNameIsValidRule} from '../rules/contracted-rate-name-is-valid.rule';
import {switchMap} from 'rxjs';
import {UserUpdateContractedRateInput} from '@case-clinical/shared/util/sdk';

export class UpdateContractedRatesAction extends ContractedRateBusinessActionBase<boolean> {

    constructor(private contractedRates: UserUpdateContractedRateInput[]) {
        super('UpdateContractedRatesAction')
    }

    preValidateAction()
    {
        this.validationContext.addRule(
            new IsNotNullOrUndefined(
                'Input',
                'Input should have values',
                this.contractedRates,
                true
            )
        )
    }

    performAction()
    {
        this.response = this.businessProvider.data.userUpdateContractedRates({ input: { contractedRates: this.contractedRates} }).pipe(
                switchMap(() => of(true))
            )
    }
}

export class UpdateContractedRateAction extends ContractedRateBusinessActionBase<boolean> {

    constructor(private contractedRate: UserUpdateContractedRateInput, private contractedRateId: string) {
        super('UpdateContractedRateAction')
    }

    preValidateAction()
    {
        this.validationContext.addRule(
            new IsNotNullOrUndefined(
                'Input',
                'Input should have values',
                this.contractedRate,
                true
            )
        ).addRule(
            new CellIdIsValidRule(
                'Id',
                'Id should be a CUID and not null',
                this.contractedRateId,
                true
                )
        )
    }

    performAction()
    {
        this.response = this.businessProvider.data.userUpdateContractedRate({contractedRateId: this.contractedRateId, input: this.contractedRate }).pipe(
                switchMap(() => of(true))
            )
    }
}
