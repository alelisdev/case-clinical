
import {IsNotNullOrUndefined,IsNumber, StringIsValidDateString, CellIdIsValidRule } from '@schema-driven/rules-engine'
import {of} from 'rxjs'
import {ContactBusinessActionBase} from './contact.business-action-base'
import {ContactNameIsValidRule} from '../rules/contact-name-is-valid.rule';
import {switchMap} from 'rxjs';
import {UserUpdateContactInput, UpdateResult} from '@case-clinical/shared/util/sdk';

export class UpdateContactsAction extends ContactBusinessActionBase<UpdateResult> {

    constructor(private contacts: UserUpdateContactInput[]) {
        super('UpdateContactsAction')
    }

    preValidateAction()
    {
        this.validationContext.addRule(
            new IsNotNullOrUndefined(
                'Input',
                'Input should have values',
                this.contacts,
                true
            )
        )
    }

    performAction()
    {
        this.response = this.businessProvider.data.userUpdateContacts({ input: { contacts: this.contacts} }).pipe(
                switchMap((response) => of(response.data.updated))
            )
    }
}

export class UpdateContactAction extends ContactBusinessActionBase<boolean> {

    constructor(private contact: UserUpdateContactInput, private contactId: string) {
        super('UpdateContactAction')
    }

    preValidateAction()
    {
        this.validationContext.addRule(
            new IsNotNullOrUndefined(
                'Input',
                'Input should have values',
                this.contact,
                true
            )
        ).addRule(
            new CellIdIsValidRule(
                'Id',
                'Id should be a CUID and not null',
                this.contactId,
                true
                )
        )
    }

    performAction()
    {
        this.response = this.businessProvider.data.userUpdateContact({contactId: this.contactId, input: this.contact }).pipe(
                switchMap((response) => of(response.data.updated))
            )
    }
}
