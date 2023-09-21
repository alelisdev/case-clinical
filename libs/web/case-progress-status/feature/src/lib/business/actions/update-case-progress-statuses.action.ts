
import {IsNotNullOrUndefined,IsNumber, StringIsValidDateString, CellIdIsValidRule } from '@schema-driven/rules-engine'
import {of} from 'rxjs'
import {CaseProgressStatusBusinessActionBase} from './case-progress-status.business-action-base'
import {CaseProgressStatusNameIsValidRule} from '../rules/case-progress-status-name-is-valid.rule';
import {switchMap} from 'rxjs';
import {UserUpdateCaseProgressStatusInput} from '@case-clinical/shared/util/sdk';

export class UpdateCaseProgressStatusesAction extends CaseProgressStatusBusinessActionBase<boolean> {

    constructor(private caseProgressStatuses: UserUpdateCaseProgressStatusInput[]) {
        super('UpdateCaseProgressStatusesAction')
    }

    preValidateAction()
    {
        this.validationContext.addRule(
            new IsNotNullOrUndefined(
                'Input',
                'Input should have values',
                this.caseProgressStatuses,
                true
            )
        )
    }

    performAction()
    {
        this.response = this.businessProvider.data.userUpdateCaseProgressStatuses({ input: { caseProgressStatuses: this.caseProgressStatuses} }).pipe(
                switchMap(() => of(true))
            )
    }
}

export class UpdateCaseProgressStatusAction extends CaseProgressStatusBusinessActionBase<boolean> {

    constructor(private caseProgressStatus: UserUpdateCaseProgressStatusInput, private caseProgressStatusId: string) {
        super('UpdateCaseProgressStatusAction')
    }

    preValidateAction()
    {
        this.validationContext.addRule(
            new IsNotNullOrUndefined(
                'Input',
                'Input should have values',
                this.caseProgressStatus,
                true
            )
        ).addRule(
            new CellIdIsValidRule(
                'Id',
                'Id should be a CUID and not null',
                this.caseProgressStatusId,
                true
                )
        )
    }

    performAction()
    {
        this.response = this.businessProvider.data.userUpdateCaseProgressStatus({caseProgressStatusId: this.caseProgressStatusId, input: this.caseProgressStatus }).pipe(
                switchMap(() => of(true))
            )
    }
}
