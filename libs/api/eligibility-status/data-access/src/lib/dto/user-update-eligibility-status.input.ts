import { Field, InputType } from '@nestjs/graphql'

import { UserUpdateEligibilityRequestInput } from '@case-clinical/api/eligibility-request/data-access' 


@InputType()
export class UserUpdateEligibilityStatusInput {

  @Field({ nullable: true }) 
  id?: string

  @Field({ nullable: true }) 
  name?: string

  @Field(() => [UserUpdateEligibilityRequestInput], { nullable: true }) 
  eligibilityRequests?: UserUpdateEligibilityRequestInput[]


}