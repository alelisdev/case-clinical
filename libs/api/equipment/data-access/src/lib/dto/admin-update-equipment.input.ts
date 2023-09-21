import { Field, InputType } from '@nestjs/graphql'

import { UserUpdatePriorAuthorizationEquipmentInput } from '@case-clinical/api/prior-authorization-equipment/data-access' 


@InputType()
export class AdminUpdateEquipmentInput {

  @Field({ nullable: true }) 
  id?: string

  @Field({ nullable: true }) 
  name?: string

  @Field(() => [UserUpdatePriorAuthorizationEquipmentInput], { nullable: true }) 
  priorAuthorizationEquipments?: UserUpdatePriorAuthorizationEquipmentInput[]


}