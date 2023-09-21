import { Field, InputType } from '@nestjs/graphql'

import { AdminCreateAuthorizationInput } from '@case-clinical/api/authorization/data-access' 
import { AdminCreateRecommendedOrderInput } from '@case-clinical/api/recommended-order/data-access' 


@InputType()
export class AdminCreateRecommendedOrderAuthorizationInput {

  @Field({ nullable: true }) 
  name?: string

  @Field({ nullable: true }) 
  authorizationId?: string

  @Field({ nullable: true }) 
  recommendedOrderId?: string


  @Field(() => AdminCreateAuthorizationInput ,{ nullable: true }) 
  authorization?: AdminCreateAuthorizationInput  


  @Field(() => AdminCreateRecommendedOrderInput ,{ nullable: true }) 
  recommendedOrder?: AdminCreateRecommendedOrderInput  

}