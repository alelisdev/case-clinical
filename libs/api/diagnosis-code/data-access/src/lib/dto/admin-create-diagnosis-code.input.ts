import { Field, InputType } from '@nestjs/graphql'

import { AdminCreatePriorAuthorizationDiagnosisCodeInput } from '@case-clinical/api/prior-authorization-diagnosis-code/data-access' 
import { AdminCreateAuthorizationDiagnosisCodeInput } from '@case-clinical/api/authorization-diagnosis-code/data-access' 
import { AdminCreateProcedureOrTreatmentRequestDiagnosisCodeInput } from '@case-clinical/api/procedure-or-treatment-request-diagnosis-code/data-access' 
import { AdminCreateRecommendedOrderDiagnosisCodeInput } from '@case-clinical/api/recommended-order-diagnosis-code/data-access' 


@InputType()
export class AdminCreateDiagnosisCodeInput {

  @Field({ nullable: true }) 
  name?: string

  @Field(() => [AdminCreatePriorAuthorizationDiagnosisCodeInput], { nullable: true }) 
  priorAuthorizationDiagnosisCodes?: AdminCreatePriorAuthorizationDiagnosisCodeInput[]

  @Field(() => [AdminCreateAuthorizationDiagnosisCodeInput], { nullable: true }) 
  authorizationDiagnosisCodes?: AdminCreateAuthorizationDiagnosisCodeInput[]

  @Field(() => [AdminCreateProcedureOrTreatmentRequestDiagnosisCodeInput], { nullable: true }) 
  procedureOrTreatmentRequestDiagnosisCodes?: AdminCreateProcedureOrTreatmentRequestDiagnosisCodeInput[]

  @Field(() => [AdminCreateRecommendedOrderDiagnosisCodeInput], { nullable: true }) 
  recommendedOrderDiagnosisCodes?: AdminCreateRecommendedOrderDiagnosisCodeInput[]


}