
import {IsNotNullOrUndefined,IsNumber, StringIsValidDateString, CellIdIsValidRule } from '@schema-driven/rules-engine'
import {of} from 'rxjs'
import {ProcessBusinessActionBase} from './process.business-action-base'
import {ProcessNameIsValidRule} from '../rules/process-name-is-valid.rule';
import {switchMap} from 'rxjs';
import {UserUpdateProcessInput} from '@case-clinical/shared/util/sdk';

export class UpdateProcessesAction extends ProcessBusinessActionBase<boolean> {

    constructor(private processes: UserUpdateProcessInput[]) {
        super('UpdateProcessesAction')
    }

    preValidateAction()
    {
        this.validationContext.addRule(
            new IsNotNullOrUndefined(
                'Input',
                'Input should have values',
                this.processes,
                true
            )
        )
    }

    performAction()
    {
        this.response = this.businessProvider.data.userUpdateProcesses({ input: { processes: this.processes} }).pipe(
                switchMap(() => of(true))
            )
    }
}

export class UpdateProcessAction extends ProcessBusinessActionBase<boolean> {

    constructor(private process: UserUpdateProcessInput, private processId: string) {
        super('UpdateProcessAction')
    }

    preValidateAction()
    {
        this.validationContext.addRule(
            new IsNotNullOrUndefined(
                'Input',
                'Input should have values',
                this.process,
                true
            )
        ).addRule(
            new CellIdIsValidRule(
                'Id',
                'Id should be a CUID and not null',
                this.processId,
                true
                )
        )
    }

    performAction()
    {
        this.response = this.businessProvider.data.userUpdateProcess({processId: this.processId, input: this.process }).pipe(
                switchMap(() => of(true))
            )
    }
}
