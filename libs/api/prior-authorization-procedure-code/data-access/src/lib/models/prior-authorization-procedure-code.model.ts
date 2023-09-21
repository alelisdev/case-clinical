import { Field, ObjectType } from '@nestjs/graphql'

import { CostCategory } from '@case-clinical/api/cost-category/data-access'

import { Procedure } from '@case-clinical/api/procedure/data-access'

import { PriorAuthorizationRequest } from '@case-clinical/api/prior-authorization-request/data-access'


@ObjectType()
export class PriorAuthorizationProcedureCode {

  @Field({ nullable: true }) 
  procedureId?: string

  @Field({ nullable: true }) 
  priorAuthorizationRequestId?: string

  @Field({ nullable: true }) 
  id?: string

  @Field({ nullable: true }) 
  createdAt?: Date

  @Field({ nullable: true }) 
  updatedAt?: Date

  @Field({ nullable: true }) 
  name?: string

  @Field({ nullable: true }) 
  costCategoryId?: string

  @Field({ nullable: true }) 
  estimatedCost?: number


  @Field(() => CostCategory, { nullable: true }) 
  costCategory?: CostCategory  

  @Field(() => Procedure, { nullable: true }) 
  procedure?: Procedure  

  @Field(() => PriorAuthorizationRequest, { nullable: true }) 
  priorAuthorizationRequest?: PriorAuthorizationRequest  

}
