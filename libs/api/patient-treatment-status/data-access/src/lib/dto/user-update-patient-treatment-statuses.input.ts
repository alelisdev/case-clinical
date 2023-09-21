import { Field, InputType } from '@nestjs/graphql'
import { UserUpdatePatientTreatmentStatusInput } from './user-update-patient-treatment-status.input'

@InputType()
export class UserUpdatePatientTreatmentStatusesInput {
  @Field(() => [UserUpdatePatientTreatmentStatusInput], {nullable: true }) 
  patientTreatmentStatuses: UserUpdatePatientTreatmentStatusInput[]
}
