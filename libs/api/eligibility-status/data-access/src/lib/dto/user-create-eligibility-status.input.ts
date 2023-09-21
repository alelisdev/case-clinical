import { Field, InputType } from '@nestjs/graphql'

import { UserCreateEligibilityRequestInput } from '@case-clinical/api/eligibility-request/data-access' 


@InputType()
export class UserCreateEligibilityStatusInput {

  @Field({ nullable: true }) 
  name?: string

  @Field(() => [UserCreateEligibilityRequestInput], { nullable: true }) 
  eligibilityRequests?: UserCreateEligibilityRequestInput[]


}
