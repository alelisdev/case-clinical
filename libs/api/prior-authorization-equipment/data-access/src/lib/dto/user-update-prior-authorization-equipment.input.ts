import { Field, InputType } from '@nestjs/graphql'

import { UserUpdateEquipmentInput } from '@case-clinical/api/equipment/data-access' 
import { UserUpdatePriorAuthorizationRequestInput } from '@case-clinical/api/prior-authorization-request/data-access' 


@InputType()
export class UserUpdatePriorAuthorizationEquipmentInput {

  @Field({ nullable: true }) 
  id?: string

  @Field({ nullable: true }) 
  name?: string

  @Field({ nullable: true }) 
  estimatedCost?: number

  @Field({ nullable: true }) 
  equipmentId?: string

  @Field({ nullable: true }) 
  priorAuthorizationRequestId?: string


  @Field(() => UserUpdateEquipmentInput ,{ nullable: true }) 
  equipment?: UserUpdateEquipmentInput  


  @Field(() => UserUpdatePriorAuthorizationRequestInput ,{ nullable: true }) 
  priorAuthorizationRequest?: UserUpdatePriorAuthorizationRequestInput  

}