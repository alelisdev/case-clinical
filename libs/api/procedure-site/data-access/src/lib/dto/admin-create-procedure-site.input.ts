import { Field, InputType } from '@nestjs/graphql'

import { AdminCreatePriorAuthorizationRequestInput } from '@case-clinical/api/prior-authorization-request/data-access' 


@InputType()
export class AdminCreateProcedureSiteInput {

  @Field({ nullable: true }) 
  name?: string

  @Field({ nullable: true }) 
  code?: string

  @Field(() => [AdminCreatePriorAuthorizationRequestInput], { nullable: true }) 
  priorAuthorizationRequests?: AdminCreatePriorAuthorizationRequestInput[]


}