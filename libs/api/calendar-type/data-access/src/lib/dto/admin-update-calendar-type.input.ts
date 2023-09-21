import { Field, InputType } from '@nestjs/graphql'

import { AdminUpdateUserCalendarInput } from '@case-clinical/api/user-calendar/data-access' 


@InputType()
export class AdminUpdateCalendarTypeInput {

  @Field({ nullable: true }) 
  id?: string

  @Field({ nullable: true }) 
  name?: string

  @Field(() => [AdminUpdateUserCalendarInput], { nullable: true }) 
  userCalendars?: AdminUpdateUserCalendarInput[]

}