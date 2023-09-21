
import {IsNotNullOrUndefined,IsNumber, StringIsValidDateString, CellIdIsValidRule } from '@schema-driven/rules-engine'
import {of} from 'rxjs'
import {AuthorizationBusinessActionBase} from './authorization.business-action-base'
import {AuthorizationNameIsValidRule} from '../rules/authorization-name-is-valid.rule';
import {switchMap} from 'rxjs';
import {UserUpdateAuthorizationInput, UpdateResult} from '@case-clinical/shared/util/sdk';

export class UpdateAuthorizationsAction extends AuthorizationBusinessActionBase<UpdateResult> {

    constructor(private authorizations: UserUpdateAuthorizationInput[]) {
        super('UpdateAuthorizationsAction')
    }

    preValidateAction()
    {
        this.validationContext.addRule(
            new IsNotNullOrUndefined(
                'Input',
                'Input should have values',
                this.authorizations,
                true
            )
        )
    }

    performAction()
    {
        this.response = this.businessProvider.data.userUpdateAuthorizations({ input: { authorizations: this.authorizations} }).pipe(
                switchMap((response) => of(response.data.updated))
            )
    }
}

export class UpdateAuthorizationAction extends AuthorizationBusinessActionBase<boolean> {

    constructor(private authorization: UserUpdateAuthorizationInput, private authorizationId: string) {
        super('UpdateAuthorizationAction')
    }

    preValidateAction()
    {
        this.validationContext.addRule(
            new IsNotNullOrUndefined(
                'Input',
                'Input should have values',
                this.authorization,
                true
            )
        ).addRule(
            new CellIdIsValidRule(
                'Id',
                'Id should be a CUID and not null',
                this.authorizationId,
                true
                )
        )
    }

    performAction()
    {
        this.response = this.businessProvider.data.userUpdateAuthorization({authorizationId: this.authorizationId, input: this.authorization }).pipe(
                switchMap((response) => of(response.data.updated))
            )
    }
}
