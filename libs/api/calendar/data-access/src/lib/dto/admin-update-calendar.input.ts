import { Field, InputType } from '@nestjs/graphql'

import { AdminUpdateUserCalendarInput } from '@case-clinical/api/user-calendar/data-access' 
import { AdminUpdateAppointmentInput } from '@case-clinical/api/appointment/data-access' 


@InputType()
export class AdminUpdateCalendarInput {

  @Field({ nullable: true }) 
  id?: string

  @Field({ nullable: true }) 
  name?: string

  @Field({ nullable: true }) 
  color?: string

  @Field({ nullable: true }) 
  visible?: boolean

  @Field(() => [AdminUpdateUserCalendarInput], { nullable: true }) 
  userCalendars?: AdminUpdateUserCalendarInput[]

  @Field(() => [AdminUpdateAppointmentInput], { nullable: true }) 
  appointments?: AdminUpdateAppointmentInput[]

}