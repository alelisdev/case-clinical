
import {IsNotNullOrUndefined,IsNumber, StringIsValidDateString, CellIdIsValidRule } from '@schema-driven/rules-engine'
import {of} from 'rxjs'
import {ImplantBusinessActionBase} from './implant.business-action-base'
import {ImplantNameIsValidRule} from '../rules/implant-name-is-valid.rule';
import {switchMap} from 'rxjs';
import {UserUpdateImplantInput} from '@case-clinical/shared/util/sdk';

export class UpdateImplantsAction extends ImplantBusinessActionBase<boolean> {

    constructor(private implants: UserUpdateImplantInput[]) {
        super('UpdateImplantsAction')
    }

    preValidateAction()
    {
        this.validationContext.addRule(
            new IsNotNullOrUndefined(
                'Input',
                'Input should have values',
                this.implants,
                true
            )
        )
    }

    performAction()
    {
        this.response = this.businessProvider.data.userUpdateImplants({ input: { implants: this.implants} }).pipe(
                switchMap(() => of(true))
            )
    }
}

export class UpdateImplantAction extends ImplantBusinessActionBase<boolean> {

    constructor(private implant: UserUpdateImplantInput, private implantId: string) {
        super('UpdateImplantAction')
    }

    preValidateAction()
    {
        this.validationContext.addRule(
            new IsNotNullOrUndefined(
                'Input',
                'Input should have values',
                this.implant,
                true
            )
        ).addRule(
            new CellIdIsValidRule(
                'Id',
                'Id should be a CUID and not null',
                this.implantId,
                true
                )
        )
    }

    performAction()
    {
        this.response = this.businessProvider.data.userUpdateImplant({implantId: this.implantId, input: this.implant }).pipe(
                switchMap(() => of(true))
            )
    }
}
