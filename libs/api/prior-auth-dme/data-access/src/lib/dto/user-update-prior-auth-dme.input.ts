import { Field, InputType } from '@nestjs/graphql'

import { UserUpdatePriorAuthorizationRequestInput } from '@case-clinical/api/prior-authorization-request/data-access' 
import { UserUpdateDurableMedicalEquipmentInput } from '@case-clinical/api/durable-medical-equipment/data-access' 


@InputType()
export class UserUpdatePriorAuthDmeInput {

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


  @Field(() => UserUpdatePriorAuthorizationRequestInput ,{ nullable: true }) 
  priorAuthorizationRequest?: UserUpdatePriorAuthorizationRequestInput  


  @Field(() => UserUpdateDurableMedicalEquipmentInput ,{ nullable: true }) 
  durableMedicalEquipment?: UserUpdateDurableMedicalEquipmentInput  

}