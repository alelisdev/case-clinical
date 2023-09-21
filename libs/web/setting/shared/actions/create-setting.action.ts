
import {SettingBusinessActionBase} from './setting.business-action-base'
import {Setting,UserCreateSettingInput} from '@case-clinical/shared/util/sdk'
import {catchError,EMPTY, switchMap } from 'rxjs'
import {of} from 'zen-observable'
import {CreateSettingInputIsValidRule} from '../rules/create-setting-input-is-valid.rule'

export class CreateSettingAction extends SettingBusinessActionBase<Setting> {
  constructor(private input: UserCreateSettingInput) {
    super('CreateSettingAction')
  }

  preValidateAction() {
    this.validationContext.addRule(
      new CreateSettingInputIsValidRule(
        'InputIsNotNull', 
        'The input information is not valid.', 
        this.input, 
        this.showRuleMessages
      )
    )
  }

  performAction() {
    this.response = this.businessProvider.data.userCreateSetting({ input: this.input }).pipe
    (
        switchMap((result) => {
            return of(result.data.created)
        })
    )    
  }
}


