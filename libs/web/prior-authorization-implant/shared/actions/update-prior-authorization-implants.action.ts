
import {IsNotNullOrUndefined,IsNumber, StringIsValidDateString, CellIdIsValidRule } from '@schema-driven/rules-engine'
import {of} from 'rxjs'
import {PriorAuthorizationImplantBusinessActionBase} from './prior-authorization-implant.business-action-base'
import {PriorAuthorizationImplantNameIsValidRule} from '../rules/prior-authorization-implant-name-is-valid.rule';
import {switchMap} from 'rxjs';
import {UserUpdatePriorAuthorizationImplantInput, UpdateResult} from '@case-clinical/shared/util/sdk';

export class UpdatePriorAuthorizationImplantsAction extends PriorAuthorizationImplantBusinessActionBase<UpdateResult> {

    constructor(private priorAuthorizationImplants: UserUpdatePriorAuthorizationImplantInput[]) {
        super('UpdatePriorAuthorizationImplantsAction')
    }

    preValidateAction()
    {
        this.validationContext.addRule(
            new IsNotNullOrUndefined(
                'Input',
                'Input should have values',
                this.priorAuthorizationImplants,
                true
            )
        )
    }

    performAction()
    {
        this.response = this.businessProvider.data.userUpdatePriorAuthorizationImplants({ input: { priorAuthorizationImplants: this.priorAuthorizationImplants} }).pipe(
                switchMap((response) => of(response.data.updated))
            )
    }
}

export class UpdatePriorAuthorizationImplantAction extends PriorAuthorizationImplantBusinessActionBase<boolean> {

    constructor(private priorAuthorizationImplant: UserUpdatePriorAuthorizationImplantInput, private priorAuthorizationImplantId: string) {
        super('UpdatePriorAuthorizationImplantAction')
    }

    preValidateAction()
    {
        this.validationContext.addRule(
            new IsNotNullOrUndefined(
                'Input',
                'Input should have values',
                this.priorAuthorizationImplant,
                true
            )
        ).addRule(
            new CellIdIsValidRule(
                'Id',
                'Id should be a CUID and not null',
                this.priorAuthorizationImplantId,
                true
                )
        )
    }

    performAction()
    {
        this.response = this.businessProvider.data.userUpdatePriorAuthorizationImplant({priorAuthorizationImplantId: this.priorAuthorizationImplantId, input: this.priorAuthorizationImplant }).pipe(
                switchMap((response) => of(response.data.updated))
            )
    }
}
