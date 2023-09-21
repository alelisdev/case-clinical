
import {RequestAdditionalVisitBusinessActionBase} from './request-additional-visit.business-action-base'
import {RequestAdditionalVisit,UserCreateRequestAdditionalVisitInput} from '@case-clinical/shared/util/sdk'
import {catchError,EMPTY, switchMap } from 'rxjs'
import {of} from 'zen-observable'
import {CreateRequestAdditionalVisitInputIsValidRule} from '../rules/create-request-additional-visit-input-is-valid.rule'

export class CreateRequestAdditionalVisitAction extends RequestAdditionalVisitBusinessActionBase<RequestAdditionalVisit> {
  constructor(private input: UserCreateRequestAdditionalVisitInput) {
    super('CreateRequestAdditionalVisitAction')
  }

  preValidateAction() {
    this.validationContext.addRule(
      new CreateRequestAdditionalVisitInputIsValidRule(
        'InputIsNotNull', 
        'The input information is not valid.', 
        this.input, 
        this.showRuleMessages
      )
    )
  }

  performAction() {
    this.response = this.businessProvider.data.userCreateRequestAdditionalVisit({ input: this.input }).pipe
    (
        switchMap((result) => {
            return of(result.data.created)
        })
    )    
  }
}


