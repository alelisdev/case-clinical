
import {IsNotNullOrUndefined,IsNumber, StringIsValidDateString, CellIdIsValidRule } from '@schema-driven/rules-engine'
import {of} from 'rxjs'
import {GenderBusinessActionBase} from './gender.business-action-base'
import {GenderNameIsValidRule} from '../rules/gender-name-is-valid.rule';
import {switchMap} from 'rxjs';
import {UserUpdateGenderInput, UpdateResult} from '@case-clinical/shared/util/sdk';

export class UpdateGendersAction extends GenderBusinessActionBase<UpdateResult> {

    constructor(private genders: UserUpdateGenderInput[]) {
        super('UpdateGendersAction')
    }

    preValidateAction()
    {
        this.validationContext.addRule(
            new IsNotNullOrUndefined(
                'Input',
                'Input should have values',
                this.genders,
                true
            )
        )
    }

    performAction()
    {
        this.response = this.businessProvider.data.userUpdateGenders({ input: { genders: this.genders} }).pipe(
                switchMap((response) => of(response.data.updated))
            )
    }
}

export class UpdateGenderAction extends GenderBusinessActionBase<boolean> {

    constructor(private gender: UserUpdateGenderInput, private genderId: string) {
        super('UpdateGenderAction')
    }

    preValidateAction()
    {
        this.validationContext.addRule(
            new IsNotNullOrUndefined(
                'Input',
                'Input should have values',
                this.gender,
                true
            )
        ).addRule(
            new CellIdIsValidRule(
                'Id',
                'Id should be a CUID and not null',
                this.genderId,
                true
                )
        )
    }

    performAction()
    {
        this.response = this.businessProvider.data.userUpdateGender({genderId: this.genderId, input: this.gender }).pipe(
                switchMap((response) => of(response.data.updated))
            )
    }
}
