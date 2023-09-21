
import {IsNotNullOrUndefined,IsNumber, StringIsValidDateString, CellIdIsValidRule } from '@schema-driven/rules-engine'
import {of} from 'rxjs'
import {TaskItemBusinessActionBase} from './task-item.business-action-base'
import {TaskItemNameIsValidRule} from '../rules/task-item-name-is-valid.rule';
import {switchMap} from 'rxjs';
import {UserUpdateTaskItemInput, UpdateResult} from '@case-clinical/shared/util/sdk';

export class UpdateTaskItemsAction extends TaskItemBusinessActionBase<UpdateResult> {

    constructor(private taskItems: UserUpdateTaskItemInput[]) {
        super('UpdateTaskItemsAction')
    }

    preValidateAction()
    {
        this.validationContext.addRule(
            new IsNotNullOrUndefined(
                'Input',
                'Input should have values',
                this.taskItems,
                true
            )
        )
    }

    performAction()
    {
        this.response = this.businessProvider.data.userUpdateTaskItems({ input: { taskItems: this.taskItems} }).pipe(
                switchMap((response) => of(response.data.updated))
            )
    }
}

export class UpdateTaskItemAction extends TaskItemBusinessActionBase<boolean> {

    constructor(private taskItem: UserUpdateTaskItemInput, private taskItemId: string) {
        super('UpdateTaskItemAction')
    }

    preValidateAction()
    {
        this.validationContext.addRule(
            new IsNotNullOrUndefined(
                'Input',
                'Input should have values',
                this.taskItem,
                true
            )
        ).addRule(
            new CellIdIsValidRule(
                'Id',
                'Id should be a CUID and not null',
                this.taskItemId,
                true
                )
        )
    }

    performAction()
    {
        this.response = this.businessProvider.data.userUpdateTaskItem({taskItemId: this.taskItemId, input: this.taskItem }).pipe(
                switchMap((response) => of(response.data.updated))
            )
    }
}
