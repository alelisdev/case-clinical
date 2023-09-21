import { Field, InputType } from '@nestjs/graphql'
import { UserUpdateDurableMedicalEquipmentInput } from './user-update-durable-medical-equipment.input'

@InputType()
export class UserUpdateDurableMedicalequipmentsInput {
  @Field(() => [UserUpdateDurableMedicalEquipmentInput], {nullable: true }) 
  durableMedicalequipments: UserUpdateDurableMedicalEquipmentInput[]
}
