
import {IsNotNullOrUndefined,IsNumber, StringIsValidDateString, CellIdIsValidRule } from '@schema-driven/rules-engine'
import {of} from 'rxjs'
import {BatchControlBusinessActionBase} from './batch-control.business-action-base'
import {BatchControlNameIsValidRule} from '../rules/batch-control-name-is-valid.rule';
import {switchMap} from 'rxjs';
import {UserUpdateBatchControlInput, UpdateResult} from '@case-clinical/shared/util/sdk';

export class UpdateBatchControlsAction extends BatchControlBusinessActionBase<UpdateResult> {

    constructor(private batchControls: UserUpdateBatchControlInput[]) {
        super('UpdateBatchControlsAction')
    }

    preValidateAction()
    {
        this.validationContext.addRule(
            new IsNotNullOrUndefined(
                'Input',
                'Input should have values',
                this.batchControls,
                true
            )
        )
    }

    performAction()
    {
        this.response = this.businessProvider.data.userUpdateBatchControls({ input: { batchControls: this.batchControls} }).pipe(
                switchMap((response) => of(response.data.updated))
            )
    }
}

export class UpdateBatchControlAction extends BatchControlBusinessActionBase<boolean> {

    constructor(private batchControl: UserUpdateBatchControlInput, private batchControlId: string) {
        super('UpdateBatchControlAction')
    }

    preValidateAction()
    {
        this.validationContext.addRule(
            new IsNotNullOrUndefined(
                'Input',
                'Input should have values',
                this.batchControl,
                true
            )
        ).addRule(
            new CellIdIsValidRule(
                'Id',
                'Id should be a CUID and not null',
                this.batchControlId,
                true
                )
        )
    }

    performAction()
    {
        this.response = this.businessProvider.data.userUpdateBatchControl({batchControlId: this.batchControlId, input: this.batchControl }).pipe(
                switchMap((response) => of(response.data.updated))
            )
    }
}
