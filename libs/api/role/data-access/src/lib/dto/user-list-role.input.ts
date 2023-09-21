import { Field,InputType } from '@nestjs/graphql'
import { CorePagingInput } from '@case-clinical/api/core/data-access'

@InputType()
export class UserListRoleInput extends CorePagingInput {
  @Field({ nullable: true }) 
  name?: string



}
