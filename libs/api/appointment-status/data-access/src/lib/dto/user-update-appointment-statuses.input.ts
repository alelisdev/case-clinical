import { Field, InputType } from '@nestjs/graphql'
import { UserUpdateAppointmentStatusInput } from './user-update-appointment-status.input'

@InputType()
export class UserUpdateAppointmentStatusesInput {
  @Field(() => [UserUpdateAppointmentStatusInput], {nullable: true }) 
  appointmentStatuses: UserUpdateAppointmentStatusInput[]
}
