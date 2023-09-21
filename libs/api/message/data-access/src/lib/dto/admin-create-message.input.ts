import { Field, InputType } from '@nestjs/graphql'

import { AdminCreateUserInput } from '@case-clinical/api/user/data-access' 
import { AdminCreateChatInput } from '@case-clinical/api/chat/data-access' 


@InputType()
export class AdminCreateMessageInput {

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


  @Field(() => AdminCreateUserInput ,{ nullable: true }) 
  user?: AdminCreateUserInput  


  @Field(() => AdminCreateChatInput ,{ nullable: true }) 
  chat?: AdminCreateChatInput  

}