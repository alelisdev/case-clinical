
import {IsNotNullOrUndefined,IsNumber, StringIsValidDateString, CellIdIsValidRule } from '@schema-driven/rules-engine'
import {of} from 'rxjs'
import {FeeScheduleBusinessActionBase} from './fee-schedule.business-action-base'
import {FeeScheduleNameIsValidRule} from '../rules/fee-schedule-name-is-valid.rule';
import {switchMap} from 'rxjs';
import {UserUpdateFeeScheduleInput, UpdateResult} from '@case-clinical/shared/util/sdk';

export class UpdateFeeSchedulesAction extends FeeScheduleBusinessActionBase<UpdateResult> {

    constructor(private feeSchedules: UserUpdateFeeScheduleInput[]) {
        super('UpdateFeeSchedulesAction')
    }

    preValidateAction()
    {
        this.validationContext.addRule(
            new IsNotNullOrUndefined(
                'Input',
                'Input should have values',
                this.feeSchedules,
                true
            )
        )
    }

    performAction()
    {
        this.response = this.businessProvider.data.userUpdateFeeSchedules({ input: { feeSchedules: this.feeSchedules} }).pipe(
                switchMap((response) => of(response.data.updated))
            )
    }
}

export class UpdateFeeScheduleAction extends FeeScheduleBusinessActionBase<boolean> {

    constructor(private feeSchedule: UserUpdateFeeScheduleInput, private feeScheduleId: string) {
        super('UpdateFeeScheduleAction')
    }

    preValidateAction()
    {
        this.validationContext.addRule(
            new IsNotNullOrUndefined(
                'Input',
                'Input should have values',
                this.feeSchedule,
                true
            )
        ).addRule(
            new CellIdIsValidRule(
                'Id',
                'Id should be a CUID and not null',
                this.feeScheduleId,
                true
                )
        )
    }

    performAction()
    {
        this.response = this.businessProvider.data.userUpdateFeeSchedule({feeScheduleId: this.feeScheduleId, input: this.feeSchedule }).pipe(
                switchMap((response) => of(response.data.updated))
            )
    }
}
