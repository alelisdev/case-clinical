import { Field, InputType } from '@nestjs/graphql'

import { AdminUpdatePriorAuthorizationRequestInput } from '@case-clinical/api/prior-authorization-request/data-access' 
import { AdminUpdateDurableMedicalEquipmentInput } from '@case-clinical/api/durable-medical-equipment/data-access' 


@InputType()
export class AdminUpdatePriorAuthDmeInput {

  @Field({ nullable: true }) 
  id?: string

  @Field({ nullable: true }) 
  name?: string

  @Field({ nullable: true }) 
  estimatedCost?: number

  @Field({ nullable: true }) 
  priorAuthId?: string

  @Field({ nullable: true }) 
  durableMedicalEquipmentId?: string


  @Field(() => AdminUpdatePriorAuthorizationRequestInput ,{ nullable: true }) 
  priorAuthorizationRequest?: AdminUpdatePriorAuthorizationRequestInput  


  @Field(() => AdminUpdateDurableMedicalEquipmentInput ,{ nullable: true }) 
  durableMedicalEquipment?: AdminUpdateDurableMedicalEquipmentInput  

}