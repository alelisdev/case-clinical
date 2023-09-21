import { Field, InputType } from '@nestjs/graphql'
import { UserUpdateAppointmentInput } from './user-update-appointment.input'

@InputType()
export class UserUpdateAppointmentsInput {
  @Field(() => [UserUpdateAppointmentInput], {nullable: true }) 
  appointments: UserUpdateAppointmentInput[]
}
