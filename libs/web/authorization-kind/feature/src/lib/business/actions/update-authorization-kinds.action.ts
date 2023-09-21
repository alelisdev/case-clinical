
import {IsNotNullOrUndefined,IsNumber, StringIsValidDateString, CellIdIsValidRule } from '@schema-driven/rules-engine'
import {of} from 'rxjs'
import {AuthorizationKindBusinessActionBase} from './authorization-kind.business-action-base'
import {AuthorizationKindNameIsValidRule} from '../rules/authorization-kind-name-is-valid.rule';
import {switchMap} from 'rxjs';
import {UserUpdateAuthorizationKindInput} from '@case-clinical/shared/util/sdk';

export class UpdateAuthorizationKindsAction extends AuthorizationKindBusinessActionBase<boolean> {

    constructor(private authorizationKinds: UserUpdateAuthorizationKindInput[]) {
        super('UpdateAuthorizationKindsAction')
    }

    preValidateAction()
    {
        this.validationContext.addRule(
            new IsNotNullOrUndefined(
                'Input',
                'Input should have values',
                this.authorizationKinds,
                true
            )
        )
    }

    performAction()
    {
        this.response = this.businessProvider.data.userUpdateAuthorizationKinds({ input: { authorizationKinds: this.authorizationKinds} }).pipe(
                switchMap(() => of(true))
            )
    }
}

export class UpdateAuthorizationKindAction extends AuthorizationKindBusinessActionBase<boolean> {

    constructor(private authorizationKind: UserUpdateAuthorizationKindInput, private authorizationKindId: string) {
        super('UpdateAuthorizationKindAction')
    }

    preValidateAction()
    {
        this.validationContext.addRule(
            new IsNotNullOrUndefined(
                'Input',
                'Input should have values',
                this.authorizationKind,
                true
            )
        ).addRule(
            new CellIdIsValidRule(
                'Id',
                'Id should be a CUID and not null',
                this.authorizationKindId,
                true
                )
        )
    }

    performAction()
    {
        this.response = this.businessProvider.data.userUpdateAuthorizationKind({authorizationKindId: this.authorizationKindId, input: this.authorizationKind }).pipe(
                switchMap(() => of(true))
            )
    }
}
