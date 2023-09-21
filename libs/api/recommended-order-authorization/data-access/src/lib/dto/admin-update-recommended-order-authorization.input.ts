import { Field, InputType } from '@nestjs/graphql'

import { AdminUpdateAuthorizationInput } from '@case-clinical/api/authorization/data-access' 
import { AdminUpdateRecommendedOrderInput } from '@case-clinical/api/recommended-order/data-access' 


@InputType()
export class AdminUpdateRecommendedOrderAuthorizationInput {

  @Field({ nullable: true }) 
  id?: string

  @Field({ nullable: true }) 
  name?: string

  @Field({ nullable: true }) 
  authorizationId?: string

  @Field({ nullable: true }) 
  recommendedOrderId?: string


  @Field(() => AdminUpdateAuthorizationInput ,{ nullable: true }) 
  authorization?: AdminUpdateAuthorizationInput  


  @Field(() => AdminUpdateRecommendedOrderInput ,{ nullable: true }) 
  recommendedOrder?: AdminUpdateRecommendedOrderInput  

}