
import {IsNotNullOrUndefined,IsNumber, StringIsValidDateString, CellIdIsValidRule } from '@schema-driven/rules-engine'
import {of} from 'rxjs'
import {AuthorizationTypeBusinessActionBase} from './authorization-type.business-action-base'
import {AuthorizationTypeNameIsValidRule} from '../rules/authorization-type-name-is-valid.rule';
import {switchMap} from 'rxjs';
import {UserUpdateAuthorizationTypeInput, UpdateResult} from '@case-clinical/shared/util/sdk';

export class UpdateAuthorizationTypesAction extends AuthorizationTypeBusinessActionBase<UpdateResult> {

    constructor(private authorizationTypes: UserUpdateAuthorizationTypeInput[]) {
        super('UpdateAuthorizationTypesAction')
    }

    preValidateAction()
    {
        this.validationContext.addRule(
            new IsNotNullOrUndefined(
                'Input',
                'Input should have values',
                this.authorizationTypes,
                true
            )
        )
    }

    performAction()
    {
        this.response = this.businessProvider.data.userUpdateAuthorizationTypes({ input: { authorizationTypes: this.authorizationTypes} }).pipe(
                switchMap((response) => of(response.data.updated))
            )
    }
}

export class UpdateAuthorizationTypeAction extends AuthorizationTypeBusinessActionBase<boolean> {

    constructor(private authorizationType: UserUpdateAuthorizationTypeInput, private authorizationTypeId: string) {
        super('UpdateAuthorizationTypeAction')
    }

    preValidateAction()
    {
        this.validationContext.addRule(
            new IsNotNullOrUndefined(
                'Input',
                'Input should have values',
                this.authorizationType,
                true
            )
        ).addRule(
            new CellIdIsValidRule(
                'Id',
                'Id should be a CUID and not null',
                this.authorizationTypeId,
                true
                )
        )
    }

    performAction()
    {
        this.response = this.businessProvider.data.userUpdateAuthorizationType({authorizationTypeId: this.authorizationTypeId, input: this.authorizationType }).pipe(
                switchMap((response) => of(response.data.updated))
            )
    }
}
