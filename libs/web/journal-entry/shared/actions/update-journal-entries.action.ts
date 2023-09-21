
import {IsNotNullOrUndefined,IsNumber, StringIsValidDateString, CellIdIsValidRule } from '@schema-driven/rules-engine'
import {of} from 'rxjs'
import {JournalEntryBusinessActionBase} from './journal-entry.business-action-base'
import {JournalEntryNameIsValidRule} from '../rules/journal-entry-name-is-valid.rule';
import {switchMap} from 'rxjs';
import {UserUpdateJournalEntryInput, UpdateResult} from '@case-clinical/shared/util/sdk';

export class UpdateJournalEntriesAction extends JournalEntryBusinessActionBase<UpdateResult> {

    constructor(private journalEntries: UserUpdateJournalEntryInput[]) {
        super('UpdateJournalEntriesAction')
    }

    preValidateAction()
    {
        this.validationContext.addRule(
            new IsNotNullOrUndefined(
                'Input',
                'Input should have values',
                this.journalEntries,
                true
            )
        )
    }

    performAction()
    {
        this.response = this.businessProvider.data.userUpdateJournalEntries({ input: { journalEntries: this.journalEntries} }).pipe(
                switchMap((response) => of(response.data.updated))
            )
    }
}

export class UpdateJournalEntryAction extends JournalEntryBusinessActionBase<boolean> {

    constructor(private journalEntry: UserUpdateJournalEntryInput, private journalEntryId: string) {
        super('UpdateJournalEntryAction')
    }

    preValidateAction()
    {
        this.validationContext.addRule(
            new IsNotNullOrUndefined(
                'Input',
                'Input should have values',
                this.journalEntry,
                true
            )
        ).addRule(
            new CellIdIsValidRule(
                'Id',
                'Id should be a CUID and not null',
                this.journalEntryId,
                true
                )
        )
    }

    performAction()
    {
        this.response = this.businessProvider.data.userUpdateJournalEntry({journalEntryId: this.journalEntryId, input: this.journalEntry }).pipe(
                switchMap((response) => of(response.data.updated))
            )
    }
}
