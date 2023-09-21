import { Field, InputType } from '@nestjs/graphql'

import { AdminUpdateImplantInput } from '@case-clinical/api/implant/data-access' 
import { AdminUpdatePriorAuthorizationRequestInput } from '@case-clinical/api/prior-authorization-request/data-access' 


@InputType()
export class AdminUpdatePriorAuthorizationImplantInput {

  @Field({ nullable: true }) 
  id?: string

  @Field({ nullable: true }) 
  name?: string

  @Field({ nullable: true }) 
  estimatedCost?: number

  @Field({ nullable: true }) 
  implantId?: string

  @Field({ nullable: true }) 
  priorAuthorizationRequestId?: string


  @Field(() => AdminUpdateImplantInput ,{ nullable: true }) 
  implant?: AdminUpdateImplantInput  


  @Field(() => AdminUpdatePriorAuthorizationRequestInput ,{ nullable: true }) 
  priorAuthorizationRequest?: AdminUpdatePriorAuthorizationRequestInput  

}