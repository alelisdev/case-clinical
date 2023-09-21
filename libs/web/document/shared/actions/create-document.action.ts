
import {DocumentBusinessActionBase} from './document.business-action-base'
import {Document,UserCreateDocumentInput} from '@case-clinical/shared/util/sdk'
import {catchError,EMPTY, switchMap } from 'rxjs'
import {of} from 'zen-observable'
import {CreateDocumentInputIsValidRule} from '../rules/create-document-input-is-valid.rule'

export class CreateDocumentAction extends DocumentBusinessActionBase<Document> {
  constructor(private input: UserCreateDocumentInput) {
    super('CreateDocumentAction')
  }

  preValidateAction() {
    this.validationContext.addRule(
      new CreateDocumentInputIsValidRule(
        'InputIsNotNull', 
        'The input information is not valid.', 
        this.input, 
        this.showRuleMessages
      )
    )
  }

  performAction() {
    this.response = this.businessProvider.data.userCreateDocument({ input: this.input }).pipe
    (
        switchMap((result) => {
            return of(result.data.created)
        })
    )    
  }
}


