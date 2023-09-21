import { Field, InputType } from '@nestjs/graphql'

import { AdminUpdateEquipmentInput } from '@case-clinical/api/equipment/data-access' 
import { AdminUpdatePriorAuthorizationRequestInput } from '@case-clinical/api/prior-authorization-request/data-access' 


@InputType()
export class AdminUpdatePriorAuthorizationEquipmentInput {

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


  @Field(() => AdminUpdateEquipmentInput ,{ nullable: true }) 
  equipment?: AdminUpdateEquipmentInput  


  @Field(() => AdminUpdatePriorAuthorizationRequestInput ,{ nullable: true }) 
  priorAuthorizationRequest?: AdminUpdatePriorAuthorizationRequestInput  

}