
import {IsNotNullOrUndefined,IsNumber, StringIsValidDateString, CellIdIsValidRule } from '@schema-driven/rules-engine'
import {of} from 'rxjs'
import {PchProviderBusinessActionBase} from './pch-provider.business-action-base'
import {PchProviderNameIsValidRule} from '../rules/pch-provider-name-is-valid.rule';
import {switchMap} from 'rxjs';
import {UserUpdatePchProviderInput, UpdateResult} from '@case-clinical/shared/util/sdk';

export class UpdatePchProvidersAction extends PchProviderBusinessActionBase<UpdateResult> {

    constructor(private pchProviders: UserUpdatePchProviderInput[]) {
        super('UpdatePchProvidersAction')
    }

    preValidateAction()
    {
        this.validationContext.addRule(
            new IsNotNullOrUndefined(
                'Input',
                'Input should have values',
                this.pchProviders,
                true
            )
        )
    }

    performAction()
    {
        this.response = this.businessProvider.data.userUpdatePchProviders({ input: { pchProviders: this.pchProviders} }).pipe(
                switchMap((response) => of(response.data.updated))
            )
    }
}

export class UpdatePchProviderAction extends PchProviderBusinessActionBase<boolean> {

    constructor(private pchProvider: UserUpdatePchProviderInput, private pchProviderId: string) {
        super('UpdatePchProviderAction')
    }

    preValidateAction()
    {
        this.validationContext.addRule(
            new IsNotNullOrUndefined(
                'Input',
                'Input should have values',
                this.pchProvider,
                true
            )
        ).addRule(
            new CellIdIsValidRule(
                'Id',
                'Id should be a CUID and not null',
                this.pchProviderId,
                true
                )
        )
    }

    performAction()
    {
        this.response = this.businessProvider.data.userUpdatePchProvider({pchProviderId: this.pchProviderId, input: this.pchProvider }).pipe(
                switchMap((response) => of(response.data.updated))
            )
    }
}
