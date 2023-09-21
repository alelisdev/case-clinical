import { Field, ObjectType } from '@nestjs/graphql'

import { User } from '@case-clinical/api/user/data-access'

import { Chat } from '@case-clinical/api/chat/data-access'


@ObjectType()
export class Message {

  @Field({ nullable: true }) 
  id?: string

  @Field({ nullable: true }) 
  createdAt?: Date

  @Field({ nullable: true }) 
  updatedAt?: Date

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


  @Field(() => User, { nullable: true }) 
  user?: User  

  @Field(() => Chat, { nullable: true }) 
  chat?: Chat  

}
