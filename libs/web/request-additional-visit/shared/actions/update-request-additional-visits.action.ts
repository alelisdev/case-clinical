
import {IsNotNullOrUndefined,IsNumber, StringIsValidDateString, CellIdIsValidRule } from '@schema-driven/rules-engine'
import {of} from 'rxjs'
import {RequestAdditionalVisitBusinessActionBase} from './request-additional-visit.business-action-base'
import {RequestAdditionalVisitNameIsValidRule} from '../rules/request-additional-visit-name-is-valid.rule';
import {switchMap} from 'rxjs';
import {UserUpdateRequestAdditionalVisitInput, UpdateResult} from '@case-clinical/shared/util/sdk';

export class UpdateRequestAdditionalVisitsAction extends RequestAdditionalVisitBusinessActionBase<UpdateResult> {

    constructor(private requestAdditionalVisits: UserUpdateRequestAdditionalVisitInput[]) {
        super('UpdateRequestAdditionalVisitsAction')
    }

    preValidateAction()
    {
        this.validationContext.addRule(
            new IsNotNullOrUndefined(
                'Input',
                'Input should have values',
                this.requestAdditionalVisits,
                true
            )
        )
    }

    performAction()
    {
        this.response = this.businessProvider.data.userUpdateRequestAdditionalVisits({ input: { requestAdditionalVisits: this.requestAdditionalVisits} }).pipe(
                switchMap((response) => of(response.data.updated))
            )
    }
}

export class UpdateRequestAdditionalVisitAction extends RequestAdditionalVisitBusinessActionBase<boolean> {

    constructor(private requestAdditionalVisit: UserUpdateRequestAdditionalVisitInput, private requestAdditionalVisitId: string) {
        super('UpdateRequestAdditionalVisitAction')
    }

    preValidateAction()
    {
        this.validationContext.addRule(
            new IsNotNullOrUndefined(
                'Input',
                'Input should have values',
                this.requestAdditionalVisit,
                true
            )
        ).addRule(
            new CellIdIsValidRule(
                'Id',
                'Id should be a CUID and not null',
                this.requestAdditionalVisitId,
                true
                )
        )
    }

    performAction()
    {
        this.response = this.businessProvider.data.userUpdateRequestAdditionalVisit({requestAdditionalVisitId: this.requestAdditionalVisitId, input: this.requestAdditionalVisit }).pipe(
                switchMap((response) => of(response.data.updated))
            )
    }
}
