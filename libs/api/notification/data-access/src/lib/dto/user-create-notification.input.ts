import { Field, InputType } from '@nestjs/graphql'

import { UserCreateUserInput } from '@case-clinical/api/user/data-access'
import { UserCreateAppointmentInput } from '@case-clinical/api/appointment/data-access'


@InputType()
export class UserCreateNotificationInput {

  @Field({ nullable: true })
  name?: string

  @Field({ nullable: true })
  title?: string

  @Field({ nullable: true })
  description?: string

  @Field({ nullable: true })
  type?: string

  @Field({ nullable: true })
  icon?: string

  @Field({ nullable: true })
  image?: string

  @Field({ nullable: true })
  link?: string

  @Field({ nullable: true })
  useRouter?: boolean

  @Field({ nullable: true })
  time?: Date

  @Field({ nullable: true })
  read?: boolean

  @Field({ nullable: true })
  userId?: string

  @Field({ nullable: true })
  appointmentId?: string

  @Field(() => UserCreateUserInput ,{ nullable: true })
  user?: UserCreateUserInput

  @Field(() => UserCreateUserInput ,{ nullable: true })
  appointment?: UserCreateAppointmentInput

}
