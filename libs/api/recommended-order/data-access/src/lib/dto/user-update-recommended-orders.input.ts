import { Field, InputType } from '@nestjs/graphql'
import { UserUpdateRecommendedOrderInput } from './user-update-recommended-order.input'

@InputType()
export class UserUpdateRecommendedOrdersInput {
  @Field(() => [UserUpdateRecommendedOrderInput], {nullable: true }) 
  recommendedOrders: UserUpdateRecommendedOrderInput[]
}
