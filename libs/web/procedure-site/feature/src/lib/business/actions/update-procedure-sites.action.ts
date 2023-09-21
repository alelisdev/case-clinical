
import {IsNotNullOrUndefined,IsNumber, StringIsValidDateString, CellIdIsValidRule } from '@schema-driven/rules-engine'
import {of} from 'rxjs'
import {ProcedureSiteBusinessActionBase} from './procedure-site.business-action-base'
import {ProcedureSiteNameIsValidRule} from '../rules/procedure-site-name-is-valid.rule';
import {switchMap} from 'rxjs';
import {UserUpdateProcedureSiteInput} from '@case-clinical/shared/util/sdk';

export class UpdateProcedureSitesAction extends ProcedureSiteBusinessActionBase<boolean> {

    constructor(private procedureSites: UserUpdateProcedureSiteInput[]) {
        super('UpdateProcedureSitesAction')
    }

    preValidateAction()
    {
        this.validationContext.addRule(
            new IsNotNullOrUndefined(
                'Input',
                'Input should have values',
                this.procedureSites,
                true
            )
        )
    }

    performAction()
    {
        this.response = this.businessProvider.data.userUpdateProcedureSites({ input: { procedureSites: this.procedureSites} }).pipe(
                switchMap(() => of(true))
            )
    }
}

export class UpdateProcedureSiteAction extends ProcedureSiteBusinessActionBase<boolean> {

    constructor(private procedureSite: UserUpdateProcedureSiteInput, private procedureSiteId: string) {
        super('UpdateProcedureSiteAction')
    }

    preValidateAction()
    {
        this.validationContext.addRule(
            new IsNotNullOrUndefined(
                'Input',
                'Input should have values',
                this.procedureSite,
                true
            )
        ).addRule(
            new CellIdIsValidRule(
                'Id',
                'Id should be a CUID and not null',
                this.procedureSiteId,
                true
                )
        )
    }

    performAction()
    {
        this.response = this.businessProvider.data.userUpdateProcedureSite({procedureSiteId: this.procedureSiteId, input: this.procedureSite }).pipe(
                switchMap(() => of(true))
            )
    }
}
