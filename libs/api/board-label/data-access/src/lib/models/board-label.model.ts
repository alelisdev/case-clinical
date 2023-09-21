import { Field, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class BoardLabel {

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
