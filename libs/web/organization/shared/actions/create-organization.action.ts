
import {OrganizationBusinessActionBase} from './organization.business-action-base'
import {Organization,UserCreateOrganizationInput} from '@case-clinical/shared/util/sdk'
import {catchError,EMPTY, switchMap } from 'rxjs'
import {of} from 'zen-observable'
import {CreateOrganizationInputIsValidRule} from '../rules/create-organization-input-is-valid.rule'

export class CreateOrganizationAction extends OrganizationBusinessActionBase<Organization> {
  constructor(private input: UserCreateOrganizationInput) {
    super('CreateOrganizationAction')
  }

  preValidateAction() {
    this.validationContext.addRule(
      new CreateOrganizationInputIsValidRule(
        'InputIsNotNull', 
        'The input information is not valid.', 
        this.input, 
        this.showRuleMessages
      )
    )
  }

  performAction() {
    this.response = this.businessProvider.data.userCreateOrganization({ input: this.input }).pipe
    (
        switchMap((result) => {
            return of(result.data.created)
        })
    )    
  }
}


