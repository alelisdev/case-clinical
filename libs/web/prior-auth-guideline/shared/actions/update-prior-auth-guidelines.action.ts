
import {IsNotNullOrUndefined,IsNumber, StringIsValidDateString, CellIdIsValidRule } from '@schema-driven/rules-engine'
import {of} from 'rxjs'
import {PriorAuthGuidelineBusinessActionBase} from './prior-auth-guideline.business-action-base'
import {PriorAuthGuidelineNameIsValidRule} from '../rules/prior-auth-guideline-name-is-valid.rule';
import {switchMap} from 'rxjs';
import {UserUpdatePriorAuthGuidelineInput, UpdateResult} from '@case-clinical/shared/util/sdk';

export class UpdatePriorAuthGuidelinesAction extends PriorAuthGuidelineBusinessActionBase<UpdateResult> {

    constructor(private priorAuthGuidelines: UserUpdatePriorAuthGuidelineInput[]) {
        super('UpdatePriorAuthGuidelinesAction')
    }

    preValidateAction()
    {
        this.validationContext.addRule(
            new IsNotNullOrUndefined(
                'Input',
                'Input should have values',
                this.priorAuthGuidelines,
                true
            )
        )
    }

    performAction()
    {
        this.response = this.businessProvider.data.userUpdatePriorAuthGuidelines({ input: { priorAuthGuidelines: this.priorAuthGuidelines} }).pipe(
                switchMap((response) => of(response.data.updated))
            )
    }
}

export class UpdatePriorAuthGuidelineAction extends PriorAuthGuidelineBusinessActionBase<boolean> {

    constructor(private priorAuthGuideline: UserUpdatePriorAuthGuidelineInput, private priorAuthGuidelineId: string) {
        super('UpdatePriorAuthGuidelineAction')
    }

    preValidateAction()
    {
        this.validationContext.addRule(
            new IsNotNullOrUndefined(
                'Input',
                'Input should have values',
                this.priorAuthGuideline,
                true
            )
        ).addRule(
            new CellIdIsValidRule(
                'Id',
                'Id should be a CUID and not null',
                this.priorAuthGuidelineId,
                true
                )
        )
    }

    performAction()
    {
        this.response = this.businessProvider.data.userUpdatePriorAuthGuideline({priorAuthGuidelineId: this.priorAuthGuidelineId, input: this.priorAuthGuideline }).pipe(
                switchMap((response) => of(response.data.updated))
            )
    }
}
