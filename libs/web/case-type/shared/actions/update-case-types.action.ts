
import {IsNotNullOrUndefined,IsNumber, StringIsValidDateString, CellIdIsValidRule } from '@schema-driven/rules-engine'
import {of} from 'rxjs'
import {CaseTypeBusinessActionBase} from './case-type.business-action-base'
import {CaseTypeNameIsValidRule} from '../rules/case-type-name-is-valid.rule';
import {switchMap} from 'rxjs';
import {UserUpdateCaseTypeInput, UpdateResult} from '@case-clinical/shared/util/sdk';

export class UpdateCaseTypesAction extends CaseTypeBusinessActionBase<UpdateResult> {

    constructor(private caseTypes: UserUpdateCaseTypeInput[]) {
        super('UpdateCaseTypesAction')
    }

    preValidateAction()
    {
        this.validationContext.addRule(
            new IsNotNullOrUndefined(
                'Input',
                'Input should have values',
                this.caseTypes,
                true
            )
        )
    }

    performAction()
    {
        this.response = this.businessProvider.data.userUpdateCaseTypes({ input: { caseTypes: this.caseTypes} }).pipe(
                switchMap((response) => of(response.data.updated))
            )
    }
}

export class UpdateCaseTypeAction extends CaseTypeBusinessActionBase<boolean> {

    constructor(private caseType: UserUpdateCaseTypeInput, private caseTypeId: string) {
        super('UpdateCaseTypeAction')
    }

    preValidateAction()
    {
        this.validationContext.addRule(
            new IsNotNullOrUndefined(
                'Input',
                'Input should have values',
                this.caseType,
                true
            )
        ).addRule(
            new CellIdIsValidRule(
                'Id',
                'Id should be a CUID and not null',
                this.caseTypeId,
                true
                )
        )
    }

    performAction()
    {
        this.response = this.businessProvider.data.userUpdateCaseType({caseTypeId: this.caseTypeId, input: this.caseType }).pipe(
                switchMap((response) => of(response.data.updated))
            )
    }
}
