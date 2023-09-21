import { Field, ObjectType } from '@nestjs/graphql'

import { Implant } from '@case-clinical/api/implant/data-access'

import { PriorAuthorizationRequest } from '@case-clinical/api/prior-authorization-request/data-access'


@ObjectType()
export class PriorAuthorizationImplant {

  @Field({ nullable: true }) 
  id?: string

  @Field({ nullable: true }) 
  createdAt?: Date

  @Field({ nullable: true }) 
  updatedAt?: Date

  @Field({ nullable: true }) 
  name?: string

  @Field({ nullable: true }) 
  estimatedCost?: number

  @Field({ nullable: true }) 
  implantId?: string

  @Field({ nullable: true }) 
  priorAuthorizationRequestId?: string


  @Field(() => Implant, { nullable: true }) 
  implant?: Implant  

  @Field(() => PriorAuthorizationRequest, { nullable: true }) 
  priorAuthorizationRequest?: PriorAuthorizationRequest  

}
