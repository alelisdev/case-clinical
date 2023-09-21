
import {IsNotNullOrUndefined,IsNumber, StringIsValidDateString, CellIdIsValidRule } from '@schema-driven/rules-engine'
import {of} from 'rxjs'
import {CasePreProblemBusinessActionBase} from './case-pre-problem.business-action-base'
import {CasePreProblemNameIsValidRule} from '../rules/case-pre-problem-name-is-valid.rule';
import {switchMap} from 'rxjs';
import {UserUpdateCasePreProblemInput} from '@case-clinical/shared/util/sdk';

export class UpdateCasePreProblemsAction extends CasePreProblemBusinessActionBase<boolean> {

    constructor(private casePreProblems: UserUpdateCasePreProblemInput[]) {
        super('UpdateCasePreProblemsAction')
    }

    preValidateAction()
    {
        this.validationContext.addRule(
            new IsNotNullOrUndefined(
                'Input',
                'Input should have values',
                this.casePreProblems,
                true
            )
        )
    }

    performAction()
    {
        this.response = this.businessProvider.data.userUpdateCasePreProblems({ input: { casePreProblems: this.casePreProblems} }).pipe(
                switchMap(() => of(true))
            )
    }
}

export class UpdateCasePreProblemAction extends CasePreProblemBusinessActionBase<boolean> {

    constructor(private casePreProblem: UserUpdateCasePreProblemInput, private casePreProblemId: string) {
        super('UpdateCasePreProblemAction')
    }

    preValidateAction()
    {
        this.validationContext.addRule(
            new IsNotNullOrUndefined(
                'Input',
                'Input should have values',
                this.casePreProblem,
                true
            )
        ).addRule(
            new CellIdIsValidRule(
                'Id',
                'Id should be a CUID and not null',
                this.casePreProblemId,
                true
                )
        )
    }

    performAction()
    {
        this.response = this.businessProvider.data.userUpdateCasePreProblem({casePreProblemId: this.casePreProblemId, input: this.casePreProblem }).pipe(
                switchMap(() => of(true))
            )
    }
}
