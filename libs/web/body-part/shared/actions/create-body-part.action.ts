
import {BodyPartBusinessActionBase} from './body-part.business-action-base'
import {BodyPart,UserCreateBodyPartInput} from '@case-clinical/shared/util/sdk'
import {catchError,EMPTY, switchMap } from 'rxjs'
import {of} from 'zen-observable'
import {CreateBodyPartInputIsValidRule} from '../rules/create-body-part-input-is-valid.rule'

export class CreateBodyPartAction extends BodyPartBusinessActionBase<BodyPart> {
  constructor(private input: UserCreateBodyPartInput) {
    super('CreateBodyPartAction')
  }

  preValidateAction() {
    this.validationContext.addRule(
      new CreateBodyPartInputIsValidRule(
        'InputIsNotNull', 
        'The input information is not valid.', 
        this.input, 
        this.showRuleMessages
      )
    )
  }

  performAction() {
    this.response = this.businessProvider.data.userCreateBodyPart({ input: this.input }).pipe
    (
        switchMap((result) => {
            return of(result.data.created)
        })
    )    
  }
}


