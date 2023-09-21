
import {IsNotNullOrUndefined,IsNumber, StringIsValidDateString, CellIdIsValidRule } from '@schema-driven/rules-engine'
import {of} from 'rxjs'
import {FacilityFeeScheduleBusinessActionBase} from './facility-fee-schedule.business-action-base'
import {FacilityFeeScheduleNameIsValidRule} from '../rules/facility-fee-schedule-name-is-valid.rule';
import {switchMap} from 'rxjs';
import {UserUpdateFacilityFeeScheduleInput} from '@case-clinical/shared/util/sdk';

export class UpdateFacilityFeeSchedulesAction extends FacilityFeeScheduleBusinessActionBase<boolean> {

    constructor(private facilityFeeSchedules: UserUpdateFacilityFeeScheduleInput[]) {
        super('UpdateFacilityFeeSchedulesAction')
    }

    preValidateAction()
    {
        this.validationContext.addRule(
            new IsNotNullOrUndefined(
                'Input',
                'Input should have values',
                this.facilityFeeSchedules,
                true
            )
        )
    }

    performAction()
    {
        this.response = this.businessProvider.data.userUpdateFacilityFeeSchedules({ input: { facilityFeeSchedules: this.facilityFeeSchedules} }).pipe(
                switchMap(() => of(true))
            )
    }
}

export class UpdateFacilityFeeScheduleAction extends FacilityFeeScheduleBusinessActionBase<boolean> {

    constructor(private facilityFeeSchedule: UserUpdateFacilityFeeScheduleInput, private facilityFeeScheduleId: string) {
        super('UpdateFacilityFeeScheduleAction')
    }

    preValidateAction()
    {
        this.validationContext.addRule(
            new IsNotNullOrUndefined(
                'Input',
                'Input should have values',
                this.facilityFeeSchedule,
                true
            )
        ).addRule(
            new CellIdIsValidRule(
                'Id',
                'Id should be a CUID and not null',
                this.facilityFeeScheduleId,
                true
                )
        )
    }

    performAction()
    {
        this.response = this.businessProvider.data.userUpdateFacilityFeeSchedule({facilityFeeScheduleId: this.facilityFeeScheduleId, input: this.facilityFeeSchedule }).pipe(
                switchMap(() => of(true))
            )
    }
}
