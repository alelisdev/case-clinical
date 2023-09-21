import { Field, InputType } from '@nestjs/graphql'

import { AdminCreateEquipmentInput } from '@case-clinical/api/equipment/data-access' 
import { AdminCreatePriorAuthorizationRequestInput } from '@case-clinical/api/prior-authorization-request/data-access' 


@InputType()
export class AdminCreatePriorAuthorizationEquipmentInput {

  @Field({ nullable: true }) 
  name?: string

  @Field({ nullable: true }) 
  estimatedCost?: number

  @Field({ nullable: true }) 
  equipmentId?: string

  @Field({ nullable: true }) 
  priorAuthorizationRequestId?: string


  @Field(() => AdminCreateEquipmentInput ,{ nullable: true }) 
  equipment?: AdminCreateEquipmentInput  


  @Field(() => AdminCreatePriorAuthorizationRequestInput ,{ nullable: true }) 
  priorAuthorizationRequest?: AdminCreatePriorAuthorizationRequestInput  

}