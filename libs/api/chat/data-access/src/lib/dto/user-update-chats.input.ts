import { Field, InputType } from '@nestjs/graphql'
import { UserUpdateChatInput } from './user-update-chat.input'

@InputType()
export class UserUpdateChatsInput {
  @Field(() => [UserUpdateChatInput], {nullable: true }) 
  chats: UserUpdateChatInput[]
}
