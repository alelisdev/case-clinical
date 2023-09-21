import { Field, InputType } from '@nestjs/graphql'

import { AdminCreatePriorAuthorizationEquipmentInput } from '@case-clinical/api/prior-authorization-equipment/data-access' 


@InputType()
export class AdminCreateEquipmentInput {

  @Field({ nullable: true }) 
  name?: string

  @Field(() => [AdminCreatePriorAuthorizationEquipmentInput], { nullable: true }) 
  priorAuthorizationEquipments?: AdminCreatePriorAuthorizationEquipmentInput[]


}