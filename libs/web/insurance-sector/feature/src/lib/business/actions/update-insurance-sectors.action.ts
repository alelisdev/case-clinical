
import {IsNotNullOrUndefined,IsNumber, StringIsValidDateString, CellIdIsValidRule } from '@schema-driven/rules-engine'
import {of} from 'rxjs'
import {InsuranceSectorBusinessActionBase} from './insurance-sector.business-action-base'
import {InsuranceSectorNameIsValidRule} from '../rules/insurance-sector-name-is-valid.rule';
import {switchMap} from 'rxjs';
import {UserUpdateInsuranceSectorInput} from '@case-clinical/shared/util/sdk';

export class UpdateInsuranceSectorsAction extends InsuranceSectorBusinessActionBase<boolean> {

    constructor(private insuranceSectors: UserUpdateInsuranceSectorInput[]) {
        super('UpdateInsuranceSectorsAction')
    }

    preValidateAction()
    {
        this.validationContext.addRule(
            new IsNotNullOrUndefined(
                'Input',
                'Input should have values',
                this.insuranceSectors,
                true
            )
        )
    }

    performAction()
    {
        this.response = this.businessProvider.data.userUpdateInsuranceSectors({ input: { insuranceSectors: this.insuranceSectors} }).pipe(
                switchMap(() => of(true))
            )
    }
}

export class UpdateInsuranceSectorAction extends InsuranceSectorBusinessActionBase<boolean> {

    constructor(private insuranceSector: UserUpdateInsuranceSectorInput, private insuranceSectorId: string) {
        super('UpdateInsuranceSectorAction')
    }

    preValidateAction()
    {
        this.validationContext.addRule(
            new IsNotNullOrUndefined(
                'Input',
                'Input should have values',
                this.insuranceSector,
                true
            )
        ).addRule(
            new CellIdIsValidRule(
                'Id',
                'Id should be a CUID and not null',
                this.insuranceSectorId,
                true
                )
        )
    }

    performAction()
    {
        this.response = this.businessProvider.data.userUpdateInsuranceSector({insuranceSectorId: this.insuranceSectorId, input: this.insuranceSector }).pipe(
                switchMap(() => of(true))
            )
    }
}
