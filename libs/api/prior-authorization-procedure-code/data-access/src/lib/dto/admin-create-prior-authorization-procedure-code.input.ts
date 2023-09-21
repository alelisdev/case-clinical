import { Field, InputType } from '@nestjs/graphql'

import { AdminCreateCostCategoryInput } from '@case-clinical/api/cost-category/data-access' 
import { AdminCreateProcedureInput } from '@case-clinical/api/procedure/data-access' 
import { AdminCreatePriorAuthorizationRequestInput } from '@case-clinical/api/prior-authorization-request/data-access' 


@InputType()
export class AdminCreatePriorAuthorizationProcedureCodeInput {

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


  @Field(() => AdminCreateCostCategoryInput ,{ nullable: true }) 
  costCategory?: AdminCreateCostCategoryInput  


  @Field(() => AdminCreateProcedureInput ,{ nullable: true }) 
  procedure?: AdminCreateProcedureInput  


  @Field(() => AdminCreatePriorAuthorizationRequestInput ,{ nullable: true }) 
  priorAuthorizationRequest?: AdminCreatePriorAuthorizationRequestInput  

}