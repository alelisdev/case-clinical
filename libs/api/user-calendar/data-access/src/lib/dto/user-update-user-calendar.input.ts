import { Field, InputType } from '@nestjs/graphql'

import { UserUpdateCalendarTypeInput } from '@case-clinical/api/calendar-type/data-access' 
import { UserUpdateUserInput } from '@case-clinical/api/user/data-access' 
import { UserUpdateCalendarInput } from '@case-clinical/api/calendar/data-access' 


@InputType()
export class UserUpdateUserCalendarInput {

  @Field({ nullable: true }) 
  id?: string

  @Field({ nullable: true }) 
  name?: string

  @Field({ nullable: true }) 
  calendarTypeId?: string

  @Field({ nullable: true }) 
  userId?: string

  @Field({ nullable: true }) 
  teamId?: string

  @Field({ nullable: true }) 
  calendarId?: string

  @Field(() => UserUpdateCalendarTypeInput ,{ nullable: true }) 
  calendarType?: UserUpdateCalendarTypeInput  


  @Field(() => UserUpdateUserInput ,{ nullable: true }) 
  user?: UserUpdateUserInput  

  @Field(() => UserUpdateCalendarInput ,{ nullable: true }) 
  calendar?: UserUpdateCalendarInput  

}