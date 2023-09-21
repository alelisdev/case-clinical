import { Field, InputType } from '@nestjs/graphql'
import { AdminUpdateAppointmentInput } from '@case-clinical/api/appointment/data-access'
import { AdminUpdateUserInput } from '@case-clinical/api/user/data-access'


@InputType()
export class AdminUpdateNotificationInput {

  @Field({ nullable: true })
  id?: string

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

  @Field(() => AdminUpdateUserInput ,{ nullable: true })
  user?: AdminUpdateUserInput

  @Field(() => AdminUpdateAppointmentInput ,{ nullable: true })
  appointment?: AdminUpdateAppointmentInput

}
