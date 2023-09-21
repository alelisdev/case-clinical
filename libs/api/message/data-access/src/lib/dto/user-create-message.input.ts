import { Field, InputType } from '@nestjs/graphql'

import { UserCreateUserInput } from '@case-clinical/api/user/data-access' 
import { UserCreateChatInput } from '@case-clinical/api/chat/data-access' 


@InputType()
export class UserCreateMessageInput {

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


  @Field(() => UserCreateUserInput ,{ nullable: true }) 
  user?: UserCreateUserInput  


  @Field(() => UserCreateChatInput ,{ nullable: true }) 
  chat?: UserCreateChatInput  

}
