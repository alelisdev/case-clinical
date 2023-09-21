
import {IsNotNullOrUndefined,IsNumber, StringIsValidDateString, CellIdIsValidRule } from '@schema-driven/rules-engine'
import {of} from 'rxjs'
import {FirmBusinessActionBase} from './firm.business-action-base'
import {FirmNameIsValidRule} from '../rules/firm-name-is-valid.rule';
import {switchMap} from 'rxjs';
import {UserUpdateFirmInput, UpdateResult} from '@case-clinical/shared/util/sdk';

export class UpdateFirmsAction extends FirmBusinessActionBase<UpdateResult> {

    constructor(private firms: UserUpdateFirmInput[]) {
        super('UpdateFirmsAction')
    }

    preValidateAction()
    {
        this.validationContext.addRule(
            new IsNotNullOrUndefined(
                'Input',
                'Input should have values',
                this.firms,
                true
            )
        )
    }

    performAction()
    {
        this.response = this.businessProvider.data.userUpdateFirms({ input: { firms: this.firms} }).pipe(
                switchMap((response) => of(response.data.updated))
            )
    }
}

export class UpdateFirmAction extends FirmBusinessActionBase<boolean> {

    constructor(private firm: UserUpdateFirmInput, private firmId: string) {
        super('UpdateFirmAction')
    }

    preValidateAction()
    {
        this.validationContext.addRule(
            new IsNotNullOrUndefined(
                'Input',
                'Input should have values',
                this.firm,
                true
            )
        ).addRule(
            new CellIdIsValidRule(
                'Id',
                'Id should be a CUID and not null',
                this.firmId,
                true
                )
        )
    }

    performAction()
    {
        this.response = this.businessProvider.data.userUpdateFirm({firmId: this.firmId, input: this.firm }).pipe(
                switchMap((response) => of(response.data.updated))
            )
    }
}
