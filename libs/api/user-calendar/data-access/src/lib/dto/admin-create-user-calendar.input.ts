import { Field, InputType } from '@nestjs/graphql'

import { AdminCreateCalendarTypeInput } from '@case-clinical/api/calendar-type/data-access' 
import { AdminCreateUserInput } from '@case-clinical/api/user/data-access' 
import { AdminCreateCalendarInput } from '@case-clinical/api/calendar/data-access' 


@InputType()
export class AdminCreateUserCalendarInput {

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

  @Field(() => AdminCreateCalendarTypeInput ,{ nullable: true }) 
  calendarType?: AdminCreateCalendarTypeInput  


  @Field(() => AdminCreateUserInput ,{ nullable: true }) 
  user?: AdminCreateUserInput  

  @Field(() => AdminCreateCalendarInput ,{ nullable: true }) 
  calendar?: AdminCreateCalendarInput  

}