import { Field,InputType } from '@nestjs/graphql'
import { CorePagingInput } from '@case-clinical/api/core/data-access'

@InputType()
export class UserListStepInput extends CorePagingInput {
  @Field({ nullable: true })
  title?: string

  @Field({ nullable: true })
  subtitle?: string

  @Field({ nullable: true })
  courseId?: string
}
