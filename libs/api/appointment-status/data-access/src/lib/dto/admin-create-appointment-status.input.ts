import { Field, InputType } from '@nestjs/graphql'

import { AdminCreateAppointmentInput } from '@case-clinical/api/appointment/data-access' 


@InputType()
export class AdminCreateAppointmentStatusInput {

  @Field({ nullable: true }) 
  name?: string

  @Field(() => [AdminCreateAppointmentInput], { nullable: true }) 
  appointments?: AdminCreateAppointmentInput[]


}