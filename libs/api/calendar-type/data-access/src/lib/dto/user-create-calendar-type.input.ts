import { Field, InputType } from '@nestjs/graphql'

import { UserCreateUserCalendarInput } from '@case-clinical/api/user-calendar/data-access' 


@InputType()
export class UserCreateCalendarTypeInput {

  @Field({ nullable: true }) 
  name?: string

  @Field(() => [UserCreateUserCalendarInput], { nullable: true }) 
  userCalendars?: UserCreateUserCalendarInput[]

}
