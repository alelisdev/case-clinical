import { Field, InputType } from '@nestjs/graphql'

import { UserCreateDiagnosisCodeInput } from '@case-clinical/api/diagnosis-code/data-access' 
import { UserCreateRecommendedOrderInput } from '@case-clinical/api/recommended-order/data-access' 


@InputType()
export class UserCreateRecommendedOrderDiagnosisCodeInput {

  @Field({ nullable: true }) 
  name?: string

  @Field({ nullable: true }) 
  diagnosisCodeId?: string

  @Field({ nullable: true }) 
  recommendedOrderId?: string


  @Field(() => UserCreateDiagnosisCodeInput ,{ nullable: true }) 
  diagnosis?: UserCreateDiagnosisCodeInput  


  @Field(() => UserCreateRecommendedOrderInput ,{ nullable: true }) 
  recommendedOrder?: UserCreateRecommendedOrderInput  

}
