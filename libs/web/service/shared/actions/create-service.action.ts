
import {ServiceBusinessActionBase} from './service.business-action-base'
import {Service,UserCreateServiceInput} from '@case-clinical/shared/util/sdk'
import {catchError,EMPTY, switchMap } from 'rxjs'
import {of} from 'zen-observable'
import {CreateServiceInputIsValidRule} from '../rules/create-service-input-is-valid.rule'

export class CreateServiceAction extends ServiceBusinessActionBase<Service> {
  constructor(private input: UserCreateServiceInput) {
    super('CreateServiceAction')
  }

  preValidateAction() {
    this.validationContext.addRule(
      new CreateServiceInputIsValidRule(
        'InputIsNotNull', 
        'The input information is not valid.', 
        this.input, 
        this.showRuleMessages
      )
    )
  }

  performAction() {
    this.response = this.businessProvider.data.userCreateService({ input: this.input }).pipe
    (
        switchMap((result) => {
            return of(result.data.created)
        })
    )    
  }
}


