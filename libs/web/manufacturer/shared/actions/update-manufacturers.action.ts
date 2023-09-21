
import {IsNotNullOrUndefined,IsNumber, StringIsValidDateString, CellIdIsValidRule } from '@schema-driven/rules-engine'
import {of} from 'rxjs'
import {ManufacturerBusinessActionBase} from './manufacturer.business-action-base'
import {ManufacturerNameIsValidRule} from '../rules/manufacturer-name-is-valid.rule';
import {switchMap} from 'rxjs';
import {UserUpdateManufacturerInput, UpdateResult} from '@case-clinical/shared/util/sdk';

export class UpdateManufacturersAction extends ManufacturerBusinessActionBase<UpdateResult> {

    constructor(private manufacturers: UserUpdateManufacturerInput[]) {
        super('UpdateManufacturersAction')
    }

    preValidateAction()
    {
        this.validationContext.addRule(
            new IsNotNullOrUndefined(
                'Input',
                'Input should have values',
                this.manufacturers,
                true
            )
        )
    }

    performAction()
    {
        this.response = this.businessProvider.data.userUpdateManufacturers({ input: { manufacturers: this.manufacturers} }).pipe(
                switchMap((response) => of(response.data.updated))
            )
    }
}

export class UpdateManufacturerAction extends ManufacturerBusinessActionBase<boolean> {

    constructor(private manufacturer: UserUpdateManufacturerInput, private manufacturerId: string) {
        super('UpdateManufacturerAction')
    }

    preValidateAction()
    {
        this.validationContext.addRule(
            new IsNotNullOrUndefined(
                'Input',
                'Input should have values',
                this.manufacturer,
                true
            )
        ).addRule(
            new CellIdIsValidRule(
                'Id',
                'Id should be a CUID and not null',
                this.manufacturerId,
                true
                )
        )
    }

    performAction()
    {
        this.response = this.businessProvider.data.userUpdateManufacturer({manufacturerId: this.manufacturerId, input: this.manufacturer }).pipe(
                switchMap((response) => of(response.data.updated))
            )
    }
}
