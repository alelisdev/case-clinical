import { Field, InputType } from '@nestjs/graphql'
import { UserUpdateMedicalRecordStatusInput } from './user-update-medical-record-status.input'

@InputType()
export class UserUpdateMedicalRecordStatusesInput {
  @Field(() => [UserUpdateMedicalRecordStatusInput], {nullable: true }) 
  medicalRecordStatuses: UserUpdateMedicalRecordStatusInput[]
}
