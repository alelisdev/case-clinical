
import {IsNotNullOrUndefined,IsNumber, StringIsValidDateString, CellIdIsValidRule } from '@schema-driven/rules-engine'
import {of} from 'rxjs'
import {AdverseInsuranceStatusBusinessActionBase} from './adverse-insurance-status.business-action-base'
import {AdverseInsuranceStatusNameIsValidRule} from '../rules/adverse-insurance-status-name-is-valid.rule';
import {switchMap} from 'rxjs';
import {UserUpdateAdverseInsuranceStatusInput} from '@case-clinical/shared/util/sdk';

export class UpdateAdverseInsuranceStatusesAction extends AdverseInsuranceStatusBusinessActionBase<boolean> {

    constructor(private adverseInsuranceStatuses: UserUpdateAdverseInsuranceStatusInput[]) {
        super('UpdateAdverseInsuranceStatusesAction')
    }

    preValidateAction()
    {
        this.validationContext.addRule(
            new IsNotNullOrUndefined(
                'Input',
                'Input should have values',
                this.adverseInsuranceStatuses,
                true
            )
        )
    }

    performAction()
    {
        this.response = this.businessProvider.data.userUpdateAdverseInsuranceStatuses({ input: { adverseInsuranceStatuses: this.adverseInsuranceStatuses} }).pipe(
                switchMap(() => of(true))
            )
    }
}

export class UpdateAdverseInsuranceStatusAction extends AdverseInsuranceStatusBusinessActionBase<boolean> {

    constructor(private adverseInsuranceStatus: UserUpdateAdverseInsuranceStatusInput, private adverseInsuranceStatusId: string) {
        super('UpdateAdverseInsuranceStatusAction')
    }

    preValidateAction()
    {
        this.validationContext.addRule(
            new IsNotNullOrUndefined(
                'Input',
                'Input should have values',
                this.adverseInsuranceStatus,
                true
            )
        ).addRule(
            new CellIdIsValidRule(
                'Id',
                'Id should be a CUID and not null',
                this.adverseInsuranceStatusId,
                true
                )
        )
    }

    performAction()
    {
        this.response = this.businessProvider.data.userUpdateAdverseInsuranceStatus({adverseInsuranceStatusId: this.adverseInsuranceStatusId, input: this.adverseInsuranceStatus }).pipe(
                switchMap(() => of(true))
            )
    }
}
