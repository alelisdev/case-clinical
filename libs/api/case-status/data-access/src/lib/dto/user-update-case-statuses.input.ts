import { Field, InputType } from '@nestjs/graphql'
import { UserUpdateCaseStatusInput } from './user-update-case-status.input'

@InputType()
export class UserUpdateCaseStatusesInput {
  @Field(() => [UserUpdateCaseStatusInput], {nullable: true }) 
  caseStatuses: UserUpdateCaseStatusInput[]
}
