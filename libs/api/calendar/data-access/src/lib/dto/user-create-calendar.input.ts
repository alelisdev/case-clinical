import { Field, InputType } from '@nestjs/graphql'

import { UserCreateUserCalendarInput } from '@case-clinical/api/user-calendar/data-access' 
import { UserCreateAppointmentInput } from '@case-clinical/api/appointment/data-access' 


@InputType()
export class UserCreateCalendarInput {

  @Field({ nullable: true }) 
  name?: string

  @Field({ nullable: true }) 
  color?: string
  
  @Field({ nullable: true }) 
  title?: string

  @Field({ nullable: true }) 
  visible?: boolean

  @Field(() => [UserCreateUserCalendarInput], { nullable: true }) 
  userCalendars?: UserCreateUserCalendarInput[]

  @Field(() => [UserCreateAppointmentInput], { nullable: true }) 
  appointments?: UserCreateAppointmentInput[]

}
