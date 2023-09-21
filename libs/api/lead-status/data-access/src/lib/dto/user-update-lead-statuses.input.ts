import { Field, InputType } from '@nestjs/graphql'
import { UserUpdateLeadStatusInput } from './user-update-lead-status.input'

@InputType()
export class UserUpdateLeadStatusesInput {
  @Field(() => [UserUpdateLeadStatusInput], {nullable: true }) 
  leadStatuses: UserUpdateLeadStatusInput[]
}
