import { Field, InputType } from '@nestjs/graphql'

import { AdminCreateUserCalendarInput } from '@case-clinical/api/user-calendar/data-access' 


@InputType()
export class AdminCreateCalendarTypeInput {

  @Field({ nullable: true }) 
  name?: string

  @Field(() => [AdminCreateUserCalendarInput], { nullable: true }) 
  userCalendars?: AdminCreateUserCalendarInput[]

}