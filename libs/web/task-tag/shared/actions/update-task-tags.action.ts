
import {IsNotNullOrUndefined,IsNumber, StringIsValidDateString, CellIdIsValidRule } from '@schema-driven/rules-engine'
import {of} from 'rxjs'
import {TaskTagBusinessActionBase} from './task-tag.business-action-base'
import {TaskTagNameIsValidRule} from '../rules/task-tag-name-is-valid.rule';
import {switchMap} from 'rxjs';
import {UserUpdateTaskTagInput, UpdateResult} from '@case-clinical/shared/util/sdk';

export class UpdateTaskTagsAction extends TaskTagBusinessActionBase<UpdateResult> {

    constructor(private taskTags: UserUpdateTaskTagInput[]) {
        super('UpdateTaskTagsAction')
    }

    preValidateAction()
    {
        this.validationContext.addRule(
            new IsNotNullOrUndefined(
                'Input',
                'Input should have values',
                this.taskTags,
                true
            )
        )
    }

    performAction()
    {
        this.response = this.businessProvider.data.userUpdateTaskTags({ input: { taskTags: this.taskTags} }).pipe(
                switchMap((response) => of(response.data.updated))
            )
    }
}

export class UpdateTaskTagAction extends TaskTagBusinessActionBase<boolean> {

    constructor(private taskTag: UserUpdateTaskTagInput, private taskTagId: string) {
        super('UpdateTaskTagAction')
    }

    preValidateAction()
    {
        this.validationContext.addRule(
            new IsNotNullOrUndefined(
                'Input',
                'Input should have values',
                this.taskTag,
                true
            )
        ).addRule(
            new CellIdIsValidRule(
                'Id',
                'Id should be a CUID and not null',
                this.taskTagId,
                true
                )
        )
    }

    performAction()
    {
        this.response = this.businessProvider.data.userUpdateTaskTag({taskTagId: this.taskTagId, input: this.taskTag }).pipe(
                switchMap((response) => of(response.data.updated))
            )
    }
}
