
import {IsNotNullOrUndefined,IsNumber, StringIsValidDateString, CellIdIsValidRule } from '@schema-driven/rules-engine'
import {of} from 'rxjs'
import {ProcedureOrTreatmentRequestAuthorizationBusinessActionBase} from './procedure-or-treatment-request-authorization.business-action-base'
import {ProcedureOrTreatmentRequestAuthorizationNameIsValidRule} from '../rules/procedure-or-treatment-request-authorization-name-is-valid.rule';
import {switchMap} from 'rxjs';
import {UserUpdateProcedureOrTreatmentRequestAuthorizationInput, UpdateResult} from '@case-clinical/shared/util/sdk';

export class UpdateProcedureOrTreatmentRequestAuthorizationsAction extends ProcedureOrTreatmentRequestAuthorizationBusinessActionBase<UpdateResult> {

    constructor(private procedureOrTreatmentRequestAuthorizations: UserUpdateProcedureOrTreatmentRequestAuthorizationInput[]) {
        super('UpdateProcedureOrTreatmentRequestAuthorizationsAction')
    }

    preValidateAction()
    {
        this.validationContext.addRule(
            new IsNotNullOrUndefined(
                'Input',
                'Input should have values',
                this.procedureOrTreatmentRequestAuthorizations,
                true
            )
        )
    }

    performAction()
    {
        this.response = this.businessProvider.data.userUpdateProcedureOrTreatmentRequestAuthorizations({ input: { procedureOrTreatmentRequestAuthorizations: this.procedureOrTreatmentRequestAuthorizations} }).pipe(
                switchMap((response) => of(response.data.updated))
            )
    }
}

export class UpdateProcedureOrTreatmentRequestAuthorizationAction extends ProcedureOrTreatmentRequestAuthorizationBusinessActionBase<boolean> {

    constructor(private procedureOrTreatmentRequestAuthorization: UserUpdateProcedureOrTreatmentRequestAuthorizationInput, private procedureOrTreatmentRequestAuthorizationId: string) {
        super('UpdateProcedureOrTreatmentRequestAuthorizationAction')
    }

    preValidateAction()
    {
        this.validationContext.addRule(
            new IsNotNullOrUndefined(
                'Input',
                'Input should have values',
                this.procedureOrTreatmentRequestAuthorization,
                true
            )
        ).addRule(
            new CellIdIsValidRule(
                'Id',
                'Id should be a CUID and not null',
                this.procedureOrTreatmentRequestAuthorizationId,
                true
                )
        )
    }

    performAction()
    {
        this.response = this.businessProvider.data.userUpdateProcedureOrTreatmentRequestAuthorization({procedureOrTreatmentRequestAuthorizationId: this.procedureOrTreatmentRequestAuthorizationId, input: this.procedureOrTreatmentRequestAuthorization }).pipe(
                switchMap((response) => of(response.data.updated))
            )
    }
}
