import { Field, InputType } from '@nestjs/graphql'
import { UserUpdateMedicalRecordInput } from './user-update-medical-record.input'

@InputType()
export class UserUpdateMedicalRecordsInput {
  @Field(() => [UserUpdateMedicalRecordInput], {nullable: true }) 
  medicalRecords: UserUpdateMedicalRecordInput[]
}
