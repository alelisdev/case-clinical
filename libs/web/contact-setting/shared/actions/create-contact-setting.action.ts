
import {ContactSettingBusinessActionBase} from './contact-setting.business-action-base'
import {ContactSetting,UserCreateContactSettingInput} from '@case-clinical/shared/util/sdk'
import {catchError,EMPTY, switchMap } from 'rxjs'
import {of} from 'zen-observable'
import {CreateContactSettingInputIsValidRule} from '../rules/create-contact-setting-input-is-valid.rule'

export class CreateContactSettingAction extends ContactSettingBusinessActionBase<ContactSetting> {
  constructor(private input: UserCreateContactSettingInput) {
    super('CreateContactSettingAction')
  }

  preValidateAction() {
    this.validationContext.addRule(
      new CreateContactSettingInputIsValidRule(
        'InputIsNotNull', 
        'The input information is not valid.', 
        this.input, 
        this.showRuleMessages
      )
    )
  }

  performAction() {
    this.response = this.businessProvider.data.userCreateContactSetting({ input: this.input }).pipe
    (
        switchMap((result) => {
            return of(result.data.created)
        })
    )    
  }
}


