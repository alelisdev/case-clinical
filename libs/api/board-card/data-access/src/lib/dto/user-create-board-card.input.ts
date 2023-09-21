import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class UserCreateBoardCardInput {
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
  position?: number

  @Field({ nullable: true })
  dueDate?: Date

  @Field({ nullable: true })
  boardListId?: string
}
