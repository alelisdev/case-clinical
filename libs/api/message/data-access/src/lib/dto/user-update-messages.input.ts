import { Field, InputType } from '@nestjs/graphql'
import { UserUpdateMessageInput } from './user-update-message.input'

@InputType()
export class UserUpdateMessagesInput {
  @Field(() => [UserUpdateMessageInput], {nullable: true }) 
  messages: UserUpdateMessageInput[]
}
