import { Field, InputType } from '@nestjs/graphql'

import { UserCreateAppointmentInput } from '@case-clinical/api/appointment/data-access' 


@InputType()
export class UserCreateAppointmentStatusInput {

  @Field({ nullable: true }) 
  name?: string

  @Field(() => [UserCreateAppointmentInput], { nullable: true }) 
  appointments?: UserCreateAppointmentInput[]


}
