
import {IsNotNullOrUndefined,IsNumber, StringIsValidDateString, CellIdIsValidRule } from '@schema-driven/rules-engine'
import {of} from 'rxjs'
import {AgreementTypeBusinessActionBase} from './agreement-type.business-action-base'
import {AgreementTypeNameIsValidRule} from '../rules/agreement-type-name-is-valid.rule';
import {switchMap} from 'rxjs';
import {UserUpdateAgreementTypeInput, UpdateResult} from '@case-clinical/shared/util/sdk';

export class UpdateAgreementTypesAction extends AgreementTypeBusinessActionBase<UpdateResult> {

    constructor(private agreementTypes: UserUpdateAgreementTypeInput[]) {
        super('UpdateAgreementTypesAction')
    }

    preValidateAction()
    {
        this.validationContext.addRule(
            new IsNotNullOrUndefined(
                'Input',
                'Input should have values',
                this.agreementTypes,
                true
            )
        )
    }

    performAction()
    {
        this.response = this.businessProvider.data.userUpdateAgreementTypes({ input: { agreementTypes: this.agreementTypes} }).pipe(
                switchMap((response) => of(response.data.updated))
            )
    }
}

export class UpdateAgreementTypeAction extends AgreementTypeBusinessActionBase<boolean> {

    constructor(private agreementType: UserUpdateAgreementTypeInput, private agreementTypeId: string) {
        super('UpdateAgreementTypeAction')
    }

    preValidateAction()
    {
        this.validationContext.addRule(
            new IsNotNullOrUndefined(
                'Input',
                'Input should have values',
                this.agreementType,
                true
            )
        ).addRule(
            new CellIdIsValidRule(
                'Id',
                'Id should be a CUID and not null',
                this.agreementTypeId,
                true
                )
        )
    }

    performAction()
    {
        this.response = this.businessProvider.data.userUpdateAgreementType({agreementTypeId: this.agreementTypeId, input: this.agreementType }).pipe(
                switchMap((response) => of(response.data.updated))
            )
    }
}
