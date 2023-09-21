import { Field, InputType } from '@nestjs/graphql'

import { UserCreatePriorAuthorizationDiagnosisCodeInput } from '@case-clinical/api/prior-authorization-diagnosis-code/data-access' 
import { UserCreateAuthorizationDiagnosisCodeInput } from '@case-clinical/api/authorization-diagnosis-code/data-access' 
import { UserCreateProcedureOrTreatmentRequestDiagnosisCodeInput } from '@case-clinical/api/procedure-or-treatment-request-diagnosis-code/data-access' 
import { UserCreateRecommendedOrderDiagnosisCodeInput } from '@case-clinical/api/recommended-order-diagnosis-code/data-access' 


@InputType()
export class UserCreateDiagnosisCodeInput {

  @Field({ nullable: true }) 
  name?: string

  @Field(() => [UserCreatePriorAuthorizationDiagnosisCodeInput], { nullable: true }) 
  priorAuthorizationDiagnosisCodes?: UserCreatePriorAuthorizationDiagnosisCodeInput[]

  @Field(() => [UserCreateAuthorizationDiagnosisCodeInput], { nullable: true }) 
  authorizationDiagnosisCodes?: UserCreateAuthorizationDiagnosisCodeInput[]

  @Field(() => [UserCreateProcedureOrTreatmentRequestDiagnosisCodeInput], { nullable: true }) 
  procedureOrTreatmentRequestDiagnosisCodes?: UserCreateProcedureOrTreatmentRequestDiagnosisCodeInput[]

  @Field(() => [UserCreateRecommendedOrderDiagnosisCodeInput], { nullable: true }) 
  recommendedOrderDiagnosisCodes?: UserCreateRecommendedOrderDiagnosisCodeInput[]


}
