import { Field, ObjectType } from '@nestjs/graphql'

import { UserCalendar } from '@case-clinical/api/user-calendar/data-access' 
import { Appointment } from '@case-clinical/api/appointment/data-access' 


@ObjectType()
export class Calendar {

  @Field({ nullable: true }) 
  id?: string

  @Field({ nullable: true }) 
  createdAt?: Date

  @Field({ nullable: true }) 
  updatedAt?: Date

  @Field({ nullable: true }) 
  name?: string

  @Field({ nullable: true }) 
  title?: string

  @Field({ nullable: true }) 
  color?: string

  @Field({ nullable: true }) 
  visible?: boolean

  @Field(() => [UserCalendar], { nullable: true }) 
  userCalendars?: UserCalendar[]

  @Field(() => [Appointment], { nullable: true }) 
  appointments?: Appointment[]

}
