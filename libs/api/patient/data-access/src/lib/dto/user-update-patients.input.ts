import { Field, InputType } from '@nestjs/graphql'
import { UserUpdatePatientInput } from './user-update-patient.input'

@InputType()
export class UserUpdatePatientsInput {
  @Field(() => [UserUpdatePatientInput], {nullable: true }) 
  patients: UserUpdatePatientInput[]
}
