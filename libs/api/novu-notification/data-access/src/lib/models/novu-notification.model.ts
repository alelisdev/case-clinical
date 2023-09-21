import { Field, ObjectType } from '@nestjs/graphql'
import { Appointment } from '@case-clinical/api/appointment/data-access'

@ObjectType()
export class NovuNotification {

  @Field({ nullable: true })
  id?: string

  @Field({ nullable: true })
  createdAt?: Date

  @Field({ nullable: true })
  when?: string

  @Field({ nullable: true })
  updatedAt?: Date

  @Field({ nullable: true })
  name?: string

  @Field({ nullable: true })
  isAdmin?: boolean

  @Field({ nullable: true })
  read?: boolean

  @Field({ nullable: true })
  redirectLink?: string

  @Field({ nullable: true })
  description?: string

  @Field({ nullable: true })
  appointmentId?: string

  @Field(() => Appointment, { nullable: true })
  appointment?: Appointment

  @Field({ nullable: true })
  tag?: string
}
