import { Field, InputType } from '@nestjs/graphql'

import { UserUpdateRecommendedOrderDiagnosisCodeInput } from '@case-clinical/api/recommended-order-diagnosis-code/data-access' 
import { UserUpdateRecommendedOrderAuthorizationInput } from '@case-clinical/api/recommended-order-authorization/data-access' 


@InputType()
export class AdminUpdateRecommendedOrderInput {

  @Field({ nullable: true }) 
  id?: string

  @Field({ nullable: true }) 
  name?: string

  @Field({ nullable: true }) 
  patientId?: string

  @Field({ nullable: true }) 
  legalCaseId?: string

  @Field({ nullable: true }) 
  requestingProviderId?: string

  @Field(() => [UserUpdateRecommendedOrderDiagnosisCodeInput], { nullable: true }) 
  diagnosisCodes?: UserUpdateRecommendedOrderDiagnosisCodeInput[]

  @Field(() => [UserUpdateRecommendedOrderAuthorizationInput], { nullable: true }) 
  authorizations?: UserUpdateRecommendedOrderAuthorizationInput[]

  @Field({ nullable: true }) 
  status?: string


}