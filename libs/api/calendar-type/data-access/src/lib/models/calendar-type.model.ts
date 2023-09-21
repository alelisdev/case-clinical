import { Field, ObjectType } from '@nestjs/graphql'

import { UserCalendar } from '@case-clinical/api/user-calendar/data-access' 


@ObjectType()
export class CalendarType {

  @Field({ nullable: true }) 
  id?: string

  @Field({ nullable: true }) 
  createdAt?: Date

  @Field({ nullable: true }) 
  updatedAt?: Date

  @Field({ nullable: true }) 
  name?: string

  @Field(() => [UserCalendar], { nullable: true }) 
  userCalendars?: UserCalendar[]

}
