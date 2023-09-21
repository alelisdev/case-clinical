
import {IsNotNullOrUndefined,IsNumber, StringIsValidDateString, CellIdIsValidRule } from '@schema-driven/rules-engine'
import {of} from 'rxjs'
import {BankBusinessActionBase} from './bank.business-action-base'
import {BankNameIsValidRule} from '../rules/bank-name-is-valid.rule';
import {switchMap} from 'rxjs';
import {UserUpdateBankInput} from '@case-clinical/shared/util/sdk';

export class UpdateBanksAction extends BankBusinessActionBase<boolean> {

    constructor(private banks: UserUpdateBankInput[]) {
        super('UpdateBanksAction')
    }

    preValidateAction()
    {
        this.validationContext.addRule(
            new IsNotNullOrUndefined(
                'Input',
                'Input should have values',
                this.banks,
                true
            )
        )
    }

    performAction()
    {
        this.response = this.businessProvider.data.userUpdateBanks({ input: { banks: this.banks} }).pipe(
                switchMap(() => of(true))
            )
    }
}

export class UpdateBankAction extends BankBusinessActionBase<boolean> {

    constructor(private bank: UserUpdateBankInput, private bankId: string) {
        super('UpdateBankAction')
    }

    preValidateAction()
    {
        this.validationContext.addRule(
            new IsNotNullOrUndefined(
                'Input',
                'Input should have values',
                this.bank,
                true
            )
        ).addRule(
            new CellIdIsValidRule(
                'Id',
                'Id should be a CUID and not null',
                this.bankId,
                true
                )
        )
    }

    performAction()
    {
        this.response = this.businessProvider.data.userUpdateBank({bankId: this.bankId, input: this.bank }).pipe(
                switchMap(() => of(true))
            )
    }
}
