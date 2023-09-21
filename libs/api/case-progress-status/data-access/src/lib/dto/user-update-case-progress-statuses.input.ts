import { Field, InputType } from '@nestjs/graphql'
import { UserUpdateCaseProgressStatusInput } from './user-update-case-progress-status.input'

@InputType()
export class UserUpdateCaseProgressStatusesInput {
  @Field(() => [UserUpdateCaseProgressStatusInput], {nullable: true }) 
  caseProgressStatuses: UserUpdateCaseProgressStatusInput[]
}
