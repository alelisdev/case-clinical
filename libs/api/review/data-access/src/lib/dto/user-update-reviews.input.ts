import { Field, InputType } from '@nestjs/graphql'
import { UserUpdateReviewInput } from './user-update-review.input'

@InputType()
export class UserUpdateReviewsInput {
  @Field(() => [UserUpdateReviewInput], {nullable: true }) 
  reviews: UserUpdateReviewInput[]
}
