import { Field, InputType } from '@nestjs/graphql'

import { AdminCreateEligibilityRequestInput } from '@case-clinical/api/eligibility-request/data-access' 


@InputType()
export class AdminCreateEligibilityStatusInput {

  @Field({ nullable: true }) 
  name?: string

  @Field(() => [AdminCreateEligibilityRequestInput], { nullable: true }) 
  eligibilityRequests?: AdminCreateEligibilityRequestInput[]


}