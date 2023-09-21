
import {InsuranceSectorBusinessActionBase} from './insurance-sector.business-action-base'
import {InsuranceSector,UserCreateInsuranceSectorInput} from '@case-clinical/shared/util/sdk'
import {catchError,EMPTY, switchMap } from 'rxjs'
import {of} from 'zen-observable'
import {CreateInsuranceSectorInputIsValidRule} from '../rules/create-insurance-sector-input-is-valid.rule'

export class CreateInsuranceSectorAction extends InsuranceSectorBusinessActionBase<InsuranceSector> {
  constructor(private input: UserCreateInsuranceSectorInput) {
    super('CreateInsuranceSectorAction')
  }

  preValidateAction() {
    this.validationContext.addRule(
      new CreateInsuranceSectorInputIsValidRule(
        'InputIsNotNull', 
        'The input information is not valid.', 
        this.input, 
        this.showRuleMessages
      )
    )
  }

  performAction() {
    this.response = this.businessProvider.data.userCreateInsuranceSector({ input: this.input }).pipe
    (
        switchMap((result) => {
            return of(result.data.created)
        })
    )    
  }
}


