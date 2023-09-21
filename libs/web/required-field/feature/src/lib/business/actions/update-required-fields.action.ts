
import {IsNotNullOrUndefined,IsNumber, StringIsValidDateString, CellIdIsValidRule } from '@schema-driven/rules-engine'
import {of} from 'rxjs'
import {RequiredFieldBusinessActionBase} from './required-field.business-action-base'
import {RequiredFieldNameIsValidRule} from '../rules/required-field-name-is-valid.rule';
import {switchMap} from 'rxjs';
import {UserUpdateRequiredFieldInput} from '@case-clinical/shared/util/sdk';

export class UpdateRequiredFieldsAction extends RequiredFieldBusinessActionBase<boolean> {

    constructor(private requiredFields: UserUpdateRequiredFieldInput[]) {
        super('UpdateRequiredFieldsAction')
    }

    preValidateAction()
    {
        this.validationContext.addRule(
            new IsNotNullOrUndefined(
                'Input',
                'Input should have values',
                this.requiredFields,
                true
            )
        )
    }

    performAction()
    {
        this.response = this.businessProvider.data.userUpdateRequiredFields({ input: { requiredFields: this.requiredFields} }).pipe(
                switchMap(() => of(true))
            )
    }
}

export class UpdateRequiredFieldAction extends RequiredFieldBusinessActionBase<boolean> {

    constructor(private requiredField: UserUpdateRequiredFieldInput, private requiredFieldId: string) {
        super('UpdateRequiredFieldAction')
    }

    preValidateAction()
    {
        this.validationContext.addRule(
            new IsNotNullOrUndefined(
                'Input',
                'Input should have values',
                this.requiredField,
                true
            )
        ).addRule(
            new CellIdIsValidRule(
                'Id',
                'Id should be a CUID and not null',
                this.requiredFieldId,
                true
                )
        )
    }

    performAction()
    {
        this.response = this.businessProvider.data.userUpdateRequiredField({requiredFieldId: this.requiredFieldId, input: this.requiredField }).pipe(
                switchMap(() => of(true))
            )
    }
}
