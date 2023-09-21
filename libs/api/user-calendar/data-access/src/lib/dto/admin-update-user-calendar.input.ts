import { Field, InputType } from '@nestjs/graphql'

import { AdminUpdateCalendarTypeInput } from '@case-clinical/api/calendar-type/data-access' 
import { AdminUpdateUserInput } from '@case-clinical/api/user/data-access' 
import { AdminUpdateCalendarInput } from '@case-clinical/api/calendar/data-access' 


@InputType()
export class AdminUpdateUserCalendarInput {

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

  @Field(() => AdminUpdateCalendarTypeInput ,{ nullable: true }) 
  calendarType?: AdminUpdateCalendarTypeInput  


  @Field(() => AdminUpdateUserInput ,{ nullable: true }) 
  user?: AdminUpdateUserInput  

  @Field(() => AdminUpdateCalendarInput ,{ nullable: true }) 
  calendar?: AdminUpdateCalendarInput  

}