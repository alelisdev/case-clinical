import { Field, InputType } from '@nestjs/graphql'

import { AdminCreateAppointmentInput } from '@case-clinical/api/appointment/data-access' 


@InputType()
export class AdminCreateMedicalRecordStatusInput {

  @Field({ nullable: true }) 
  name?: string

  @Field(() => [AdminCreateAppointmentInput], { nullable: true }) 
  appointments?: AdminCreateAppointmentInput[]


}