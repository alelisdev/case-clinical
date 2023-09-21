
import {IsNotNullOrUndefined,IsNumber, StringIsValidDateString, CellIdIsValidRule } from '@schema-driven/rules-engine'
import {of} from 'rxjs'
import {RecommendedOrderDiagnosisCodeBusinessActionBase} from './recommended-order-diagnosis-code.business-action-base'
import {RecommendedOrderDiagnosisCodeNameIsValidRule} from '../rules/recommended-order-diagnosis-code-name-is-valid.rule';
import {switchMap} from 'rxjs';
import {UserUpdateRecommendedOrderDiagnosisCodeInput, UpdateResult} from '@case-clinical/shared/util/sdk';

export class UpdateRecommendedOrderDiagnosisCodesAction extends RecommendedOrderDiagnosisCodeBusinessActionBase<UpdateResult> {

    constructor(private recommendedOrderDiagnosisCodes: UserUpdateRecommendedOrderDiagnosisCodeInput[]) {
        super('UpdateRecommendedOrderDiagnosisCodesAction')
    }

    preValidateAction()
    {
        this.validationContext.addRule(
            new IsNotNullOrUndefined(
                'Input',
                'Input should have values',
                this.recommendedOrderDiagnosisCodes,
                true
            )
        )
    }

    performAction()
    {
        this.response = this.businessProvider.data.userUpdateRecommendedOrderDiagnosisCodes({ input: { recommendedOrderDiagnosisCodes: this.recommendedOrderDiagnosisCodes} }).pipe(
                switchMap((response) => of(response.data.updated))
            )
    }
}

export class UpdateRecommendedOrderDiagnosisCodeAction extends RecommendedOrderDiagnosisCodeBusinessActionBase<boolean> {

    constructor(private recommendedOrderDiagnosisCode: UserUpdateRecommendedOrderDiagnosisCodeInput, private recommendedOrderDiagnosisCodeId: string) {
        super('UpdateRecommendedOrderDiagnosisCodeAction')
    }

    preValidateAction()
    {
        this.validationContext.addRule(
            new IsNotNullOrUndefined(
                'Input',
                'Input should have values',
                this.recommendedOrderDiagnosisCode,
                true
            )
        ).addRule(
            new CellIdIsValidRule(
                'Id',
                'Id should be a CUID and not null',
                this.recommendedOrderDiagnosisCodeId,
                true
                )
        )
    }

    performAction()
    {
        this.response = this.businessProvider.data.userUpdateRecommendedOrderDiagnosisCode({recommendedOrderDiagnosisCodeId: this.recommendedOrderDiagnosisCodeId, input: this.recommendedOrderDiagnosisCode }).pipe(
                switchMap((response) => of(response.data.updated))
            )
    }
}
