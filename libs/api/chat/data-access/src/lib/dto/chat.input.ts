import { Field, InputType } from '@nestjs/graphql'



@InputType()
export class ChatInput {

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

}
