
import {IsNotNullOrUndefined,IsNumber, StringIsValidDateString, CellIdIsValidRule } from '@schema-driven/rules-engine'
import {of} from 'rxjs'
import {SurgicalPositionBusinessActionBase} from './surgical-position.business-action-base'
import {SurgicalPositionNameIsValidRule} from '../rules/surgical-position-name-is-valid.rule';
import {switchMap} from 'rxjs';
import {UserUpdateSurgicalPositionInput, UpdateResult} from '@case-clinical/shared/util/sdk';

export class UpdateSurgicalPositionsAction extends SurgicalPositionBusinessActionBase<UpdateResult> {

    constructor(private surgicalPositions: UserUpdateSurgicalPositionInput[]) {
        super('UpdateSurgicalPositionsAction')
    }

    preValidateAction()
    {
        this.validationContext.addRule(
            new IsNotNullOrUndefined(
                'Input',
                'Input should have values',
                this.surgicalPositions,
                true
            )
        )
    }

    performAction()
    {
        this.response = this.businessProvider.data.userUpdateSurgicalPositions({ input: { surgicalPositions: this.surgicalPositions} }).pipe(
                switchMap((response) => of(response.data.updated))
            )
    }
}

export class UpdateSurgicalPositionAction extends SurgicalPositionBusinessActionBase<boolean> {

    constructor(private surgicalPosition: UserUpdateSurgicalPositionInput, private surgicalPositionId: string) {
        super('UpdateSurgicalPositionAction')
    }

    preValidateAction()
    {
        this.validationContext.addRule(
            new IsNotNullOrUndefined(
                'Input',
                'Input should have values',
                this.surgicalPosition,
                true
            )
        ).addRule(
            new CellIdIsValidRule(
                'Id',
                'Id should be a CUID and not null',
                this.surgicalPositionId,
                true
                )
        )
    }

    performAction()
    {
        this.response = this.businessProvider.data.userUpdateSurgicalPosition({surgicalPositionId: this.surgicalPositionId, input: this.surgicalPosition }).pipe(
                switchMap((response) => of(response.data.updated))
            )
    }
}
