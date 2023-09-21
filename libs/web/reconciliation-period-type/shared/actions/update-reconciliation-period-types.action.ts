
import {IsNotNullOrUndefined,IsNumber, StringIsValidDateString, CellIdIsValidRule } from '@schema-driven/rules-engine'
import {of} from 'rxjs'
import {ReconciliationPeriodTypeBusinessActionBase} from './reconciliation-period-type.business-action-base'
import {ReconciliationPeriodTypeNameIsValidRule} from '../rules/reconciliation-period-type-name-is-valid.rule';
import {switchMap} from 'rxjs';
import {UserUpdateReconciliationPeriodTypeInput, UpdateResult} from '@case-clinical/shared/util/sdk';

export class UpdateReconciliationPeriodTypesAction extends ReconciliationPeriodTypeBusinessActionBase<UpdateResult> {

    constructor(private reconciliationPeriodTypes: UserUpdateReconciliationPeriodTypeInput[]) {
        super('UpdateReconciliationPeriodTypesAction')
    }

    preValidateAction()
    {
        this.validationContext.addRule(
            new IsNotNullOrUndefined(
                'Input',
                'Input should have values',
                this.reconciliationPeriodTypes,
                true
            )
        )
    }

    performAction()
    {
        this.response = this.businessProvider.data.userUpdateReconciliationPeriodTypes({ input: { reconciliationPeriodTypes: this.reconciliationPeriodTypes} }).pipe(
                switchMap((response) => of(response.data.updated))
            )
    }
}

export class UpdateReconciliationPeriodTypeAction extends ReconciliationPeriodTypeBusinessActionBase<boolean> {

    constructor(private reconciliationPeriodType: UserUpdateReconciliationPeriodTypeInput, private reconciliationPeriodTypeId: string) {
        super('UpdateReconciliationPeriodTypeAction')
    }

    preValidateAction()
    {
        this.validationContext.addRule(
            new IsNotNullOrUndefined(
                'Input',
                'Input should have values',
                this.reconciliationPeriodType,
                true
            )
        ).addRule(
            new CellIdIsValidRule(
                'Id',
                'Id should be a CUID and not null',
                this.reconciliationPeriodTypeId,
                true
                )
        )
    }

    performAction()
    {
        this.response = this.businessProvider.data.userUpdateReconciliationPeriodType({reconciliationPeriodTypeId: this.reconciliationPeriodTypeId, input: this.reconciliationPeriodType }).pipe(
                switchMap((response) => of(response.data.updated))
            )
    }
}
