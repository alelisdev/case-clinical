
import {TemplateBusinessActionBase} from './template.business-action-base'
import {Template,UserCreateTemplateInput} from '@case-clinical/shared/util/sdk'
import {catchError,EMPTY, switchMap } from 'rxjs'
import {of} from 'zen-observable'
import {CreateTemplateInputIsValidRule} from '../rules/create-template-input-is-valid.rule'

export class CreateTemplateAction extends TemplateBusinessActionBase<Template> {constructor(private input: UserCreateTemplateInput) {
    super('CreateTemplateAction')
  }

  preValidateAction() {
    this.validationContext.addRule(
      new CreateTemplateInputIsValidRule(
        'InputIsNotNull', 
        'The input information is not valid.', 
        this.input, 
        this.showRuleMessages
      )
    )
  }

  performAction() {
    this.response = this.businessProvider.data.userCreateTemplate({ input: this.input }).pipe
    (
        catchError(() => {
            this.response = this.createFailResponse();
            return EMPTY;
        }),
        switchMap((result) => {
            return of(result.data.created)
        })
    )    
  }
}


