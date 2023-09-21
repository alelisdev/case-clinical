
import {IsNotNullOrUndefined,IsNumber, StringIsValidDateString, CellIdIsValidRule } from '@schema-driven/rules-engine'
import {of} from 'rxjs'
import {IntegrationBusinessActionBase} from './integration.business-action-base'
import {IntegrationNameIsValidRule} from '../rules/integration-name-is-valid.rule';
import {switchMap} from 'rxjs';
import {UserUpdateIntegrationInput} from '@case-clinical/shared/util/sdk';

export class UpdateIntegrationsAction extends IntegrationBusinessActionBase<boolean> {

    constructor(private integrations: UserUpdateIntegrationInput[]) {
        super('UpdateIntegrationsAction')
    }

    preValidateAction()
    {
        this.validationContext.addRule(
            new IsNotNullOrUndefined(
                'Input',
                'Input should have values',
                this.integrations,
                true
            )
        )
    }

    performAction()
    {
        this.response = this.businessProvider.data.userUpdateIntegrations({ input: { integrations: this.integrations} }).pipe(
                switchMap(() => of(true))
            )
    }
}

export class UpdateIntegrationAction extends IntegrationBusinessActionBase<boolean> {

    constructor(private integration: UserUpdateIntegrationInput, private integrationId: string) {
        super('UpdateIntegrationAction')
    }

    preValidateAction()
    {
        this.validationContext.addRule(
            new IsNotNullOrUndefined(
                'Input',
                'Input should have values',
                this.integration,
                true
            )
        ).addRule(
            new CellIdIsValidRule(
                'Id',
                'Id should be a CUID and not null',
                this.integrationId,
                true
                )
        )
    }

    performAction()
    {
        this.response = this.businessProvider.data.userUpdateIntegration({integrationId: this.integrationId, input: this.integration }).pipe(
                switchMap(() => of(true))
            )
    }
}
