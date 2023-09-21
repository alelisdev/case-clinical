import { Field, ObjectType } from '@nestjs/graphql'

import { CalendarType } from '@case-clinical/api/calendar-type/data-access'

import { User } from '@case-clinical/api/user/data-access'

import { Calendar } from '@case-clinical/api/calendar/data-access'


@ObjectType()
export class UserCalendar {

  @Field({ nullable: true }) 
  id?: string

  @Field({ nullable: true }) 
  createdAt?: Date

  @Field({ nullable: true }) 
  updatedAt?: Date

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

  @Field(() => CalendarType, { nullable: true }) 
  calendarType?: CalendarType  

  @Field(() => User, { nullable: true }) 
  user?: User  

  @Field(() => Calendar, { nullable: true }) 
  calendar?: Calendar  

}
