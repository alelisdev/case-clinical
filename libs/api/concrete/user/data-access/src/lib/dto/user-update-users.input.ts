import { Field, InputType } from '@nestjs/graphql'
import { UserUpdateUserInput } from './user-update-user.input'

@InputType()
export class UserUpdateUsersInput {
  @Field(() => [UserUpdateUserInput], {nullable: true }) 
  users: UserUpdateUserInput[]
}
