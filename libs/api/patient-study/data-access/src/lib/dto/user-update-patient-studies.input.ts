import { Field, InputType } from '@nestjs/graphql'
import { UserUpdatePatientStudyInput } from './user-update-patient-study.input'

@InputType()
export class UserUpdatePatientStudiesInput {
  @Field(() => [UserUpdatePatientStudyInput], {nullable: true }) 
  patientStudies: UserUpdatePatientStudyInput[]
}
