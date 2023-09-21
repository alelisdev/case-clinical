import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class UserCreateChatRoom {
  @Field({ nullable: true })
  fromId: string

  @Field({ nullable: true })
  toId: string

  @Field({ nullable: true })
  access_token: string

  @Field({ nullable: true })
  refresh_token: string
}
