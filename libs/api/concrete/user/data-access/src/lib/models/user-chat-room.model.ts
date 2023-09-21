import { Field, ObjectType } from '@nestjs/graphql'
import { User } from './user.model'

@ObjectType()
export class UserChatRoom {
  @Field({ nullable: true })
  room_id?: string

  @Field({ nullable: true })
  access_token?: string

  @Field({ nullable: true })
  refresh_token?: string
}
