import { Field, InputType } from '@nestjs/graphql'
import { UserUpdateEligibilityRequestInput } from './user-update-eligibility-request.input'

@InputType()
export class UserUpdateEligibilityRequestsInput {
  @Field(() => [UserUpdateEligibilityRequestInput], {nullable: true }) 
  eligibilityRequests: UserUpdateEligibilityRequestInput[]
}
