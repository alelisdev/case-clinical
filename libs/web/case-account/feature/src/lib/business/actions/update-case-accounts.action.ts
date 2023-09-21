
import {IsNotNullOrUndefined,IsNumber, StringIsValidDateString, CellIdIsValidRule } from '@schema-driven/rules-engine'
import {of} from 'rxjs'
import {CaseAccountBusinessActionBase} from './case-account.business-action-base'
import {CaseAccountNameIsValidRule} from '../rules/case-account-name-is-valid.rule';
import {switchMap} from 'rxjs';
import {UserUpdateCaseAccountInput} from '@case-clinical/shared/util/sdk';

export class UpdateCaseAccountsAction extends CaseAccountBusinessActionBase<boolean> {

    constructor(private caseAccounts: UserUpdateCaseAccountInput[]) {
        super('UpdateCaseAccountsAction')
    }

    preValidateAction()
    {
        this.validationContext.addRule(
            new IsNotNullOrUndefined(
                'Input',
                'Input should have values',
                this.caseAccounts,
                true
            )
        )
    }

    performAction()
    {
        this.response = this.businessProvider.data.userUpdateCaseAccounts({ input: { caseAccounts: this.caseAccounts} }).pipe(
                switchMap(() => of(true))
            )
    }
}

export class UpdateCaseAccountAction extends CaseAccountBusinessActionBase<boolean> {

    constructor(private caseAccount: UserUpdateCaseAccountInput, private caseAccountId: string) {
        super('UpdateCaseAccountAction')
    }

    preValidateAction()
    {
        this.validationContext.addRule(
            new IsNotNullOrUndefined(
                'Input',
                'Input should have values',
                this.caseAccount,
                true
            )
        ).addRule(
            new CellIdIsValidRule(
                'Id',
                'Id should be a CUID and not null',
                this.caseAccountId,
                true
                )
        )
    }

    performAction()
    {
        this.response = this.businessProvider.data.userUpdateCaseAccount({caseAccountId: this.caseAccountId, input: this.caseAccount }).pipe(
                switchMap(() => of(true))
            )
    }
}
