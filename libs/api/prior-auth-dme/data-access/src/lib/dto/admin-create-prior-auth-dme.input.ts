import { Field, InputType } from '@nestjs/graphql'

import { AdminCreatePriorAuthorizationRequestInput } from '@case-clinical/api/prior-authorization-request/data-access' 
import { AdminCreateDurableMedicalEquipmentInput } from '@case-clinical/api/durable-medical-equipment/data-access' 


@InputType()
export class AdminCreatePriorAuthDmeInput {

  @Field({ nullable: true }) 
  name?: string

  @Field({ nullable: true }) 
  estimatedCost?: number

  @Field({ nullable: true }) 
  priorAuthId?: string

  @Field({ nullable: true }) 
  durableMedicalEquipmentId?: string


  @Field(() => AdminCreatePriorAuthorizationRequestInput ,{ nullable: true }) 
  priorAuthorizationRequest?: AdminCreatePriorAuthorizationRequestInput  


  @Field(() => AdminCreateDurableMedicalEquipmentInput ,{ nullable: true }) 
  durableMedicalEquipment?: AdminCreateDurableMedicalEquipmentInput  

}