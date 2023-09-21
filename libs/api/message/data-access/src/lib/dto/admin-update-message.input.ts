import { Field, InputType } from '@nestjs/graphql'

import { AdminUpdateUserInput } from '@case-clinical/api/user/data-access' 
import { AdminUpdateChatInput } from '@case-clinical/api/chat/data-access' 


@InputType()
export class AdminUpdateMessageInput {

  @Field({ nullable: true }) 
  id?: string

  @Field({ nullable: true }) 
  name?: string

  @Field({ nullable: true }) 
  image?: string

  @Field({ nullable: true }) 
  title?: string

  @Field({ nullable: true }) 
  description?: string

  @Field({ nullable: true }) 
  time?: Date

  @Field({ nullable: true }) 
  read?: boolean

  @Field({ nullable: true }) 
  isMine?: boolean

  @Field({ nullable: true }) 
  userId?: string

  @Field({ nullable: true }) 
  chatId?: string


  @Field(() => AdminUpdateUserInput ,{ nullable: true }) 
  user?: AdminUpdateUserInput  


  @Field(() => AdminUpdateChatInput ,{ nullable: true }) 
  chat?: AdminUpdateChatInput  

}