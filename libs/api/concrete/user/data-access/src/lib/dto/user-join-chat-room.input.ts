import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class UserJoinChatRoom {
  @Field({ nullable: true })
  roomId: string

  @Field({ nullable: true })
  access_token: string

  @Field({ nullable: true })
  refresh_token: string
}
