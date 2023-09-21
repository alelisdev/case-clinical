
import {IsNotNullOrUndefined,IsNumber, StringIsValidDateString, CellIdIsValidRule } from '@schema-driven/rules-engine'
import {of} from 'rxjs'
import {EligibilityStatusBusinessActionBase} from './eligibility-status.business-action-base'
import {EligibilityStatusNameIsValidRule} from '../rules/eligibility-status-name-is-valid.rule';
import {switchMap} from 'rxjs';
import {UserUpdateEligibilityStatusInput, UpdateResult} from '@case-clinical/shared/util/sdk';

export class UpdateEligibilityStatusesAction extends EligibilityStatusBusinessActionBase<UpdateResult> {

    constructor(private eligibilityStatuses: UserUpdateEligibilityStatusInput[]) {
        super('UpdateEligibilityStatusesAction')
    }

    preValidateAction()
    {
        this.validationContext.addRule(
            new IsNotNullOrUndefined(
                'Input',
                'Input should have values',
                this.eligibilityStatuses,
                true
            )
        )
    }

    performAction()
    {
        this.response = this.businessProvider.data.userUpdateEligibilityStatuses({ input: { eligibilityStatuses: this.eligibilityStatuses} }).pipe(
                switchMap((response) => of(response.data.updated))
            )
    }
}

export class UpdateEligibilityStatusAction extends EligibilityStatusBusinessActionBase<boolean> {

    constructor(private eligibilityStatus: UserUpdateEligibilityStatusInput, private eligibilityStatusId: string) {
        super('UpdateEligibilityStatusAction')
    }

    preValidateAction()
    {
        this.validationContext.addRule(
            new IsNotNullOrUndefined(
                'Input',
                'Input should have values',
                this.eligibilityStatus,
                true
            )
        ).addRule(
            new CellIdIsValidRule(
                'Id',
                'Id should be a CUID and not null',
                this.eligibilityStatusId,
                true
                )
        )
    }

    performAction()
    {
        this.response = this.businessProvider.data.userUpdateEligibilityStatus({eligibilityStatusId: this.eligibilityStatusId, input: this.eligibilityStatus }).pipe(
                switchMap((response) => of(response.data.updated))
            )
    }
}
