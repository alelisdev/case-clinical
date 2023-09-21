import { Field, InputType } from '@nestjs/graphql'

import { UserUpdatePriorAuthorizationRequestInput } from '@case-clinical/api/prior-authorization-request/data-access' 


@InputType()
export class UserUpdateVisitKindInput {

  @Field({ nullable: true }) 
  id?: string

  @Field({ nullable: true }) 
  name?: string

  @Field({ nullable: true }) 
  code?: string

  @Field(() => [UserUpdatePriorAuthorizationRequestInput], { nullable: true }) 
  priorAuthorizationRequests?: UserUpdatePriorAuthorizationRequestInput[]


}