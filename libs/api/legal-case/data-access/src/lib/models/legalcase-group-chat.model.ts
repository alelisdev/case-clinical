import { Field, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class GroupChatModel {
  @Field({ nullable: true })
  room_id?: string
}
