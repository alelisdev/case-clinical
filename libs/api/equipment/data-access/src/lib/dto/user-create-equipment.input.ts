import { Field, InputType } from '@nestjs/graphql'

import { UserCreatePriorAuthorizationEquipmentInput } from '@case-clinical/api/prior-authorization-equipment/data-access' 


@InputType()
export class UserCreateEquipmentInput {

  @Field({ nullable: true }) 
  name?: string

  @Field(() => [UserCreatePriorAuthorizationEquipmentInput], { nullable: true }) 
  priorAuthorizationEquipments?: UserCreatePriorAuthorizationEquipmentInput[]


}
