import { Field, InputType } from '@nestjs/graphql'



@InputType()
export class RecommendedOrderAuthorizationInput {

  @Field({ nullable: true }) 
  id?: string

  @Field({ nullable: true }) 
  name?: string

  @Field({ nullable: true }) 
  authorizationId?: string

  @Field({ nullable: true }) 
  recommendedOrderId?: string
}
