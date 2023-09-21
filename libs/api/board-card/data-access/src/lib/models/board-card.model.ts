import { Field, ObjectType } from '@nestjs/graphql'
import { BoardList } from '@case-clinical/api/board-list/data-access'
import { Document } from '@case-clinical/api/document/data-access'
import { User } from '@case-clinical/api/user/data-access'
import { BoardLabel } from '@case-clinical/api/board-label/data-access'

@ObjectType()
export class BoardCard {

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

  @Field(() => BoardList, { nullable: true })
  boardList?: BoardList

  @Field(() => [User], { nullable: true })
  users?: User[]

  @Field(() => [Document], { nullable: true })
  documents?: Document[]

  @Field(() => [BoardLabel], { nullable: true })
  labels?: BoardLabel[]

}
