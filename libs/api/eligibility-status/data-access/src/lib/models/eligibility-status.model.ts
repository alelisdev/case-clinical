import { Field, ObjectType } from '@nestjs/graphql'

import { EligibilityRequest } from '@case-clinical/api/eligibility-request/data-access' 


@ObjectType()
export class EligibilityStatus {

  @Field({ nullable: true }) 
  id?: string

  @Field({ nullable: true }) 
  createdAt?: Date

  @Field({ nullable: true }) 
  updatedAt?: Date

  @Field({ nullable: true }) 
  name?: string

  @Field(() => [EligibilityRequest], { nullable: true }) 
  eligibilityRequests?: EligibilityRequest[]


}
