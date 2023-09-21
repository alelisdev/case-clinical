import { Field, ObjectType } from '@nestjs/graphql'

import { PriorAuthorizationDiagnosisCode } from '@case-clinical/api/prior-authorization-diagnosis-code/data-access' 
import { AuthorizationDiagnosisCode } from '@case-clinical/api/authorization-diagnosis-code/data-access' 
import { ProcedureOrTreatmentRequestDiagnosisCode } from '@case-clinical/api/procedure-or-treatment-request-diagnosis-code/data-access' 
import { RecommendedOrderDiagnosisCode } from '@case-clinical/api/recommended-order-diagnosis-code/data-access' 


@ObjectType()
export class DiagnosisCode {

  @Field({ nullable: true }) 
  id?: string

  @Field({ nullable: true }) 
  createdAt?: Date

  @Field({ nullable: true }) 
  updatedAt?: Date

  @Field({ nullable: true }) 
  name?: string

  @Field(() => [PriorAuthorizationDiagnosisCode], { nullable: true }) 
  priorAuthorizationDiagnosisCodes?: PriorAuthorizationDiagnosisCode[]

  @Field(() => [AuthorizationDiagnosisCode], { nullable: true }) 
  authorizationDiagnosisCodes?: AuthorizationDiagnosisCode[]

  @Field(() => [ProcedureOrTreatmentRequestDiagnosisCode], { nullable: true }) 
  procedureOrTreatmentRequestDiagnosisCodes?: ProcedureOrTreatmentRequestDiagnosisCode[]

  @Field(() => [RecommendedOrderDiagnosisCode], { nullable: true }) 
  recommendedOrderDiagnosisCodes?: RecommendedOrderDiagnosisCode[]


}
