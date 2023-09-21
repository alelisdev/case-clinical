import { Field, InputType } from '@nestjs/graphql'

import { UserUpdateAuthorizationInput } from '@case-clinical/api/authorization/data-access' 
import { UserUpdateRecommendedOrderInput } from '@case-clinical/api/recommended-order/data-access' 


@InputType()
export class UserUpdateRecommendedOrderAuthorizationInput {

  @Field({ nullable: true }) 
  id?: string

  @Field({ nullable: true }) 
  name?: string

  @Field({ nullable: true }) 
  authorizationId?: string

  @Field({ nullable: true }) 
  recommendedOrderId?: string


  @Field(() => UserUpdateAuthorizationInput ,{ nullable: true }) 
  authorization?: UserUpdateAuthorizationInput  


  @Field(() => UserUpdateRecommendedOrderInput ,{ nullable: true }) 
  recommendedOrder?: UserUpdateRecommendedOrderInput  

}