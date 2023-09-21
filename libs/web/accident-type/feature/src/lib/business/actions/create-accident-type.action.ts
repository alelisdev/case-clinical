
import {AccidentTypeBusinessActionBase} from './accident-type.business-action-base'
import {AccidentType,UserCreateAccidentTypeInput} from '@case-clinical/shared/util/sdk'
import {catchError,EMPTY, switchMap } from 'rxjs'
import {of} from 'zen-observable'
import {CreateAccidentTypeInputIsValidRule} from '../rules/create-accident-type-input-is-valid.rule'

export class CreateAccidentTypeAction extends AccidentTypeBusinessActionBase<AccidentType> {constructor(private input: UserCreateAccidentTypeInput) {
    super('CreateAccidentTypeAction')
  }

  preValidateAction() {
    this.validationContext.addRule(
      new CreateAccidentTypeInputIsValidRule(
        'InputIsNotNull', 
        'The input information is not valid.', 
        this.input, 
        this.showRuleMessages
      )
    )
  }

  performAction() {
    this.response = this.businessProvider.data.userCreateAccidentType({ input: this.input }).pipe
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


