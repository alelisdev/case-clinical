import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class UserCreateBoardLabelInput {
  @Field({ nullable: true })
  id?: string

  @Field({ nullable: true })
  createdAt?: Date

  @Field({ nullable: true })
  updatedAt?: Date

  @Field({ nullable: true })
  title?: string

  @Field({ nullable: true })
  boardId?: string
}
