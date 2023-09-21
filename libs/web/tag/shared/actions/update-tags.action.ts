
import {IsNotNullOrUndefined,IsNumber, StringIsValidDateString, CellIdIsValidRule } from '@schema-driven/rules-engine'
import {of} from 'rxjs'
import {TagBusinessActionBase} from './tag.business-action-base'
import {TagNameIsValidRule} from '../rules/tag-name-is-valid.rule';
import {switchMap} from 'rxjs';
import {UserUpdateTagInput, UpdateResult} from '@case-clinical/shared/util/sdk';

export class UpdateTagsAction extends TagBusinessActionBase<UpdateResult> {

    constructor(private tags: UserUpdateTagInput[]) {
        super('UpdateTagsAction')
    }

    preValidateAction()
    {
        this.validationContext.addRule(
            new IsNotNullOrUndefined(
                'Input',
                'Input should have values',
                this.tags,
                true
            )
        )
    }

    performAction()
    {
        this.response = this.businessProvider.data.userUpdateTags({ input: { tags: this.tags} }).pipe(
                switchMap((response) => of(response.data.updated))
            )
    }
}

export class UpdateTagAction extends TagBusinessActionBase<boolean> {

    constructor(private tag: UserUpdateTagInput, private tagId: string) {
        super('UpdateTagAction')
    }

    preValidateAction()
    {
        this.validationContext.addRule(
            new IsNotNullOrUndefined(
                'Input',
                'Input should have values',
                this.tag,
                true
            )
        ).addRule(
            new CellIdIsValidRule(
                'Id',
                'Id should be a CUID and not null',
                this.tagId,
                true
                )
        )
    }

    performAction()
    {
        this.response = this.businessProvider.data.userUpdateTag({tagId: this.tagId, input: this.tag }).pipe(
                switchMap((response) => of(response.data.updated))
            )
    }
}
