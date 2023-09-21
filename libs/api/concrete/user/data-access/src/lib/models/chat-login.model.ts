import { Field, ObjectType } from '@nestjs/graphql'
import { User } from './user.model'

@ObjectType()
export class ChatLoginModel {
  @Field({ nullable: true })
  user_id: string

  @Field({ nullable: true })
  access_token: string

  @Field({ nullable: true })
  refresh_token?: string
}
