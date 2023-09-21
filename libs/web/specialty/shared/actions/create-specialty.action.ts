
import {SpecialtyBusinessActionBase} from './specialty.business-action-base'
import {Specialty,UserCreateSpecialtyInput} from '@case-clinical/shared/util/sdk'
import {catchError,EMPTY, switchMap } from 'rxjs'
import {of} from 'zen-observable'
import {CreateSpecialtyInputIsValidRule} from '../rules/create-specialty-input-is-valid.rule'

export class CreateSpecialtyAction extends SpecialtyBusinessActionBase<Specialty> {
  constructor(private input: UserCreateSpecialtyInput) {
    super('CreateSpecialtyAction')
  }

  preValidateAction() {
    this.validationContext.addRule(
      new CreateSpecialtyInputIsValidRule(
        'InputIsNotNull', 
        'The input information is not valid.', 
        this.input, 
        this.showRuleMessages
      )
    )
  }

  performAction() {
    this.response = this.businessProvider.data.userCreateSpecialty({ input: this.input }).pipe
    (
        switchMap((result) => {
            return of(result.data.created)
        })
    )    
  }
}


