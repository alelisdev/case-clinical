
import {IsNotNullOrUndefined,IsNumber, StringIsValidDateString, CellIdIsValidRule } from '@schema-driven/rules-engine'
import {of} from 'rxjs'
import {GuidelineBusinessActionBase} from './guideline.business-action-base'
import {GuidelineNameIsValidRule} from '../rules/guideline-name-is-valid.rule';
import {switchMap} from 'rxjs';
import {UserUpdateGuidelineInput, UpdateResult} from '@case-clinical/shared/util/sdk';

export class UpdateGuidelinesAction extends GuidelineBusinessActionBase<UpdateResult> {

    constructor(private guidelines: UserUpdateGuidelineInput[]) {
        super('UpdateGuidelinesAction')
    }

    preValidateAction()
    {
        this.validationContext.addRule(
            new IsNotNullOrUndefined(
                'Input',
                'Input should have values',
                this.guidelines,
                true
            )
        )
    }

    performAction()
    {
        this.response = this.businessProvider.data.userUpdateGuidelines({ input: { guidelines: this.guidelines} }).pipe(
                switchMap((response) => of(response.data.updated))
            )
    }
}

export class UpdateGuidelineAction extends GuidelineBusinessActionBase<boolean> {

    constructor(private guideline: UserUpdateGuidelineInput, private guidelineId: string) {
        super('UpdateGuidelineAction')
    }

    preValidateAction()
    {
        this.validationContext.addRule(
            new IsNotNullOrUndefined(
                'Input',
                'Input should have values',
                this.guideline,
                true
            )
        ).addRule(
            new CellIdIsValidRule(
                'Id',
                'Id should be a CUID and not null',
                this.guidelineId,
                true
                )
        )
    }

    performAction()
    {
        this.response = this.businessProvider.data.userUpdateGuideline({guidelineId: this.guidelineId, input: this.guideline }).pipe(
                switchMap((response) => of(response.data.updated))
            )
    }
}
