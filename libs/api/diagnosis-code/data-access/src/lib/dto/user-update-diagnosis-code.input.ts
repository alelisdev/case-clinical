import { Field, InputType } from '@nestjs/graphql'

import { UserUpdatePriorAuthorizationDiagnosisCodeInput } from '@case-clinical/api/prior-authorization-diagnosis-code/data-access' 
import { UserUpdateAuthorizationDiagnosisCodeInput } from '@case-clinical/api/authorization-diagnosis-code/data-access' 
import { UserUpdateProcedureOrTreatmentRequestDiagnosisCodeInput } from '@case-clinical/api/procedure-or-treatment-request-diagnosis-code/data-access' 
import { UserUpdateRecommendedOrderDiagnosisCodeInput } from '@case-clinical/api/recommended-order-diagnosis-code/data-access' 


@InputType()
export class UserUpdateDiagnosisCodeInput {

  @Field({ nullable: true }) 
  id?: string

  @Field({ nullable: true }) 
  name?: string

  @Field(() => [UserUpdatePriorAuthorizationDiagnosisCodeInput], { nullable: true }) 
  priorAuthorizationDiagnosisCodes?: UserUpdatePriorAuthorizationDiagnosisCodeInput[]

  @Field(() => [UserUpdateAuthorizationDiagnosisCodeInput], { nullable: true }) 
  authorizationDiagnosisCodes?: UserUpdateAuthorizationDiagnosisCodeInput[]

  @Field(() => [UserUpdateProcedureOrTreatmentRequestDiagnosisCodeInput], { nullable: true }) 
  procedureOrTreatmentRequestDiagnosisCodes?: UserUpdateProcedureOrTreatmentRequestDiagnosisCodeInput[]

  @Field(() => [UserUpdateRecommendedOrderDiagnosisCodeInput], { nullable: true }) 
  recommendedOrderDiagnosisCodes?: UserUpdateRecommendedOrderDiagnosisCodeInput[]


}