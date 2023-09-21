import { Field, ObjectType } from '@nestjs/graphql'
import { User } from './user.model'

@ObjectType()
export class ChatModel {
  @Field({ nullable: true })
  id: string

  @Field({ nullable: true })
  createdAt: Date

  @Field({ nullable: true })
  updatedAt: Date

  @Field({ nullable: true })
  userId: string

  @Field({ nullable: true })
  matrixUserId: string

  @Field(() => User, { nullable: true })
  user: User

  @Field({ nullable: true })
  firmId?: string
}
