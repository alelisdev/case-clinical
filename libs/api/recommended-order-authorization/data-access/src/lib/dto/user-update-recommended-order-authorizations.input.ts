import { Field, InputType } from '@nestjs/graphql'
import { UserUpdateRecommendedOrderAuthorizationInput } from './user-update-recommended-order-authorization.input'

@InputType()
export class UserUpdateRecommendedOrderAuthorizationsInput {
  @Field(() => [UserUpdateRecommendedOrderAuthorizationInput], {nullable: true }) 
  recommendedOrderAuthorizations: UserUpdateRecommendedOrderAuthorizationInput[]
}
