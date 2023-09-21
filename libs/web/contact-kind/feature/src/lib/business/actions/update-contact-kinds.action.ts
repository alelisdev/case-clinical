
import {IsNotNullOrUndefined,IsNumber, StringIsValidDateString, CellIdIsValidRule } from '@schema-driven/rules-engine'
import {of} from 'rxjs'
import {ContactKindBusinessActionBase} from './contact-kind.business-action-base'
import {ContactKindNameIsValidRule} from '../rules/contact-kind-name-is-valid.rule';
import {switchMap} from 'rxjs';
import {UserUpdateContactKindInput} from '@case-clinical/shared/util/sdk';

export class UpdateContactKindsAction extends ContactKindBusinessActionBase<boolean> {

    constructor(private contactKinds: UserUpdateContactKindInput[]) {
        super('UpdateContactKindsAction')
    }

    preValidateAction()
    {
        this.validationContext.addRule(
            new IsNotNullOrUndefined(
                'Input',
                'Input should have values',
                this.contactKinds,
                true
            )
        )
    }

    performAction()
    {
        this.response = this.businessProvider.data.userUpdateContactKinds({ input: { contactKinds: this.contactKinds} }).pipe(
                switchMap(() => of(true))
            )
    }
}

export class UpdateContactKindAction extends ContactKindBusinessActionBase<boolean> {

    constructor(private contactKind: UserUpdateContactKindInput, private contactKindId: string) {
        super('UpdateContactKindAction')
    }

    preValidateAction()
    {
        this.validationContext.addRule(
            new IsNotNullOrUndefined(
                'Input',
                'Input should have values',
                this.contactKind,
                true
            )
        ).addRule(
            new CellIdIsValidRule(
                'Id',
                'Id should be a CUID and not null',
                this.contactKindId,
                true
                )
        )
    }

    performAction()
    {
        this.response = this.businessProvider.data.userUpdateContactKind({contactKindId: this.contactKindId, input: this.contactKind }).pipe(
                switchMap(() => of(true))
            )
    }
}
