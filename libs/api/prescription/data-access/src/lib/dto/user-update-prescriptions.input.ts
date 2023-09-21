import { Field, InputType } from '@nestjs/graphql'
import { UserUpdatePrescriptionInput } from './user-update-prescription.input'

@InputType()
export class UserUpdatePrescriptionsInput {
  @Field(() => [UserUpdatePrescriptionInput], {nullable: true }) 
  prescriptions: UserUpdatePrescriptionInput[]
}
