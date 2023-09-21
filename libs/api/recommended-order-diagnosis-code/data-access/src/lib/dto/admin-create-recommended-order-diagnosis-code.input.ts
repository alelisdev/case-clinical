import { Field, InputType } from '@nestjs/graphql'

import { AdminCreateDiagnosisCodeInput } from '@case-clinical/api/diagnosis-code/data-access' 
import { AdminCreateRecommendedOrderInput } from '@case-clinical/api/recommended-order/data-access' 


@InputType()
export class AdminCreateRecommendedOrderDiagnosisCodeInput {

  @Field({ nullable: true }) 
  name?: string

  @Field({ nullable: true }) 
  diagnosisCodeId?: string

  @Field({ nullable: true }) 
  recommendedOrderId?: string


  @Field(() => AdminCreateDiagnosisCodeInput ,{ nullable: true }) 
  diagnosis?: AdminCreateDiagnosisCodeInput  


  @Field(() => AdminCreateRecommendedOrderInput ,{ nullable: true }) 
  recommendedOrder?: AdminCreateRecommendedOrderInput  

}