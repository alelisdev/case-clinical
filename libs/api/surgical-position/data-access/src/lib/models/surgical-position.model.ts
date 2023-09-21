import { Field, ObjectType } from '@nestjs/graphql'

import { PriorAuthorizationRequest } from '@case-clinical/api/prior-authorization-request/data-access' 


@ObjectType()
export class SurgicalPosition {

  @Field({ nullable: true }) 
  id?: string

  @Field({ nullable: true }) 
  createdAt?: Date

  @Field({ nullable: true }) 
  updatedAt?: Date

  @Field({ nullable: true }) 
  name?: string

  @Field(() => [PriorAuthorizationRequest], { nullable: true }) 
  priorAuthorizationRequests?: PriorAuthorizationRequest[]


}
