
import {RequiredFieldBusinessActionBase} from './required-field.business-action-base'
import {RequiredField,UserCreateRequiredFieldInput} from '@case-clinical/shared/util/sdk'
import {catchError,EMPTY, switchMap } from 'rxjs'
import {of} from 'zen-observable'
import {CreateRequiredFieldInputIsValidRule} from '../rules/create-required-field-input-is-valid.rule'

export class CreateRequiredFieldAction extends RequiredFieldBusinessActionBase<RequiredField> {
  constructor(private input: UserCreateRequiredFieldInput) {
    super('CreateRequiredFieldAction')
  }

  preValidateAction() {
    this.validationContext.addRule(
      new CreateRequiredFieldInputIsValidRule(
        'InputIsNotNull', 
        'The input information is not valid.', 
        this.input, 
        this.showRuleMessages
      )
    )
  }

  performAction() {
    this.response = this.businessProvider.data.userCreateRequiredField({ input: this.input }).pipe
    (
        switchMap((result) => {
            return of(result.data.created)
        })
    )    
  }
}


