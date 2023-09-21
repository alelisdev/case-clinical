import { Field, InputType } from '@nestjs/graphql'
import { UserUpdateAwardInput } from './user-update-award.input'

@InputType()
export class UserUpdateAwardsInput {
  @Field(() => [UserUpdateAwardInput], {nullable: true }) 
  awards: UserUpdateAwardInput[]
}
