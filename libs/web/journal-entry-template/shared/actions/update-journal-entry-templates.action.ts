
import {IsNotNullOrUndefined,IsNumber, StringIsValidDateString, CellIdIsValidRule } from '@schema-driven/rules-engine'
import {of} from 'rxjs'
import {JournalEntryTemplateBusinessActionBase} from './journal-entry-template.business-action-base'
import {JournalEntryTemplateNameIsValidRule} from '../rules/journal-entry-template-name-is-valid.rule';
import {switchMap} from 'rxjs';
import {UserUpdateJournalEntryTemplateInput, UpdateResult} from '@case-clinical/shared/util/sdk';

export class UpdateJournalEntryTemplatesAction extends JournalEntryTemplateBusinessActionBase<UpdateResult> {

    constructor(private journalEntryTemplates: UserUpdateJournalEntryTemplateInput[]) {
        super('UpdateJournalEntryTemplatesAction')
    }

    preValidateAction()
    {
        this.validationContext.addRule(
            new IsNotNullOrUndefined(
                'Input',
                'Input should have values',
                this.journalEntryTemplates,
                true
            )
        )
    }

    performAction()
    {
        this.response = this.businessProvider.data.userUpdateJournalEntryTemplates({ input: { journalEntryTemplates: this.journalEntryTemplates} }).pipe(
                switchMap((response) => of(response.data.updated))
            )
    }
}

export class UpdateJournalEntryTemplateAction extends JournalEntryTemplateBusinessActionBase<boolean> {

    constructor(private journalEntryTemplate: UserUpdateJournalEntryTemplateInput, private journalEntryTemplateId: string) {
        super('UpdateJournalEntryTemplateAction')
    }

    preValidateAction()
    {
        this.validationContext.addRule(
            new IsNotNullOrUndefined(
                'Input',
                'Input should have values',
                this.journalEntryTemplate,
                true
            )
        ).addRule(
            new CellIdIsValidRule(
                'Id',
                'Id should be a CUID and not null',
                this.journalEntryTemplateId,
                true
                )
        )
    }

    performAction()
    {
        this.response = this.businessProvider.data.userUpdateJournalEntryTemplate({journalEntryTemplateId: this.journalEntryTemplateId, input: this.journalEntryTemplate }).pipe(
                switchMap((response) => of(response.data.updated))
            )
    }
}
