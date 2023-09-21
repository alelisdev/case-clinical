import { Field, InputType } from '@nestjs/graphql'

import { UserCreateImplantInput } from '@case-clinical/api/implant/data-access' 
import { UserCreatePriorAuthorizationRequestInput } from '@case-clinical/api/prior-authorization-request/data-access' 


@InputType()
export class UserCreatePriorAuthorizationImplantInput {

  @Field({ nullable: true }) 
  name?: string

  @Field({ nullable: true }) 
  estimatedCost?: number

  @Field({ nullable: true }) 
  implantId?: string

  @Field({ nullable: true }) 
  priorAuthorizationRequestId?: string


  @Field(() => UserCreateImplantInput ,{ nullable: true }) 
  implant?: UserCreateImplantInput  


  @Field(() => UserCreatePriorAuthorizationRequestInput ,{ nullable: true }) 
  priorAuthorizationRequest?: UserCreatePriorAuthorizationRequestInput  

}
