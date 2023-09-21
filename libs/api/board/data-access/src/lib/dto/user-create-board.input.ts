import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class UserCreateBoardInput {
  @Field({ nullable: true })
  id?: string

  @Field({ nullable: true })
  createdAt?: Date

  @Field({ nullable: true })
  updatedAt?: Date

  @Field({ nullable: true })
  title?: string

  @Field({ nullable: true })
  description?: string

  @Field({ nullable: true })
  icon?: string

  @Field({ nullable: true })
  lastActivity?: string
}
