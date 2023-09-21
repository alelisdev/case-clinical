import { Field, InputType } from '@nestjs/graphql'

import { UserCreateEquipmentInput } from '@case-clinical/api/equipment/data-access' 
import { UserCreatePriorAuthorizationRequestInput } from '@case-clinical/api/prior-authorization-request/data-access' 


@InputType()
export class UserCreatePriorAuthorizationEquipmentInput {

  @Field({ nullable: true }) 
  name?: string

  @Field({ nullable: true }) 
  estimatedCost?: number

  @Field({ nullable: true }) 
  equipmentId?: string

  @Field({ nullable: true }) 
  priorAuthorizationRequestId?: string


  @Field(() => UserCreateEquipmentInput ,{ nullable: true }) 
  equipment?: UserCreateEquipmentInput  


  @Field(() => UserCreatePriorAuthorizationRequestInput ,{ nullable: true }) 
  priorAuthorizationRequest?: UserCreatePriorAuthorizationRequestInput  

}
