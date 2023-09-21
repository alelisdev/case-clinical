import { Field, ObjectType } from '@nestjs/graphql'

import { Authorization } from '@case-clinical/api/authorization/data-access'

import { RecommendedOrder } from '@case-clinical/api/recommended-order/data-access'


@ObjectType()
export class RecommendedOrderAuthorization {

  @Field({ nullable: true }) 
  id?: string

  @Field({ nullable: true }) 
  createdAt?: Date

  @Field({ nullable: true }) 
  updatedAt?: Date

  @Field({ nullable: true }) 
  name?: string

  @Field({ nullable: true }) 
  authorizationId?: string

  @Field({ nullable: true }) 
  recommendedOrderId?: string


  @Field(() => Authorization, { nullable: true }) 
  authorization?: Authorization  

  @Field(() => RecommendedOrder, { nullable: true }) 
  recommendedOrder?: RecommendedOrder  

}
