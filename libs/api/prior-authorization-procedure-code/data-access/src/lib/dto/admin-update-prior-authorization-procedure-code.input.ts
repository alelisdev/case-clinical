import { Field, InputType } from '@nestjs/graphql'

import { AdminUpdateCostCategoryInput } from '@case-clinical/api/cost-category/data-access' 
import { AdminUpdateProcedureInput } from '@case-clinical/api/procedure/data-access' 
import { AdminUpdatePriorAuthorizationRequestInput } from '@case-clinical/api/prior-authorization-request/data-access' 


@InputType()
export class AdminUpdatePriorAuthorizationProcedureCodeInput {

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


  @Field(() => AdminUpdateCostCategoryInput ,{ nullable: true }) 
  costCategory?: AdminUpdateCostCategoryInput  


  @Field(() => AdminUpdateProcedureInput ,{ nullable: true }) 
  procedure?: AdminUpdateProcedureInput  


  @Field(() => AdminUpdatePriorAuthorizationRequestInput ,{ nullable: true }) 
  priorAuthorizationRequest?: AdminUpdatePriorAuthorizationRequestInput  

}