
import {IsNotNullOrUndefined,IsNumber, StringIsValidDateString, CellIdIsValidRule } from '@schema-driven/rules-engine'
import {of} from 'rxjs'
import {TemplateBusinessActionBase} from './template.business-action-base'
import {TemplateNameIsValidRule} from '../rules/template-name-is-valid.rule';
import {switchMap} from 'rxjs';
import {UserUpdateTemplateInput, UpdateResult} from '@case-clinical/shared/util/sdk';

export class UpdateTemplatesAction extends TemplateBusinessActionBase<UpdateResult> {

    constructor(private teamUsers: UserUpdateTemplateInput[]) {
        super('UpdateTemplatesAction')
    }

    preValidateAction()
    {
        this.validationContext.addRule(
            new IsNotNullOrUndefined(
                'Input',
                'Input should have values',
                this.teamUsers,
                true
            )
        )
    }

    performAction()
    {
        // this.response = this.businessProvider.data.userUpdateTemplates({ input: { teamUsers: this.teamUsers} }).pipe(
        //         switchMap((response) => of(response.data.updated))
        //     )
    }
}

export class UpdateTemplateAction extends TemplateBusinessActionBase<boolean> {

    constructor(private teamUser: UserUpdateTemplateInput, private teamUserId: string) {
        super('UpdateTemplateAction')
    }

    preValidateAction()
    {
        this.validationContext.addRule(
            new IsNotNullOrUndefined(
                'Input',
                'Input should have values',
                this.teamUser,
                true
            )
        ).addRule(
            new CellIdIsValidRule(
                'Id',
                'Id should be a CUID and not null',
                this.teamUserId,
                true
                )
        )
    }

    performAction()
    {
        // this.response = this.businessProvider.data.userUpdateTemplate({teamUserId: this.teamUserId, input: this.teamUser }).pipe(
        //         switchMap((response) => of(response.data.updated))
        //     )
    }
}
