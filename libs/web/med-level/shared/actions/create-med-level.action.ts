
import {MedLevelBusinessActionBase} from './med-level.business-action-base'
import {MedLevel,UserCreateMedLevelInput} from '@case-clinical/shared/util/sdk'
import {catchError,EMPTY, switchMap } from 'rxjs'
import {of} from 'zen-observable'
import {CreateMedLevelInputIsValidRule} from '../rules/create-med-level-input-is-valid.rule'

export class CreateMedLevelAction extends MedLevelBusinessActionBase<MedLevel> {
  constructor(private input: UserCreateMedLevelInput) {
    super('CreateMedLevelAction')
  }

  preValidateAction() {
    this.validationContext.addRule(
      new CreateMedLevelInputIsValidRule(
        'InputIsNotNull', 
        'The input information is not valid.', 
        this.input, 
        this.showRuleMessages
      )
    )
  }

  performAction() {
    this.response = this.businessProvider.data.userCreateMedLevel({ input: this.input }).pipe
    (
        switchMap((result) => {
            return of(result.data.created)
        })
    )    
  }
}


