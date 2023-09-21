import { Field, InputType } from '@nestjs/graphql'

import { UserCreateAuthorizationInput } from '@case-clinical/api/authorization/data-access' 
import { UserCreateRecommendedOrderInput } from '@case-clinical/api/recommended-order/data-access' 


@InputType()
export class UserCreateRecommendedOrderAuthorizationInput {

  @Field({ nullable: true }) 
  name?: string

  @Field({ nullable: true }) 
  authorizationId?: string

  @Field({ nullable: true }) 
  recommendedOrderId?: string


  @Field(() => UserCreateAuthorizationInput ,{ nullable: true }) 
  authorization?: UserCreateAuthorizationInput  


  @Field(() => UserCreateRecommendedOrderInput ,{ nullable: true }) 
  recommendedOrder?: UserCreateRecommendedOrderInput  

}
