
import {IsNotNullOrUndefined,IsNumber, StringIsValidDateString, CellIdIsValidRule } from '@schema-driven/rules-engine'
import {of} from 'rxjs'
import {AttorneyTypeBusinessActionBase} from './attorney-type.business-action-base'
import {AttorneyTypeNameIsValidRule} from '../rules/attorney-type-name-is-valid.rule';
import {switchMap} from 'rxjs';
import {UserUpdateAttorneyTypeInput, UpdateResult} from '@case-clinical/shared/util/sdk';

export class UpdateAttorneyTypesAction extends AttorneyTypeBusinessActionBase<UpdateResult> {

    constructor(private attorneyTypes: UserUpdateAttorneyTypeInput[]) {
        super('UpdateAttorneyTypesAction')
    }

    preValidateAction()
    {
        this.validationContext.addRule(
            new IsNotNullOrUndefined(
                'Input',
                'Input should have values',
                this.attorneyTypes,
                true
            )
        )
    }

    performAction()
    {
        this.response = this.businessProvider.data.userUpdateAttorneyTypes({ input: { attorneyTypes: this.attorneyTypes} }).pipe(
                switchMap((response) => of(response.data.updated))
            )
    }
}

export class UpdateAttorneyTypeAction extends AttorneyTypeBusinessActionBase<boolean> {

    constructor(private attorneyType: UserUpdateAttorneyTypeInput, private attorneyTypeId: string) {
        super('UpdateAttorneyTypeAction')
    }

    preValidateAction()
    {
        this.validationContext.addRule(
            new IsNotNullOrUndefined(
                'Input',
                'Input should have values',
                this.attorneyType,
                true
            )
        ).addRule(
            new CellIdIsValidRule(
                'Id',
                'Id should be a CUID and not null',
                this.attorneyTypeId,
                true
                )
        )
    }

    performAction()
    {
        this.response = this.businessProvider.data.userUpdateAttorneyType({attorneyTypeId: this.attorneyTypeId, input: this.attorneyType }).pipe(
                switchMap((response) => of(response.data.updated))
            )
    }
}
