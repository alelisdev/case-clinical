
import {IsNotNullOrUndefined,IsNumber, StringIsValidDateString, CellIdIsValidRule } from '@schema-driven/rules-engine'
import {of} from 'rxjs'
import {TemplateBusinessActionBase} from './template.business-action-base'
import {TemplateNameIsValidRule} from '../rules/template-name-is-valid.rule';
import {switchMap} from 'rxjs';
import {UserUpdateTemplateInput} from '@case-clinical/shared/util/sdk';

export class UpdateTemplatesAction extends TemplateBusinessActionBase<boolean> {

    constructor(private templates: UserUpdateTemplateInput[]) {
        super('UpdateTemplatesAction')
    }

    preValidateAction()
    {
        this.validationContext.addRule(
            new IsNotNullOrUndefined(
                'Input',
                'Input should have values',
                this.templates,
                true
            )
        )
    }

    performAction()
    {
        this.response = this.businessProvider.data.userUpdateTemplates({ input: { templates: this.templates} }).pipe(
                switchMap(() => of(true))
            )
    }
}

export class UpdateTemplateAction extends TemplateBusinessActionBase<boolean> {

    constructor(private template: UserUpdateTemplateInput, private templateId: string) {
        super('UpdateTemplateAction')
    }

    preValidateAction()
    {
        this.validationContext.addRule(
            new IsNotNullOrUndefined(
                'Input',
                'Input should have values',
                this.template,
                true
            )
        ).addRule(
            new CellIdIsValidRule(
                'Id',
                'Id should be a CUID and not null',
                this.templateId,
                true
                )
        )
    }

    performAction()
    {
        this.response = this.businessProvider.data.userUpdateTemplate({templateId: this.templateId, input: this.template }).pipe(
                switchMap(() => of(true))
            )
    }
}
