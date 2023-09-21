
import {IsNotNullOrUndefined,IsNumber, StringIsValidDateString, CellIdIsValidRule } from '@schema-driven/rules-engine'
import {of} from 'rxjs'
import {BodyPartBusinessActionBase} from './body-part.business-action-base'
import {BodyPartNameIsValidRule} from '../rules/body-part-name-is-valid.rule';
import {switchMap} from 'rxjs';
import {UserUpdateBodyPartInput, UpdateResult} from '@case-clinical/shared/util/sdk';

export class UpdateBodyPartsAction extends BodyPartBusinessActionBase<UpdateResult> {

    constructor(private bodyParts: UserUpdateBodyPartInput[]) {
        super('UpdateBodyPartsAction')
    }

    preValidateAction()
    {
        this.validationContext.addRule(
            new IsNotNullOrUndefined(
                'Input',
                'Input should have values',
                this.bodyParts,
                true
            )
        )
    }

    performAction()
    {
        this.response = this.businessProvider.data.userUpdateBodyParts({ input: { bodyParts: this.bodyParts} }).pipe(
                switchMap((response) => of(response.data.updated))
            )
    }
}

export class UpdateBodyPartAction extends BodyPartBusinessActionBase<boolean> {

    constructor(private bodyPart: UserUpdateBodyPartInput, private bodyPartId: string) {
        super('UpdateBodyPartAction')
    }

    preValidateAction()
    {
        this.validationContext.addRule(
            new IsNotNullOrUndefined(
                'Input',
                'Input should have values',
                this.bodyPart,
                true
            )
        ).addRule(
            new CellIdIsValidRule(
                'Id',
                'Id should be a CUID and not null',
                this.bodyPartId,
                true
                )
        )
    }

    performAction()
    {
        this.response = this.businessProvider.data.userUpdateBodyPart({bodyPartId: this.bodyPartId, input: this.bodyPart }).pipe(
                switchMap((response) => of(response.data.updated))
            )
    }
}
