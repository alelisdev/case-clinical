
import {GenderBusinessActionBase} from './gender.business-action-base'
import {Gender,UserCreateGenderInput} from '@case-clinical/shared/util/sdk'
import {catchError,EMPTY, switchMap } from 'rxjs'
import {of} from 'zen-observable'
import {CreateGenderInputIsValidRule} from '../rules/create-gender-input-is-valid.rule'

export class CreateGenderAction extends GenderBusinessActionBase<Gender> {
  constructor(private input: UserCreateGenderInput) {
    super('CreateGenderAction')
  }

  preValidateAction() {
    this.validationContext.addRule(
      new CreateGenderInputIsValidRule(
        'InputIsNotNull', 
        'The input information is not valid.', 
        this.input, 
        this.showRuleMessages
      )
    )
  }

  performAction() {
    this.response = this.businessProvider.data.userCreateGender({ input: this.input }).pipe
    (
        switchMap((result) => {
            return of(result.data.created)
        })
    )    
  }
}


