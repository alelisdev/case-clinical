import { Field, InputType } from '@nestjs/graphql'

import { AdminUpdateUserInput } from '@case-clinical/api/user/data-access' 
import { UserUpdateMessageInput } from '@case-clinical/api/message/data-access' 


@InputType()
export class AdminUpdateChatInput {

  @Field({ nullable: true }) 
  id?: string

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

  @Field(() => [UserUpdateMessageInput], { nullable: true }) 
  messages?: UserUpdateMessageInput[]


  @Field(() => AdminUpdateUserInput ,{ nullable: true }) 
  user?: AdminUpdateUserInput  

}