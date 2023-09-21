
import {IsNotNullOrUndefined,IsNumber, StringIsValidDateString, CellIdIsValidRule } from '@schema-driven/rules-engine'
import {of} from 'rxjs'
import {AccidentTypeBusinessActionBase} from './accident-type.business-action-base'
import {AccidentTypeNameIsValidRule} from '../rules/accident-type-name-is-valid.rule';
import {switchMap} from 'rxjs';
import {UserUpdateAccidentTypeInput, UpdateResult} from '@case-clinical/shared/util/sdk';

export class UpdateAccidentTypesAction extends AccidentTypeBusinessActionBase<UpdateResult> {

    constructor(private accidentTypes: UserUpdateAccidentTypeInput[]) {
        super('UpdateAccidentTypesAction')
    }

    preValidateAction()
    {
        this.validationContext.addRule(
            new IsNotNullOrUndefined(
                'Input',
                'Input should have values',
                this.accidentTypes,
                true
            )
        )
    }

    performAction()
    {
        this.response = this.businessProvider.data.userUpdateAccidentTypes({ input: { accidentTypes: this.accidentTypes} }).pipe(
                switchMap((response) => of(response.data.updated))
            )
    }
}

export class UpdateAccidentTypeAction extends AccidentTypeBusinessActionBase<boolean> {

    constructor(private accidentType: UserUpdateAccidentTypeInput, private accidentTypeId: string) {
        super('UpdateAccidentTypeAction')
    }

    preValidateAction()
    {
        this.validationContext.addRule(
            new IsNotNullOrUndefined(
                'Input',
                'Input should have values',
                this.accidentType,
                true
            )
        ).addRule(
            new CellIdIsValidRule(
                'Id',
                'Id should be a CUID and not null',
                this.accidentTypeId,
                true
                )
        )
    }

    performAction()
    {
        this.response = this.businessProvider.data.userUpdateAccidentType({accidentTypeId: this.accidentTypeId, input: this.accidentType }).pipe(
                switchMap((response) => of(response.data.updated))
            )
    }
}
