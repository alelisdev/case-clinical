import { Field, InputType } from '@nestjs/graphql'

import { UserCreateCalendarTypeInput } from '@case-clinical/api/calendar-type/data-access' 
import { UserCreateUserInput } from '@case-clinical/api/user/data-access' 
import { UserCreateCalendarInput } from '@case-clinical/api/calendar/data-access' 


@InputType()
export class UserCreateUserCalendarInput {

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

  @Field(() => UserCreateCalendarTypeInput ,{ nullable: true }) 
  calendarType?: UserCreateCalendarTypeInput  


  @Field(() => UserCreateUserInput ,{ nullable: true }) 
  user?: UserCreateUserInput  

  @Field(() => UserCreateCalendarInput ,{ nullable: true }) 
  calendar?: UserCreateCalendarInput  

}
