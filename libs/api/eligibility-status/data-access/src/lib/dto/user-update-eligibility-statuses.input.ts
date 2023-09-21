import { Field, InputType } from '@nestjs/graphql'
import { UserUpdateEligibilityStatusInput } from './user-update-eligibility-status.input'

@InputType()
export class UserUpdateEligibilityStatusesInput {
  @Field(() => [UserUpdateEligibilityStatusInput], {nullable: true }) 
  eligibilityStatuses: UserUpdateEligibilityStatusInput[]
}
