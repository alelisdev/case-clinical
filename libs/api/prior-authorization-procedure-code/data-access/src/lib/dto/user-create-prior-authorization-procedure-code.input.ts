import { Field, InputType } from '@nestjs/graphql'

import { UserCreateCostCategoryInput } from '@case-clinical/api/cost-category/data-access' 
import { UserCreateProcedureInput } from '@case-clinical/api/procedure/data-access' 
import { UserCreatePriorAuthorizationRequestInput } from '@case-clinical/api/prior-authorization-request/data-access' 


@InputType()
export class UserCreatePriorAuthorizationProcedureCodeInput {

  @Field({ nullable: true }) 
  procedureId?: string

  @Field({ nullable: true }) 
  priorAuthorizationRequestId?: string

  @Field({ nullable: true }) 
  name?: string

  @Field({ nullable: true }) 
  costCategoryId?: string

  @Field({ nullable: true }) 
  estimatedCost?: number


  @Field(() => UserCreateCostCategoryInput ,{ nullable: true }) 
  costCategory?: UserCreateCostCategoryInput  


  @Field(() => UserCreateProcedureInput ,{ nullable: true }) 
  procedure?: UserCreateProcedureInput  


  @Field(() => UserCreatePriorAuthorizationRequestInput ,{ nullable: true }) 
  priorAuthorizationRequest?: UserCreatePriorAuthorizationRequestInput  

}
