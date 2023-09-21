
import {IsNotNullOrUndefined,IsNumber, StringIsValidDateString, CellIdIsValidRule } from '@schema-driven/rules-engine'
import {of} from 'rxjs'
import {ContactPhoneNumberBusinessActionBase} from './contact-phone-number.business-action-base'
import {ContactPhoneNumberNameIsValidRule} from '../rules/contact-phone-number-name-is-valid.rule';
import {switchMap} from 'rxjs';
import {UserUpdateContactPhoneNumberInput, UpdateResult} from '@case-clinical/shared/util/sdk';

export class UpdateContactPhoneNumbersAction extends ContactPhoneNumberBusinessActionBase<UpdateResult> {

    constructor(private contactPhoneNumbers: UserUpdateContactPhoneNumberInput[]) {
        super('UpdateContactPhoneNumbersAction')
    }

    preValidateAction()
    {
        this.validationContext.addRule(
            new IsNotNullOrUndefined(
                'Input',
                'Input should have values',
                this.contactPhoneNumbers,
                true
            )
        )
    }

    performAction()
    {
        this.response = this.businessProvider.data.userUpdateContactPhoneNumbers({ input: { contactPhoneNumbers: this.contactPhoneNumbers} }).pipe(
                switchMap((response) => of(response.data.updated))
            )
    }
}

export class UpdateContactPhoneNumberAction extends ContactPhoneNumberBusinessActionBase<boolean> {

    constructor(private contactPhoneNumber: UserUpdateContactPhoneNumberInput, private contactPhoneNumberId: string) {
        super('UpdateContactPhoneNumberAction')
    }

    preValidateAction()
    {
        this.validationContext.addRule(
            new IsNotNullOrUndefined(
                'Input',
                'Input should have values',
                this.contactPhoneNumber,
                true
            )
        ).addRule(
            new CellIdIsValidRule(
                'Id',
                'Id should be a CUID and not null',
                this.contactPhoneNumberId,
                true
                )
        )
    }

    performAction()
    {
        this.response = this.businessProvider.data.userUpdateContactPhoneNumber({contactPhoneNumberId: this.contactPhoneNumberId, input: this.contactPhoneNumber }).pipe(
                switchMap((response) => of(response.data.updated))
            )
    }
}
