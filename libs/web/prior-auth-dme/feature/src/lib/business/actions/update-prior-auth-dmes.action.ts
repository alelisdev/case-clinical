
import {IsNotNullOrUndefined,IsNumber, StringIsValidDateString, CellIdIsValidRule } from '@schema-driven/rules-engine'
import {of} from 'rxjs'
import {PriorAuthDmeBusinessActionBase} from './prior-auth-dme.business-action-base'
import {PriorAuthDmeNameIsValidRule} from '../rules/prior-auth-dme-name-is-valid.rule';
import {switchMap} from 'rxjs';
import {UserUpdatePriorAuthDmeInput} from '@case-clinical/shared/util/sdk';

export class UpdatePriorAuthDmesAction extends PriorAuthDmeBusinessActionBase<boolean> {

    constructor(private priorAuthDmes: UserUpdatePriorAuthDmeInput[]) {
        super('UpdatePriorAuthDmesAction')
    }

    preValidateAction()
    {
        this.validationContext.addRule(
            new IsNotNullOrUndefined(
                'Input',
                'Input should have values',
                this.priorAuthDmes,
                true
            )
        )
    }

    performAction()
    {
        this.response = this.businessProvider.data.userUpdatePriorAuthDmes({ input: { priorAuthDmes: this.priorAuthDmes} }).pipe(
                switchMap(() => of(true))
            )
    }
}

export class UpdatePriorAuthDmeAction extends PriorAuthDmeBusinessActionBase<boolean> {

    constructor(private priorAuthDme: UserUpdatePriorAuthDmeInput, private priorAuthDmeId: string) {
        super('UpdatePriorAuthDmeAction')
    }

    preValidateAction()
    {
        this.validationContext.addRule(
            new IsNotNullOrUndefined(
                'Input',
                'Input should have values',
                this.priorAuthDme,
                true
            )
        ).addRule(
            new CellIdIsValidRule(
                'Id',
                'Id should be a CUID and not null',
                this.priorAuthDmeId,
                true
                )
        )
    }

    performAction()
    {
        this.response = this.businessProvider.data.userUpdatePriorAuthDme({priorAuthDmeId: this.priorAuthDmeId, input: this.priorAuthDme }).pipe(
                switchMap(() => of(true))
            )
    }
}
