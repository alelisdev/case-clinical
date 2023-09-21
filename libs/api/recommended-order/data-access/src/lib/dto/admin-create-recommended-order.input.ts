import { Field, InputType } from '@nestjs/graphql'

import { AdminCreateRecommendedOrderDiagnosisCodeInput } from '@case-clinical/api/recommended-order-diagnosis-code/data-access' 
import { AdminCreateRecommendedOrderAuthorizationInput } from '@case-clinical/api/recommended-order-authorization/data-access' 


@InputType()
export class AdminCreateRecommendedOrderInput {

  @Field({ nullable: true }) 
  name?: string

  @Field({ nullable: true }) 
  patientId?: string

  @Field({ nullable: true }) 
  legalCaseId?: string

  @Field({ nullable: true }) 
  requestingProviderId?: string

  @Field(() => [AdminCreateRecommendedOrderDiagnosisCodeInput], { nullable: true }) 
  diagnosisCodes?: AdminCreateRecommendedOrderDiagnosisCodeInput[]

  @Field(() => [AdminCreateRecommendedOrderAuthorizationInput], { nullable: true }) 
  authorizations?: AdminCreateRecommendedOrderAuthorizationInput[]

  @Field({ nullable: true }) 
  status?: string


}