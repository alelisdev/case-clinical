
import {IsNotNullOrUndefined,IsNumber, StringIsValidDateString, CellIdIsValidRule } from '@schema-driven/rules-engine'
import {of} from 'rxjs'
import {VisitKindBusinessActionBase} from './visit-kind.business-action-base'
import {VisitKindNameIsValidRule} from '../rules/visit-kind-name-is-valid.rule';
import {switchMap} from 'rxjs';
import {UserUpdateVisitKindInput} from '@case-clinical/shared/util/sdk';

export class UpdateVisitKindsAction extends VisitKindBusinessActionBase<boolean> {

    constructor(private visitKinds: UserUpdateVisitKindInput[]) {
        super('UpdateVisitKindsAction')
    }

    preValidateAction()
    {
        this.validationContext.addRule(
            new IsNotNullOrUndefined(
                'Input',
                'Input should have values',
                this.visitKinds,
                true
            )
        )
    }

    performAction()
    {
        this.response = this.businessProvider.data.userUpdateVisitKinds({ input: { visitKinds: this.visitKinds} }).pipe(
                switchMap(() => of(true))
            )
    }
}

export class UpdateVisitKindAction extends VisitKindBusinessActionBase<boolean> {

    constructor(private visitKind: UserUpdateVisitKindInput, private visitKindId: string) {
        super('UpdateVisitKindAction')
    }

    preValidateAction()
    {
        this.validationContext.addRule(
            new IsNotNullOrUndefined(
                'Input',
                'Input should have values',
                this.visitKind,
                true
            )
        ).addRule(
            new CellIdIsValidRule(
                'Id',
                'Id should be a CUID and not null',
                this.visitKindId,
                true
                )
        )
    }

    performAction()
    {
        this.response = this.businessProvider.data.userUpdateVisitKind({visitKindId: this.visitKindId, input: this.visitKind }).pipe(
                switchMap(() => of(true))
            )
    }
}
