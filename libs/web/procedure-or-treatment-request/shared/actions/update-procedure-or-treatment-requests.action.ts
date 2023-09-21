
import {IsNotNullOrUndefined,IsNumber, StringIsValidDateString, CellIdIsValidRule } from '@schema-driven/rules-engine'
import {of} from 'rxjs'
import {ProcedureOrTreatmentRequestBusinessActionBase} from './procedure-or-treatment-request.business-action-base'
import {ProcedureOrTreatmentRequestNameIsValidRule} from '../rules/procedure-or-treatment-request-name-is-valid.rule';
import {switchMap} from 'rxjs';
import {UserUpdateProcedureOrTreatmentRequestInput, UpdateResult} from '@case-clinical/shared/util/sdk';

export class UpdateProcedureOrTreatmentRequestsAction extends ProcedureOrTreatmentRequestBusinessActionBase<UpdateResult> {

    constructor(private procedureOrTreatmentRequests: UserUpdateProcedureOrTreatmentRequestInput[]) {
        super('UpdateProcedureOrTreatmentRequestsAction')
    }

    preValidateAction()
    {
        this.validationContext.addRule(
            new IsNotNullOrUndefined(
                'Input',
                'Input should have values',
                this.procedureOrTreatmentRequests,
                true
            )
        )
    }

    performAction()
    {
        this.response = this.businessProvider.data.userUpdateProcedureOrTreatmentRequests({ input: { procedureOrTreatmentRequests: this.procedureOrTreatmentRequests} }).pipe(
                switchMap((response) => of(response.data.updated))
            )
    }
}

export class UpdateProcedureOrTreatmentRequestAction extends ProcedureOrTreatmentRequestBusinessActionBase<boolean> {

    constructor(private procedureOrTreatmentRequest: UserUpdateProcedureOrTreatmentRequestInput, private procedureOrTreatmentRequestId: string) {
        super('UpdateProcedureOrTreatmentRequestAction')
    }

    preValidateAction()
    {
        this.validationContext.addRule(
            new IsNotNullOrUndefined(
                'Input',
                'Input should have values',
                this.procedureOrTreatmentRequest,
                true
            )
        ).addRule(
            new CellIdIsValidRule(
                'Id',
                'Id should be a CUID and not null',
                this.procedureOrTreatmentRequestId,
                true
                )
        )
    }

    performAction()
    {
        this.response = this.businessProvider.data.userUpdateProcedureOrTreatmentRequest({procedureOrTreatmentRequestId: this.procedureOrTreatmentRequestId, input: this.procedureOrTreatmentRequest }).pipe(
                switchMap((response) => of(response.data.updated))
            )
    }
}
