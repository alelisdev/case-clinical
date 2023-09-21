import { Field, InputType } from '@nestjs/graphql'
import { UserUpdateReferralRequestInput } from './user-update-referral-request.input'

@InputType()
export class UserUpdateReferralRequestsInput {
  @Field(() => [UserUpdateReferralRequestInput], {nullable: true }) 
  referralRequests: UserUpdateReferralRequestInput[]
}
