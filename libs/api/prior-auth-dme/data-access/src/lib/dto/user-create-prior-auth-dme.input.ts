import { Field, InputType } from '@nestjs/graphql'

import { UserCreatePriorAuthorizationRequestInput } from '@case-clinical/api/prior-authorization-request/data-access' 
import { UserCreateDurableMedicalEquipmentInput } from '@case-clinical/api/durable-medical-equipment/data-access' 


@InputType()
export class UserCreatePriorAuthDmeInput {

  @Field({ nullable: true }) 
  name?: string

  @Field({ nullable: true }) 
  estimatedCost?: number

  @Field({ nullable: true }) 
  priorAuthId?: string

  @Field({ nullable: true }) 
  durableMedicalEquipmentId?: string


  @Field(() => UserCreatePriorAuthorizationRequestInput ,{ nullable: true }) 
  priorAuthorizationRequest?: UserCreatePriorAuthorizationRequestInput  


  @Field(() => UserCreateDurableMedicalEquipmentInput ,{ nullable: true }) 
  durableMedicalEquipment?: UserCreateDurableMedicalEquipmentInput  

}
