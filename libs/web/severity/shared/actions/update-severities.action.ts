
import {IsNotNullOrUndefined,IsNumber, StringIsValidDateString, CellIdIsValidRule } from '@schema-driven/rules-engine'
import {of} from 'rxjs'
import {SeverityBusinessActionBase} from './severity.business-action-base'
import {SeverityNameIsValidRule} from '../rules/severity-name-is-valid.rule';
import {switchMap} from 'rxjs';
import {UserUpdateSeverityInput, UpdateResult} from '@case-clinical/shared/util/sdk';

export class UpdateSeveritiesAction extends SeverityBusinessActionBase<UpdateResult> {

    constructor(private severities: UserUpdateSeverityInput[]) {
        super('UpdateSeveritiesAction')
    }

    preValidateAction()
    {
        this.validationContext.addRule(
            new IsNotNullOrUndefined(
                'Input',
                'Input should have values',
                this.severities,
                true
            )
        )
    }

    performAction()
    {
        this.response = this.businessProvider.data.userUpdateSeverities({ input: { severities: this.severities} }).pipe(
                switchMap((response) => of(response.data.updated))
            )
    }
}

export class UpdateSeverityAction extends SeverityBusinessActionBase<boolean> {

    constructor(private severity: UserUpdateSeverityInput, private severityId: string) {
        super('UpdateSeverityAction')
    }

    preValidateAction()
    {
        this.validationContext.addRule(
            new IsNotNullOrUndefined(
                'Input',
                'Input should have values',
                this.severity,
                true
            )
        ).addRule(
            new CellIdIsValidRule(
                'Id',
                'Id should be a CUID and not null',
                this.severityId,
                true
                )
        )
    }

    performAction()
    {
        this.response = this.businessProvider.data.userUpdateSeverity({severityId: this.severityId, input: this.severity }).pipe(
                switchMap((response) => of(response.data.updated))
            )
    }
}
