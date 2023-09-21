
import {IsNotNullOrUndefined,IsNumber, StringIsValidDateString, CellIdIsValidRule } from '@schema-driven/rules-engine'
import {of} from 'rxjs'
import {ContactEmailBusinessActionBase} from './contact-email.business-action-base'
import {ContactEmailNameIsValidRule} from '../rules/contact-email-name-is-valid.rule';
import {switchMap} from 'rxjs';
import {UserUpdateContactEmailInput, UpdateResult} from '@case-clinical/shared/util/sdk';

export class UpdateContactEmailsAction extends ContactEmailBusinessActionBase<UpdateResult> {

    constructor(private contactEmails: UserUpdateContactEmailInput[]) {
        super('UpdateContactEmailsAction')
    }

    preValidateAction()
    {
        this.validationContext.addRule(
            new IsNotNullOrUndefined(
                'Input',
                'Input should have values',
                this.contactEmails,
                true
            )
        )
    }

    performAction()
    {
        this.response = this.businessProvider.data.userUpdateContactEmails({ input: { contactEmails: this.contactEmails} }).pipe(
                switchMap((response) => of(response.data.updated))
            )
    }
}

export class UpdateContactEmailAction extends ContactEmailBusinessActionBase<boolean> {

    constructor(private contactEmail: UserUpdateContactEmailInput, private contactEmailId: string) {
        super('UpdateContactEmailAction')
    }

    preValidateAction()
    {
        this.validationContext.addRule(
            new IsNotNullOrUndefined(
                'Input',
                'Input should have values',
                this.contactEmail,
                true
            )
        ).addRule(
            new CellIdIsValidRule(
                'Id',
                'Id should be a CUID and not null',
                this.contactEmailId,
                true
                )
        )
    }

    performAction()
    {
        this.response = this.businessProvider.data.userUpdateContactEmail({contactEmailId: this.contactEmailId, input: this.contactEmail }).pipe(
                switchMap((response) => of(response.data.updated))
            )
    }
}
