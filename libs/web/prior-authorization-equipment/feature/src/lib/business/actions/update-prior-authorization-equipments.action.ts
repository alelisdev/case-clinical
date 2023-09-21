
import {IsNotNullOrUndefined,IsNumber, StringIsValidDateString, CellIdIsValidRule } from '@schema-driven/rules-engine'
import {of} from 'rxjs'
import {PriorAuthorizationEquipmentBusinessActionBase} from './prior-authorization-equipment.business-action-base'
import {PriorAuthorizationEquipmentNameIsValidRule} from '../rules/prior-authorization-equipment-name-is-valid.rule';
import {switchMap} from 'rxjs';
import {UserUpdatePriorAuthorizationEquipmentInput} from '@case-clinical/shared/util/sdk';

export class UpdatePriorAuthorizationequipmentsAction extends PriorAuthorizationEquipmentBusinessActionBase<boolean> {

    constructor(private priorAuthorizationEquipments: UserUpdatePriorAuthorizationEquipmentInput[]) {
        super('UpdatePriorAuthorizationequipmentsAction')
    }

    preValidateAction()
    {
        this.validationContext.addRule(
            new IsNotNullOrUndefined(
                'Input',
                'Input should have values',
                this.priorAuthorizationEquipments,
                true
            )
        )
    }

    performAction()
    {
        this.response = this.businessProvider.data.userUpdatePriorAuthorizationequipments({ input: { priorAuthorizationEquipments: this.priorAuthorizationEquipments} }).pipe(
                switchMap(() => of(true))
            )
    }
}

export class UpdatePriorAuthorizationEquipmentAction extends PriorAuthorizationEquipmentBusinessActionBase<boolean> {

    constructor(private priorAuthorizationEquipment: UserUpdatePriorAuthorizationEquipmentInput, private priorAuthorizationEquipmentId: string) {
        super('UpdatePriorAuthorizationEquipmentAction')
    }

    preValidateAction()
    {
        this.validationContext.addRule(
            new IsNotNullOrUndefined(
                'Input',
                'Input should have values',
                this.priorAuthorizationEquipment,
                true
            )
        ).addRule(
            new CellIdIsValidRule(
                'Id',
                'Id should be a CUID and not null',
                this.priorAuthorizationEquipmentId,
                true
                )
        )
    }

    performAction()
    {
        this.response = this.businessProvider.data.userUpdatePriorAuthorizationEquipment({priorAuthorizationEquipmentId: this.priorAuthorizationEquipmentId, input: this.priorAuthorizationEquipment }).pipe(
                switchMap(() => of(true))
            )
    }
}
