
import {IsNotNullOrUndefined,IsNumber, StringIsValidDateString, CellIdIsValidRule } from '@schema-driven/rules-engine'
import {of} from 'rxjs'
import {GuidelineUsedBusinessActionBase} from './guideline-used.business-action-base'
import {GuidelineUsedNameIsValidRule} from '../rules/guideline-used-name-is-valid.rule';
import {switchMap} from 'rxjs';
import {UserUpdateGuidelineUsedInput} from '@case-clinical/shared/util/sdk';

export class UpdateGuidelineUsedsAction extends GuidelineUsedBusinessActionBase<boolean> {

    constructor(private guidelineUseds: UserUpdateGuidelineUsedInput[]) {
        super('UpdateGuidelineUsedsAction')
    }

    preValidateAction()
    {
        this.validationContext.addRule(
            new IsNotNullOrUndefined(
                'Input',
                'Input should have values',
                this.guidelineUseds,
                true
            )
        )
    }

    performAction()
    {
        this.response = this.businessProvider.data.userUpdateGuidelineUseds({ input: { guidelineUseds: this.guidelineUseds} }).pipe(
                switchMap(() => of(true))
            )
    }
}

export class UpdateGuidelineUsedAction extends GuidelineUsedBusinessActionBase<boolean> {

    constructor(private guidelineUsed: UserUpdateGuidelineUsedInput, private guidelineUsedId: string) {
        super('UpdateGuidelineUsedAction')
    }

    preValidateAction()
    {
        this.validationContext.addRule(
            new IsNotNullOrUndefined(
                'Input',
                'Input should have values',
                this.guidelineUsed,
                true
            )
        ).addRule(
            new CellIdIsValidRule(
                'Id',
                'Id should be a CUID and not null',
                this.guidelineUsedId,
                true
                )
        )
    }

    performAction()
    {
        this.response = this.businessProvider.data.userUpdateGuidelineUsed({guidelineUsedId: this.guidelineUsedId, input: this.guidelineUsed }).pipe(
                switchMap(() => of(true))
            )
    }
}
