import { Field, InputType } from '@nestjs/graphql'

import { AdminUpdateDiagnosisCodeInput } from '@case-clinical/api/diagnosis-code/data-access' 
import { AdminUpdateRecommendedOrderInput } from '@case-clinical/api/recommended-order/data-access' 


@InputType()
export class AdminUpdateRecommendedOrderDiagnosisCodeInput {

  @Field({ nullable: true }) 
  id?: string

  @Field({ nullable: true }) 
  name?: string

  @Field({ nullable: true }) 
  diagnosisCodeId?: string

  @Field({ nullable: true }) 
  recommendedOrderId?: string


  @Field(() => AdminUpdateDiagnosisCodeInput ,{ nullable: true }) 
  diagnosis?: AdminUpdateDiagnosisCodeInput  


  @Field(() => AdminUpdateRecommendedOrderInput ,{ nullable: true }) 
  recommendedOrder?: AdminUpdateRecommendedOrderInput  

}