
import {JournalEntryTemplateBusinessActionBase} from './journal-entry-template.business-action-base'
import {JournalEntryTemplate,UserCreateJournalEntryTemplateInput} from '@case-clinical/shared/util/sdk'
import {catchError,EMPTY, switchMap } from 'rxjs'
import {of} from 'zen-observable'
import {CreateJournalEntryTemplateInputIsValidRule} from '../rules/create-journal-entry-template-input-is-valid.rule'

export class CreateJournalEntryTemplateAction extends JournalEntryTemplateBusinessActionBase<JournalEntryTemplate> {
  constructor(private input: UserCreateJournalEntryTemplateInput) {
    super('CreateJournalEntryTemplateAction')
  }

  preValidateAction() {
    this.validationContext.addRule(
      new CreateJournalEntryTemplateInputIsValidRule(
        'InputIsNotNull', 
        'The input information is not valid.', 
        this.input, 
        this.showRuleMessages
      )
    )
  }

  performAction() {
    this.response = this.businessProvider.data.userCreateJournalEntryTemplate({ input: this.input }).pipe
    (
        switchMap((result) => {
            return of(result.data.created)
        })
    )    
  }
}


