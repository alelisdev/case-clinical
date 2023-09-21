import { Field, InputType } from '@nestjs/graphql'
import { UserUpdateDurableMedicalEquipmentInput } from './user-update-durable-medical-equipment.input'

@InputType()
export class UserUpdateDurableMedicalEquipmentsInput {
  @Field(() => [UserUpdateDurableMedicalEquipmentInput], {nullable: true }) 
  durableMedicalEquipments: UserUpdateDurableMedicalEquipmentInput[]
}
