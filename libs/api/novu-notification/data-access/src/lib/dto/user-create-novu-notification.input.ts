import { Field, InputType } from '@nestjs/graphql'

import { UserCreateUserInput } from '@case-clinical/api/user/data-access'
import { UserCreateAppointmentInput } from '@case-clinical/api/appointment/data-access'


@InputType()
export class UserCreateNovuNotificationInput {

  @Field({ nullable: true })
  name?: string

  @Field({ nullable: true })
  description?: string

  @Field({ nullable: true })
  read?: boolean

  @Field({ nullable: true })
  image?: string

  @Field({ nullable: true })
  redirectLink?: string

  @Field({ nullable: true })
  tag?: string

  @Field({ nullable: true })
  userId?: string

  @Field({ nullable: true })
  appointmentId?: string

  @Field(() => UserCreateUserInput ,{ nullable: true })
  user?: UserCreateUserInput

  @Field(() => UserCreateAppointmentInput ,{ nullable: true })
  appointment?: UserCreateAppointmentInput
}
