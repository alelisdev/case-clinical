import { Field, InputType } from '@nestjs/graphql'

import { AdminCreateUserInput } from '@case-clinical/api/user/data-access' 
import { AdminCreateMessageInput } from '@case-clinical/api/message/data-access' 


@InputType()
export class AdminCreateChatInput {

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

  @Field(() => [AdminCreateMessageInput], { nullable: true }) 
  messages?: AdminCreateMessageInput[]


  @Field(() => AdminCreateUserInput ,{ nullable: true }) 
  user?: AdminCreateUserInput  

}