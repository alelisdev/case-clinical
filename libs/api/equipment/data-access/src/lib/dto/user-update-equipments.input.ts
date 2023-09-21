import { Field, InputType } from '@nestjs/graphql'
import { UserUpdateEquipmentInput } from './user-update-equipment.input'

@InputType()
export class UserUpdateEquipmentsInput {
  @Field(() => [UserUpdateEquipmentInput], {nullable: true }) 
  equipments: UserUpdateEquipmentInput[]
}
