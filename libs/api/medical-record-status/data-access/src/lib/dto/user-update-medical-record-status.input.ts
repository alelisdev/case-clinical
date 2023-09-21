import { Field, InputType } from '@nestjs/graphql'

import { UserUpdateAppointmentInput } from '@case-clinical/api/appointment/data-access' 


@InputType()
export class UserUpdateMedicalRecordStatusInput {

  @Field({ nullable: true }) 
  id?: string

  @Field({ nullable: true }) 
  name?: string

  @Field(() => [UserUpdateAppointmentInput], { nullable: true }) 
  appointments?: UserUpdateAppointmentInput[]


}