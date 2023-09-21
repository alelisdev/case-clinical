
import {DocumentTypeBusinessActionBase} from './document-type.business-action-base'
import {DocumentType,UserCreateDocumentTypeInput} from '@case-clinical/shared/util/sdk'
import {catchError,EMPTY, switchMap } from 'rxjs'
import {of} from 'zen-observable'
import {CreateDocumentTypeInputIsValidRule} from '../rules/create-document-type-input-is-valid.rule'

export class CreateDocumentTypeAction extends DocumentTypeBusinessActionBase<DocumentType> {
  constructor(private input: UserCreateDocumentTypeInput) {
    super('CreateDocumentTypeAction')
  }

  preValidateAction() {
    this.validationContext.addRule(
      new CreateDocumentTypeInputIsValidRule(
        'InputIsNotNull', 
        'The input information is not valid.', 
        this.input, 
        this.showRuleMessages
      )
    )
  }

  performAction() {
    this.response = this.businessProvider.data.userCreateDocumentType({ input: this.input }).pipe
    (
        switchMap((result) => {
            return of(result.data.created)
        })
    )    
  }
}


