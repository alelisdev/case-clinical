import { Field, ObjectType } from '@nestjs/graphql'

import { User } from '@case-clinical/api/user/data-access'
import { Message } from '@case-clinical/api/message/data-access' 


@ObjectType()
export class Chat {

  @Field({ nullable: true }) 
  id?: string

  @Field({ nullable: true }) 
  createdAt?: Date

  @Field({ nullable: true }) 
  updatedAt?: Date

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

  @Field(() => [Message], { nullable: true }) 
  messages?: Message[]


  @Field(() => User, { nullable: true }) 
  user?: User  

}
