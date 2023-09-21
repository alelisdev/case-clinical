
import {JournalEntryBusinessActionBase} from './journal-entry.business-action-base'
import {JournalEntry,UserCreateJournalEntryInput} from '@case-clinical/shared/util/sdk'
import {catchError,EMPTY, switchMap } from 'rxjs'
import {of} from 'zen-observable'
import {CreateJournalEntryInputIsValidRule} from '../rules/create-journal-entry-input-is-valid.rule'

export class CreateJournalEntryAction extends JournalEntryBusinessActionBase<JournalEntry> {constructor(private input: UserCreateJournalEntryInput) {
    super('CreateJournalEntryAction')
  }

  preValidateAction() {
    this.validationContext.addRule(
      new CreateJournalEntryInputIsValidRule(
        'InputIsNotNull', 
        'The input information is not valid.', 
        this.input, 
        this.showRuleMessages
      )
    )
  }

  performAction() {
    this.response = this.businessProvider.data.userCreateJournalEntry({ input: this.input }).pipe
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


