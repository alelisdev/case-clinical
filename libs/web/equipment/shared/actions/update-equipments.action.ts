
import {IsNotNullOrUndefined,IsNumber, StringIsValidDateString, CellIdIsValidRule } from '@schema-driven/rules-engine'
import {of} from 'rxjs'
import {EquipmentBusinessActionBase} from './equipment.business-action-base'
import {EquipmentNameIsValidRule} from '../rules/equipment-name-is-valid.rule';
import {switchMap} from 'rxjs';
import {UserUpdateEquipmentInput, UpdateResult} from '@case-clinical/shared/util/sdk';

export class UpdateEquipmentsAction extends EquipmentBusinessActionBase<UpdateResult> {

    constructor(private equipments: UserUpdateEquipmentInput[]) {
        super('UpdateEquipmentsAction')
    }

    preValidateAction()
    {
        this.validationContext.addRule(
            new IsNotNullOrUndefined(
                'Input',
                'Input should have values',
                this.equipments,
                true
            )
        )
    }

    performAction()
    {
        this.response = this.businessProvider.data.userUpdateEquipments({ input: { equipments: this.equipments} }).pipe(
                switchMap((response) => of(response.data.updated))
            )
    }
}

export class UpdateEquipmentAction extends EquipmentBusinessActionBase<boolean> {

    constructor(private equipment: UserUpdateEquipmentInput, private equipmentId: string) {
        super('UpdateEquipmentAction')
    }

    preValidateAction()
    {
        this.validationContext.addRule(
            new IsNotNullOrUndefined(
                'Input',
                'Input should have values',
                this.equipment,
                true
            )
        ).addRule(
            new CellIdIsValidRule(
                'Id',
                'Id should be a CUID and not null',
                this.equipmentId,
                true
                )
        )
    }

    performAction()
    {
        this.response = this.businessProvider.data.userUpdateEquipment({equipmentId: this.equipmentId, input: this.equipment }).pipe(
                switchMap(() => of(true))
            )
    }
}
