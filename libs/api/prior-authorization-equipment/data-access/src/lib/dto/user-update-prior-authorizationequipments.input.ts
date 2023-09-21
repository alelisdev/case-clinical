import { Field, InputType } from '@nestjs/graphql'
import { UserUpdatePriorAuthorizationEquipmentInput } from './user-update-prior-authorization-equipment.input'

@InputType()
export class UserUpdatePriorAuthorizationequipmentsInput {
  @Field(() => [UserUpdatePriorAuthorizationEquipmentInput], {nullable: true }) 
  priorAuthorizationequipments: UserUpdatePriorAuthorizationEquipmentInput[]
}
