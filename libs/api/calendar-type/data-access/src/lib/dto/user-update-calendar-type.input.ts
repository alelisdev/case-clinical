import { Field, InputType } from '@nestjs/graphql'

import { UserUpdateUserCalendarInput } from '@case-clinical/api/user-calendar/data-access' 


@InputType()
export class UserUpdateCalendarTypeInput {

  @Field({ nullable: true }) 
  id?: string

  @Field({ nullable: true }) 
  name?: string

  @Field(() => [UserUpdateUserCalendarInput], { nullable: true }) 
  userCalendars?: UserUpdateUserCalendarInput[]

}