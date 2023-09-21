
import {IsNotNullOrUndefined,IsNumber, StringIsValidDateString, CellIdIsValidRule } from '@schema-driven/rules-engine'
import {of} from 'rxjs'
import {AccountStatusBusinessActionBase} from './account-status.business-action-base'
import {AccountStatusNameIsValidRule} from '../rules/account-status-name-is-valid.rule';
import {switchMap} from 'rxjs';
import {UserUpdateAccountStatusInput, UpdateResult} from '@case-clinical/shared/util/sdk';

export class UpdateAccountStatusesAction extends AccountStatusBusinessActionBase<UpdateResult> {

    constructor(private accountStatuses: UserUpdateAccountStatusInput[]) {
        super('UpdateAccountStatusesAction')
    }

    preValidateAction()
    {
        this.validationContext.addRule(
            new IsNotNullOrUndefined(
                'Input',
                'Input should have values',
                this.accountStatuses,
                true
            )
        )
    }

    performAction()
    {
        this.response = this.businessProvider.data.userUpdateAccountStatuses({ input: { accountStatuses: this.accountStatuses} }).pipe(
                switchMap((response) => of(response.data.updated))
            )
    }
}

export class UpdateAccountStatusAction extends AccountStatusBusinessActionBase<boolean> {

    constructor(private accountStatus: UserUpdateAccountStatusInput, private accountStatusId: string) {
        super('UpdateAccountStatusAction')
    }

    preValidateAction()
    {
        this.validationContext.addRule(
            new IsNotNullOrUndefined(
                'Input',
                'Input should have values',
                this.accountStatus,
                true
            )
        ).addRule(
            new CellIdIsValidRule(
                'Id',
                'Id should be a CUID and not null',
                this.accountStatusId,
                true
                )
        )
    }

    performAction()
    {
        this.response = this.businessProvider.data.userUpdateAccountStatus({accountStatusId: this.accountStatusId, input: this.accountStatus }).pipe(
                switchMap((response) => of(response.data.updated))
            )
    }
}
