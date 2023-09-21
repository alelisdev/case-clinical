import { Field, ObjectType } from '@nestjs/graphql'
import { User } from '@case-clinical/api/user/data-access'
import { BoardLabel } from '@case-clinical/api/board-label/data-access'
import { BoardList } from '@case-clinical/api/board-list/data-access'

@ObjectType()
export class Board {

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

  @Field(() => [User], { nullable: true })
  user?: User[]

  @Field(() => [BoardLabel], { nullable: true })
  labels?: BoardLabel[]

  @Field(() => [BoardList], { nullable: true })
  lists?: BoardList[]
}
