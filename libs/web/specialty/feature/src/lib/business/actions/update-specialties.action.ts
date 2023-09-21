
import {IsNotNullOrUndefined,IsNumber, StringIsValidDateString, CellIdIsValidRule } from '@schema-driven/rules-engine'
import {of} from 'rxjs'
import {SpecialtyBusinessActionBase} from './specialty.business-action-base'
import {SpecialtyNameIsValidRule} from '../rules/specialty-name-is-valid.rule';
import {switchMap} from 'rxjs';
import {UserUpdateSpecialtyInput} from '@case-clinical/shared/util/sdk';

export class UpdateSpecialtiesAction extends SpecialtyBusinessActionBase<boolean> {

    constructor(private specialties: UserUpdateSpecialtyInput[]) {
        super('UpdateSpecialtiesAction')
    }

    preValidateAction()
    {
        this.validationContext.addRule(
            new IsNotNullOrUndefined(
                'Input',
                'Input should have values',
                this.specialties,
                true
            )
        )
    }

    performAction()
    {
        this.response = this.businessProvider.data.userUpdateSpecialties({ input: { specialties: this.specialties} }).pipe(
                switchMap(() => of(true))
            )
    }
}

export class UpdateSpecialtyAction extends SpecialtyBusinessActionBase<boolean> {

    constructor(private specialty: UserUpdateSpecialtyInput, private specialtyId: string) {
        super('UpdateSpecialtyAction')
    }

    preValidateAction()
    {
        this.validationContext.addRule(
            new IsNotNullOrUndefined(
                'Input',
                'Input should have values',
                this.specialty,
                true
            )
        ).addRule(
            new CellIdIsValidRule(
                'Id',
                'Id should be a CUID and not null',
                this.specialtyId,
                true
                )
        )
    }

    performAction()
    {
        this.response = this.businessProvider.data.userUpdateSpecialty({specialtyId: this.specialtyId, input: this.specialty }).pipe(
                switchMap(() => of(true))
            )
    }
}
