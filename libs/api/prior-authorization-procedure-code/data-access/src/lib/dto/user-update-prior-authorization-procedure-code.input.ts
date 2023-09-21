import { Field, InputType } from '@nestjs/graphql'

import { UserUpdateCostCategoryInput } from '@case-clinical/api/cost-category/data-access' 
import { UserUpdateProcedureInput } from '@case-clinical/api/procedure/data-access' 
import { UserUpdatePriorAuthorizationRequestInput } from '@case-clinical/api/prior-authorization-request/data-access' 


@InputType()
export class UserUpdatePriorAuthorizationProcedureCodeInput {

  @Field({ nullable: true }) 
  procedureId?: string

  @Field({ nullable: true }) 
  priorAuthorizationRequestId?: string

  @Field({ nullable: true }) 
  id?: string

  @Field({ nullable: true }) 
  name?: string

  @Field({ nullable: true }) 
  costCategoryId?: string

  @Field({ nullable: true }) 
  estimatedCost?: number


  @Field(() => UserUpdateCostCategoryInput ,{ nullable: true }) 
  costCategory?: UserUpdateCostCategoryInput  


  @Field(() => UserUpdateProcedureInput ,{ nullable: true }) 
  procedure?: UserUpdateProcedureInput  


  @Field(() => UserUpdatePriorAuthorizationRequestInput ,{ nullable: true }) 
  priorAuthorizationRequest?: UserUpdatePriorAuthorizationRequestInput  

}