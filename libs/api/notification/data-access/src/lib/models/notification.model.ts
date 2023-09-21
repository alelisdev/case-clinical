import { Field, ObjectType } from '@nestjs/graphql'

import { User } from '@case-clinical/api/user/data-access'
import { Appointment } from '@case-clinical/api/appointment/data-access'


@ObjectType()
export class Notification {

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


  @Field(() => User, { nullable: true })
  user?: User

  @Field(() => Appointment, { nullable: true })
  appointment?: Appointment

}
