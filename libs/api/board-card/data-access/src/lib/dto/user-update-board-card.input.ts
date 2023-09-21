import { Field, InputType } from '@nestjs/graphql'

import { UserUpdateFirmInput } from '@case-clinical/api/firm/data-access'
import { UserUpdateAttorneyStatusInput } from '@case-clinical/api/attorney-status/data-access'
import { UserUpdateAttorneyTypeInput } from '@case-clinical/api/attorney-type/data-access'
import { UserUpdateLegalCaseInput } from '@case-clinical/api/legal-case/data-access'
import { UserUpdateUserInput } from '@case-clinical/api/user/data-access'


@InputType()
export class UserUpdateBoardCardInput {
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
