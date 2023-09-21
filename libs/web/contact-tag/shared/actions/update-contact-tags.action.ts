
import {IsNotNullOrUndefined,IsNumber, StringIsValidDateString, CellIdIsValidRule } from '@schema-driven/rules-engine'
import {of} from 'rxjs'
import {ContactTagBusinessActionBase} from './contact-tag.business-action-base'
import {ContactTagNameIsValidRule} from '../rules/contact-tag-name-is-valid.rule';
import {switchMap} from 'rxjs';
import {UserUpdateContactTagInput, UpdateResult} from '@case-clinical/shared/util/sdk';

export class UpdateContactTagsAction extends ContactTagBusinessActionBase<UpdateResult> {

    constructor(private contactTags: UserUpdateContactTagInput[]) {
        super('UpdateContactTagsAction')
    }

    preValidateAction()
    {
        this.validationContext.addRule(
            new IsNotNullOrUndefined(
                'Input',
                'Input should have values',
                this.contactTags,
                true
            )
        )
    }

    performAction()
    {
        this.response = this.businessProvider.data.userUpdateContactTags({ input: { contactTags: this.contactTags} }).pipe(
                switchMap((response) => of(response.data.updated))
            )
    }
}

export class UpdateContactTagAction extends ContactTagBusinessActionBase<boolean> {

    constructor(private contactTag: UserUpdateContactTagInput, private contactTagId: string) {
        super('UpdateContactTagAction')
    }

    preValidateAction()
    {
        this.validationContext.addRule(
            new IsNotNullOrUndefined(
                'Input',
                'Input should have values',
                this.contactTag,
                true
            )
        ).addRule(
            new CellIdIsValidRule(
                'Id',
                'Id should be a CUID and not null',
                this.contactTagId,
                true
                )
        )
    }

    performAction()
    {
        this.response = this.businessProvider.data.userUpdateContactTag({contactTagId: this.contactTagId, input: this.contactTag }).pipe(
                switchMap((response) => of(response.data.updated))
            )
    }
}
