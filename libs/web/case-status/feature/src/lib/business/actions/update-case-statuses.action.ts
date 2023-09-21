
import {IsNotNullOrUndefined,IsNumber, StringIsValidDateString, CellIdIsValidRule } from '@schema-driven/rules-engine'
import {of} from 'rxjs'
import {CaseStatusBusinessActionBase} from './case-status.business-action-base'
import {CaseStatusNameIsValidRule} from '../rules/case-status-name-is-valid.rule';
import {switchMap} from 'rxjs';
import {UserUpdateCaseStatusInput} from '@case-clinical/shared/util/sdk';

export class UpdateCaseStatusesAction extends CaseStatusBusinessActionBase<boolean> {

    constructor(private caseStatuses: UserUpdateCaseStatusInput[]) {
        super('UpdateCaseStatusesAction')
    }

    preValidateAction()
    {
        this.validationContext.addRule(
            new IsNotNullOrUndefined(
                'Input',
                'Input should have values',
                this.caseStatuses,
                true
            )
        )
    }

    performAction()
    {
        this.response = this.businessProvider.data.userUpdateCaseStatuses({ input: { caseStatuses: this.caseStatuses} }).pipe(
                switchMap(() => of(true))
            )
    }
}

export class UpdateCaseStatusAction extends CaseStatusBusinessActionBase<boolean> {

    constructor(private caseStatus: UserUpdateCaseStatusInput, private caseStatusId: string) {
        super('UpdateCaseStatusAction')
    }

    preValidateAction()
    {
        this.validationContext.addRule(
            new IsNotNullOrUndefined(
                'Input',
                'Input should have values',
                this.caseStatus,
                true
            )
        ).addRule(
            new CellIdIsValidRule(
                'Id',
                'Id should be a CUID and not null',
                this.caseStatusId,
                true
                )
        )
    }

    performAction()
    {
        this.response = this.businessProvider.data.userUpdateCaseStatus({caseStatusId: this.caseStatusId, input: this.caseStatus }).pipe(
                switchMap(() => of(true))
            )
    }
}
