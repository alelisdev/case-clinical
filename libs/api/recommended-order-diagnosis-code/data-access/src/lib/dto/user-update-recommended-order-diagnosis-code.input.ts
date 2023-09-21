import { Field, InputType } from '@nestjs/graphql'

import { UserUpdateDiagnosisCodeInput } from '@case-clinical/api/diagnosis-code/data-access' 
import { UserUpdateRecommendedOrderInput } from '@case-clinical/api/recommended-order/data-access' 


@InputType()
export class UserUpdateRecommendedOrderDiagnosisCodeInput {

  @Field({ nullable: true }) 
  id?: string

  @Field({ nullable: true }) 
  name?: string

  @Field({ nullable: true }) 
  diagnosisCodeId?: string

  @Field({ nullable: true }) 
  recommendedOrderId?: string


  @Field(() => UserUpdateDiagnosisCodeInput ,{ nullable: true }) 
  diagnosis?: UserUpdateDiagnosisCodeInput  


  @Field(() => UserUpdateRecommendedOrderInput ,{ nullable: true }) 
  recommendedOrder?: UserUpdateRecommendedOrderInput  

}