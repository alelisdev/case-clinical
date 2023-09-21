import { Field, InputType } from '@nestjs/graphql'

import { AdminCreatePriorAuthorizationRequestInput } from '@case-clinical/api/prior-authorization-request/data-access' 


@InputType()
export class AdminCreateAuthorizationStatusInput {

  @Field({ nullable: true }) 
  name?: string

  @Field(() => [AdminCreatePriorAuthorizationRequestInput], { nullable: true }) 
  priorAuthorizationRequests?: AdminCreatePriorAuthorizationRequestInput[]


}