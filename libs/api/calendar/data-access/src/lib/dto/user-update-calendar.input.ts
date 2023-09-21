import { Field, InputType } from '@nestjs/graphql'

import { UserUpdateUserCalendarInput } from '@case-clinical/api/user-calendar/data-access' 
import { UserUpdateAppointmentInput } from '@case-clinical/api/appointment/data-access' 


@InputType()
export class UserUpdateCalendarInput {

  @Field({ nullable: true }) 
  id?: string

  @Field({ nullable: true }) 
  name?: string

  
  @Field({ nullable: true }) 
  title?: string


  @Field({ nullable: true }) 
  color?: string

  @Field({ nullable: true }) 
  visible?: boolean

  @Field(() => [UserUpdateUserCalendarInput], { nullable: true }) 
  userCalendars?: UserUpdateUserCalendarInput[]

  @Field(() => [UserUpdateAppointmentInput], { nullable: true }) 
  appointments?: UserUpdateAppointmentInput[]

}