import { Field, InputType } from '@nestjs/graphql'

import { UserUpdateImplantInput } from '@case-clinical/api/implant/data-access' 
import { UserUpdatePriorAuthorizationRequestInput } from '@case-clinical/api/prior-authorization-request/data-access' 


@InputType()
export class UserUpdatePriorAuthorizationImplantInput {

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


  @Field(() => UserUpdateImplantInput ,{ nullable: true }) 
  implant?: UserUpdateImplantInput  


  @Field(() => UserUpdatePriorAuthorizationRequestInput ,{ nullable: true }) 
  priorAuthorizationRequest?: UserUpdatePriorAuthorizationRequestInput  

}