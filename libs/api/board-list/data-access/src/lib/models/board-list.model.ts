import { Field, ObjectType } from '@nestjs/graphql'
import { Board } from '@case-clinical/api/board/data-access'
import { BoardCard } from '@case-clinical/api/board-card/data-access'

@ObjectType()
export class BoardList {

  @Field({ nullable: true })
  id?: string

  @Field({ nullable: true })
  createdAt?: Date

  @Field({ nullable: true })
  updatedAt?: Date

  @Field({ nullable: true })
  title?: string

  @Field({ nullable: true })
  position?: number

  @Field({ nullable: true })
  boardId?: string

  @Field(() => Board, { nullable: true })
  board?: Board

  @Field(() => [BoardCard], { nullable: true })
  cards?: BoardCard[]

}
