import { Field, ObjectType } from '@nestjs/graphql'

import { Guideline } from '@case-clinical/api/guideline/data-access'

import { PriorAuthorizationRequest } from '@case-clinical/api/prior-authorization-request/data-access'


@ObjectType()
export class PriorAuthGuideline {

  @Field({ nullable: true }) 
  id?: string

  @Field({ nullable: true }) 
  createdAt?: Date

  @Field({ nullable: true }) 
  updatedAt?: Date

  @Field({ nullable: true }) 
  name?: string

  @Field({ nullable: true }) 
  guidelineId?: string

  @Field({ nullable: true }) 
  priorAuthorizationRequestId?: string


  @Field(() => Guideline, { nullable: true }) 
  guideline?: Guideline  

  @Field(() => PriorAuthorizationRequest, { nullable: true }) 
  priorAuthorizationRequest?: PriorAuthorizationRequest  

}
