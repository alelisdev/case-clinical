
import {IsNotNullOrUndefined,IsNumber, StringIsValidDateString, CellIdIsValidRule } from '@schema-driven/rules-engine'
import {of} from 'rxjs'
import {WriteOffBusinessActionBase} from './write-off.business-action-base'
import {WriteOffNameIsValidRule} from '../rules/write-off-name-is-valid.rule';
import {switchMap} from 'rxjs';
import {UserUpdateWriteOffInput, UpdateResult} from '@case-clinical/shared/util/sdk';

export class UpdateWriteOffsAction extends WriteOffBusinessActionBase<UpdateResult> {

    constructor(private writeOffs: UserUpdateWriteOffInput[]) {
        super('UpdateWriteOffsAction')
    }

    preValidateAction()
    {
        this.validationContext.addRule(
            new IsNotNullOrUndefined(
                'Input',
                'Input should have values',
                this.writeOffs,
                true
            )
        )
    }

    performAction()
    {
        this.response = this.businessProvider.data.userUpdateWriteOffs({ input: { writeOffs: this.writeOffs} }).pipe(
                switchMap((response) => of(response.data.updated))
            )
    }
}

export class UpdateWriteOffAction extends WriteOffBusinessActionBase<boolean> {

    constructor(private writeOff: UserUpdateWriteOffInput, private writeOffId: string) {
        super('UpdateWriteOffAction')
    }

    preValidateAction()
    {
        this.validationContext.addRule(
            new IsNotNullOrUndefined(
                'Input',
                'Input should have values',
                this.writeOff,
                true
            )
        ).addRule(
            new CellIdIsValidRule(
                'Id',
                'Id should be a CUID and not null',
                this.writeOffId,
                true
                )
        )
    }

    performAction()
    {
        this.response = this.businessProvider.data.userUpdateWriteOff({writeOffId: this.writeOffId, input: this.writeOff }).pipe(
                switchMap((response) => of(response.data.updated))
            )
    }
}
