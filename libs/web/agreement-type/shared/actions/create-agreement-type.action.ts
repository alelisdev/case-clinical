
import {AgreementTypeBusinessActionBase} from './agreement-type.business-action-base'
import {AgreementType,UserCreateAgreementTypeInput} from '@case-clinical/shared/util/sdk'
import {catchError,EMPTY, switchMap } from 'rxjs'
import {of} from 'zen-observable'
import {CreateAgreementTypeInputIsValidRule} from '../rules/create-agreement-type-input-is-valid.rule'

export class CreateAgreementTypeAction extends AgreementTypeBusinessActionBase<AgreementType> {
  constructor(private input: UserCreateAgreementTypeInput) {
    super('CreateAgreementTypeAction')
  }

  preValidateAction() {
    this.validationContext.addRule(
      new CreateAgreementTypeInputIsValidRule(
        'InputIsNotNull', 
        'The input information is not valid.', 
        this.input, 
        this.showRuleMessages
      )
    )
  }

  performAction() {
    this.response = this.businessProvider.data.userCreateAgreementType({ input: this.input }).pipe
    (
        switchMap((result) => {
            return of(result.data.created)
        })
    )    
  }
}


