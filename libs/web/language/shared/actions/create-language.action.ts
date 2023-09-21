
import {LanguageBusinessActionBase} from './language.business-action-base'
import {Language,UserCreateLanguageInput} from '@case-clinical/shared/util/sdk'
import {catchError,EMPTY, switchMap } from 'rxjs'
import {of} from 'zen-observable'
import {CreateLanguageInputIsValidRule} from '../rules/create-language-input-is-valid.rule'

export class CreateLanguageAction extends LanguageBusinessActionBase<Language> {
  constructor(private input: UserCreateLanguageInput) {
    super('CreateLanguageAction')
  }

  preValidateAction() {
    this.validationContext.addRule(
      new CreateLanguageInputIsValidRule(
        'InputIsNotNull', 
        'The input information is not valid.', 
        this.input, 
        this.showRuleMessages
      )
    )
  }

  performAction() {
    this.response = this.businessProvider.data.userCreateLanguage({ input: this.input }).pipe
    (
        switchMap((result) => {
            return of(result.data.created)
        })
    )    
  }
}


