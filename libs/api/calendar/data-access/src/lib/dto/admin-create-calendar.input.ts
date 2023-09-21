import { Field, InputType } from '@nestjs/graphql'

import { AdminCreateUserCalendarInput } from '@case-clinical/api/user-calendar/data-access' 
import { AdminCreateAppointmentInput } from '@case-clinical/api/appointment/data-access' 


@InputType()
export class AdminCreateCalendarInput {

  @Field({ nullable: true }) 
  name?: string

  @Field({ nullable: true }) 
  color?: string

  @Field({ nullable: true }) 
  visible?: boolean

  @Field(() => [AdminCreateUserCalendarInput], { nullable: true }) 
  userCalendars?: AdminCreateUserCalendarInput[]

  @Field(() => [AdminCreateAppointmentInput], { nullable: true }) 
  appointments?: AdminCreateAppointmentInput[]

}