import { Field, InputType } from '@nestjs/graphql'
import { UserUpdatePriorAuthorizationEquipmentInput } from './user-update-prior-authorization-equipment.input'

@InputType()
export class UserUpdatePriorAuthorizationEquipmentsInput {
  @Field(() => [UserUpdatePriorAuthorizationEquipmentInput], {nullable: true }) 
  priorAuthorizationEquipments: UserUpdatePriorAuthorizationEquipmentInput[]
}
