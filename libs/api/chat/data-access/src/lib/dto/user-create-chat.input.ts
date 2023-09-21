import { Field, InputType } from '@nestjs/graphql'

import { UserCreateUserInput } from '@case-clinical/api/user/data-access' 
import { UserCreateMessageInput } from '@case-clinical/api/message/data-access' 


@InputType()
export class UserCreateChatInput {

  @Field({ nullable: true }) 
  name?: string

  @Field({ nullable: true }) 
  userId?: string

  @Field({ nullable: true }) 
  unreadCount?: number

  @Field({ nullable: true }) 
  muted?: boolean

  @Field({ nullable: true }) 
  lastMessage?: string

  @Field({ nullable: true }) 
  lastMessageAt?: string

  @Field(() => [UserCreateMessageInput], { nullable: true }) 
  messages?: UserCreateMessageInput[]


  @Field(() => UserCreateUserInput ,{ nullable: true }) 
  user?: UserCreateUserInput  

}
